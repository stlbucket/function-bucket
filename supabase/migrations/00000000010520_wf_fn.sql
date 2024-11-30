------------------------------------------------------- queue_workflow
CREATE OR REPLACE FUNCTION wf_api.queue_workflow(_identifier citext, _workflow_input_data jsonb) RETURNS jsonb
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
  DECLARE
    _tenant_id uuid;
    _result jsonb;
    _err_context citext;
  BEGIN
    _tenant_id := auth_ext.tenant_id();

    if (_workflow_input_data ? 'workflowInputData') = false then
      _workflow_input_data := jsonb_build_object(
        'workflowInputData', _workflow_input_data
      );
    end if;

    _result := (select wf_fn.queue_workflow(
      _identifier
      ,_tenant_id
      ,_workflow_input_data
    ));

    return _result;
  end;
  $$;

CREATE OR REPLACE FUNCTION wf_fn.queue_workflow(_identifier citext, _tenant_id uuid, _workflow_input_data jsonb) RETURNS jsonb
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
  DECLARE
    _wf wf.wf;
    _uows_to_schedule wf.uow[];
    _uow_to_schedule wf.uow;
    _result wf_fn.queue_workflow_result;
    _err_context citext;
  BEGIN

    _wf := (
      select wf_fn.clone_wf_template(
        _identifier
        ,_tenant_id
        ,row(_workflow_input_data)
      )
    );

    with uows as (
      select *
      from wf.uow
      where wf_id = _wf.id
      and type = 'task'
      and status = 'incomplete'
      and use_worker = true
    )
    select array_agg(u.*)
    into _uows_to_schedule
    from uows u
    ;

    _result.wf := _wf;

    -- current version determines which uows can currently be scheduled, then jobs
    -- are added by a mutation wrapper at the postgraphile level
    -- this mechanism may go away if we can schedule directly at this point
    -- https://worker.graphile.org/docs/sql-add-job
    _result.uows_to_schedule := _uows_to_schedule;

    foreach _uow_to_schedule in array(_uows_to_schedule)
    loop
      perform graphile_worker.add_job(
        _uow_to_schedule.workflow_handler_key,
        payload := to_json(_uow_to_schedule),
        max_attempts := 1,
        run_at := NOW() + (3 * INTERVAL '1 second')
      );
    end loop;

    return to_jsonb(_result);
  end;
  $$;

------------------------------------------------------- error_uow
CREATE OR REPLACE FUNCTION wf_api.error_uow(_uow_id uuid, _message citext, _stack citext[])
  RETURNS wf.uow
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _uow wf.uow;
  BEGIN
    _uow := wf_fn.error_uow(_uow_id);
    return _uow;
  end;
  $$;

CREATE OR REPLACE FUNCTION wf_fn.error_uow(_uow_id uuid, _message citext, _stack citext[]) RETURNS wf.uow
    LANGUAGE plpgsql
    AS $$
  DECLARE
    _uow wf.uow;
    _wf_uow wf.uow;
    _err_context citext;
  BEGIN
    select *
    into _uow
    from wf.uow
    where id = _uow_id
    ;

    if _uow.id is null then
      raise exception 'no uow for id: %', _uow_id;
    end if;

    select * into _wf_uow from wf.uow where id = (select uow_id from wf.wf where id = _uow.wf_id);
    if _wf_uow.status in ('paused', 'canceled', 'deleted', 'template', 'complete') then
      raise exception '(error) cannot update a uow with wf status: %', _wf_uow.status;
    end if;

    update wf.uow set
      status = 'error'
      ,data = data || jsonb_build_object(
        'error', jsonb_build_object(
          'message', _message
          ,'stack', _stack
        )
      )
    where id = _uow.id
    returning * into _uow
    ;

    update wf.uow set
      status = 'error'
      ,data = data || jsonb_build_object(
        'error', jsonb_build_object(
          'message', _message
          ,'stack', _stack
        )
      )
    where id = _wf_uow.id
    ;

    update wf.wf set
      workflow_data = workflow_data || jsonb_build_object(
        'error', jsonb_build_object(
          'message', _message
          ,'stack', _stack
        )
      )
    where id = _uow.wf_id
    ;

    return _uow;
  end;
  $$;
------------------------------------------------------- cancel_wf
CREATE OR REPLACE FUNCTION wf_api.cancel_wf(_wf_id uuid)
  RETURNS wf.wf
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _wf wf.wf;
  BEGIN
    _wf := wf_fn.cancel_wf(_wf_id);
    return _wf;
  end;
  $$;

CREATE OR REPLACE FUNCTION wf_fn.cancel_wf(_wf_id uuid) RETURNS wf.wf
    LANGUAGE plpgsql
    AS $$
  DECLARE
    _wf wf.wf;
    _err_context citext;
  BEGIN
    select * into _wf
    from wf.wf 
    where id = _wf_id;

    if _wf.id is null then
      raise exception 'no wf for id: %', _wf_id;
    end if;

    update wf.uow set
      status = 'canceled'
    where wf_id = _wf_id
    and status != 'complete'
    ;

    return _wf;
  end;
  $$;
-------------------------------------------------------
CREATE OR REPLACE FUNCTION wf_api.complete_uow(_uow_id uuid, _options wf_fn.complete_uow_options DEFAULT ROW(NULL::jsonb, NULL::jsonb))
  RETURNS wf.uow
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _uow wf.uow;
  BEGIN
    _uow := wf_fn.complete_uow(_uow_id, _options);
    return _uow;
  end;
  $$;

CREATE OR REPLACE FUNCTION wf_fn.complete_uow(_uow_id uuid, _options wf_fn.complete_uow_options DEFAULT ROW(NULL::jsonb, NULL::jsonb)) RETURNS wf_fn.complete_uow_result
    LANGUAGE plpgsql
    AS $$
  DECLARE
    _uow wf.uow;
    _wf_uow wf.uow;
    _data jsonb;
    _uows_to_schedule wf.uow[];
    _depender_uow wf.uow;
    _child_uow wf.uow;
    _depender_status wf.uow_status_type;
    _child_status wf.uow_status_type;
    _parent_status wf.uow_status_type;
    _result wf_fn.complete_uow_result;
    _err_context citext;
  BEGIN
    select *
    into _uow
    from wf.uow
    where id = _uow_id
    ;

    if _uow.id is null then
      raise exception 'no uow for id: %', _uow_id;
    end if;

    -- EAGER-SCHEDULING
    -- this will ignore tasks that have already been completed
    -- this is in addition to a similar clause in workflow-handler
    if _uow.status = 'complete' then
      _result.uow := _uow;
      _result.uows_to_schedule := '{}';
      return _result;
    end if;

    if _uow.status not in ('incomplete', 'waiting') then
      raise exception 'can only complete an incomplete or waiting uow: % - %', _uow.identifier, _uow.status;
    end if;

    select * into _wf_uow from wf.uow where id = (select uow_id from wf.wf where id = _uow.wf_id);
    if _wf_uow.status in ('paused', 'error', 'canceled', 'deleted', 'template', 'complete') then
      raise exception '(complete) cannot update a uow with wf status: %', _wf_uow.status;
    end if;

    if _uow.status != 'complete' then
      raise notice 'updating: %, %', _uow.identifier, 'complete';
      update wf.uow
      set 
        status = 'complete'
        ,data = data || coalesce(_options.step_data, '{}'::jsonb)
        ,completed_at = current_timestamp
      where id = _uow.id
      returning *
      into _uow
      ;

      update wf.wf set
        workflow_data = workflow_data || coalesce(_options.workflow_data, '{}'::jsonb)
      where id = _uow.wf_id
      ;

    end if;

    -- compute dependers status
    for _depender_uow in
      select * from wf.uow where id in (select depender_id from wf.uow_dependency where dependee_id = _uow.id)
    loop
      -- raise notice 'depender: %', _depender_uow.identifier;
      _depender_status := (select wf_fn.compute_uow_status(_depender_uow.id));
      -- raise exception 'DEPENDER: %, %', _depender_uow.identifier, _depender_status;

      -- perform wf_fn.complete_uow(_depender_uow.id) from wf.uow where id = _depender_uow.id and status != _depender_status;
      if _depender_uow.type = 'task' then
        if _depender_status = 'incomplete' then
          perform wf_fn.incomplete_uow(_depender_uow.id);
        end if;
        if _depender_status = 'waiting' then
          perform wf_fn.waiting_uow(_depender_uow.id);
        end if;
      end if;

      if _depender_uow.type = 'milestone' and _depender_status = 'waiting' then
        for _child_uow in
          select * from wf.uow where parent_uow_id = _depender_uow.id
        loop
          _child_status := (select wf_fn.compute_uow_status(_child_uow.id));
          raise notice 'CHILD: % -- %', _child_uow.identifier, _child_status;
          if _child_status = 'complete' then
            perform wf_fn.complete_uow(_child_uow.id);
          end if;
          if _child_status = 'incomplete' then
            perform wf_fn.incomplete_uow(_child_uow.id);
          end if;
          if _child_status = 'waiting' then
            perform wf_fn.waiting_uow(_child_uow.id);
          end if;
        end loop;
      end if;
    end loop;

    -- compute parent status
    if _uow.parent_uow_id is not null then
      _parent_status := (select wf_fn.compute_uow_status(id)
      from wf.uow
      where id = _uow.parent_uow_id
      );
      -- recursion
      if _parent_status = 'complete' then
        perform wf_fn.complete_uow(_uow.parent_uow_id);
      end if;
      if _parent_status = 'incomplete' then
        perform wf_fn.incomplete_uow(_uow.parent_uow_id);
      end if;
      if _parent_status = 'waiting' then
        perform wf_fn.waiting_uow(_uow.parent_uow_id);
      end if;
    end if;

    -- EAGER-SCHEDULING
    -- this select statement should be rethought
    -- currently it can cause uows to be scheduled multiple times
    with uows as (
      select *
      from wf.uow
      where wf_id = _uow.wf_id
      -- and type = 'task'
      and status = 'incomplete'
      and use_worker = true
    )
    select array_agg(u.*)
    into _uows_to_schedule
    from uows u
    ;
    -- select * into _wf_uow from wf.uow where id = (select uow_id from wf.wf where id = _uow.wf_id);
    -- if _wf_uow.status not in ('paused', 'error', 'canceled', 'deleted', 'template', 'complete') then
    --   with uows as (
    --     select *
    --     from wf.uow
    --     where wf_id = _uow.wf_id
    --     -- and type = 'task'
    --     and status = 'incomplete'
    --     and use_worker = true
    --   )
    --   select array_agg(u.*)
    --   into _uows_to_schedule
    --   from uows u
    --   ;
    -- else
    --   _uows_to_schedule := '{}'::wf.uow[];
    -- end if;

    _result.uow := _uow;
    _result.uows_to_schedule := coalesce(_uows_to_schedule, '{}');

    return _result;
  end;
  $$;
------------------------------------------------------- incomplete_uow
CREATE OR REPLACE FUNCTION wf_api.incomplete_uow(_uow_id uuid)
  RETURNS wf.uow
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _uow wf.uow;
  BEGIN
    _uow := wf_fn.incomplete_uow(_uow_id);
    return _uow;
  end;
  $$;

CREATE OR REPLACE FUNCTION wf_fn.incomplete_uow(_uow_id uuid) RETURNS wf.uow
    LANGUAGE plpgsql
    AS $$
  DECLARE
    _uow wf.uow;
    _depender_uow wf.uow;
    _child_uow wf.uow;
    _wf_uow wf.uow;
    _result wf_fn.complete_uow_result;
    _depender_status wf.uow_status_type;
    _child_status wf.uow_status_type;
    _parent_status wf.uow_status_type;
    _err_context citext;
  BEGIN
    select *
    into _uow
    from wf.uow
    where id = _uow_id
    ;

    if _wf_uow.status = 'error' then
      return _uow;
    end if;

    if _uow.id is null then
      raise exception 'no uow for id: %', _uow_id;
    end if;

    select * into _wf_uow from wf.uow where id = (select uow_id from wf.wf where id = _uow.wf_id);
    if _wf_uow.status in ('paused', 'error', 'canceled', 'deleted', 'template', 'complete') then
      raise exception '(incomplete) cannot update a uow with wf status: %', _wf_uow.status;
    end if;

    update wf.uow
    set status = 'incomplete'
    where id = _uow.id
    returning * into _uow
    ;

    -- compute dependers status
    for _depender_uow in
      select * from wf.uow where id in (select depender_id from wf.uow_dependency where dependee_id = _uow.id)
    loop
      if _depender_uow.status = 'complete' then
        raise exception 'cannot incomplete a uow with completed dependencies';
      end if;
      -- raise notice 'depender: %', _depender_uow.identifier;
      _depender_status := (select wf_fn.compute_uow_status(_depender_uow.id));
      -- raise exception 'DEPENDER: %, %', _depender_uow.identifier, _depender_status;


      -- perform wf_fn.complete_uow(_depender_uow.id) from wf.uow where id = _depender_uow.id and status != _depender_status;
      if _depender_uow.type = 'task' then
        if _depender_status = 'incomplete' then
          perform wf_fn.waiting_uow(_depender_uow.id);
        end if;
      end if;

      if _depender_uow.type = 'milestone' and _depender_status = 'waiting' then
        for _child_uow in
          select * from wf.uow where parent_uow_id = _depender_uow.id
        loop
          _child_status := (select wf_fn.compute_uow_status(_child_uow.id));
          if _child_status = 'complete' then
            perform wf_fn.complete_uow(_child_uow.id);
          end if;
          if _child_status = 'incomplete' then
            perform wf_fn.incomplete_uow(_child_uow.id);
          end if;
          if _child_status = 'waiting' then
            perform wf_fn.waiting_uow(_child_uow.id);
          end if;
        end loop;
      end if;
    end loop;

    -- compute parent status
    if _uow.parent_uow_id is not null then
      _parent_status := (select wf_fn.compute_uow_status(id)
      from wf.uow
      where id = _uow.parent_uow_id
      );
      -- recursion
      if _parent_status = 'complete' then
        raise exception 'MAJOR ERROR: parent of incomplete uow cannot be complete';
      end if;
      if _parent_status = 'incomplete' then
        raise exception 'MAJOR ERROR: parent of incomplete uow cannot be incomplete';
      end if;
      if _parent_status = 'waiting' then
        perform wf_fn.waiting_uow(_uow.parent_uow_id);
      end if;
    end if;

    return _uow;
  end;
  $$;
------------------------------------------------------- pause_uow
CREATE OR REPLACE FUNCTION wf_api.pause_uow(_uow_id uuid)
  RETURNS wf.uow
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _uow wf.uow;
  BEGIN
    _uow := wf_fn.pause_uow(_uow_id);
    return _uow;
  end;
  $$;

CREATE OR REPLACE FUNCTION wf_fn.pause_uow(_uow_id uuid) RETURNS wf.uow
    LANGUAGE plpgsql
    AS $$
  DECLARE
    _uow wf.uow;
    _wf_uow wf.uow;
    _result wf_fn.complete_uow_result;
    _err_context citext;
  BEGIN
    select *
    into _uow
    from wf.uow
    where id = _uow_id
    ;

    if _wf_uow.status = 'error' then
      return _uow;
    end if;

    if _uow.id is null then
      raise exception 'no uow for id: %', _uow_id;
    end if;

    select * into _wf_uow from wf.uow where id = (select uow_id from wf.wf where id = _uow.wf_id);
    if _wf_uow.status in ('paused', 'error', 'canceled', 'deleted', 'template', 'complete') then
      raise exception '(pause) cannot update a uow with wf status: %', _wf_uow.status;
    end if;

    update wf.uow
    set status = 'paused'
    where id = _uow.id
    returning * into _uow
    ;

    update wf.uow
    set status = 'paused'
    where id = _wf_uow.id
    ;

    return _uow;
  end;
  $$;
------------------------------------------------------- waiting_uow
CREATE OR REPLACE FUNCTION wf_api.waiting_uow(_uow_id uuid)
  RETURNS wf.uow
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _uow wf.uow;
  BEGIN
    _uow := wf_fn.waiting_uow(_uow_id);
    return _uow;
  end;
  $$;

CREATE OR REPLACE FUNCTION wf_fn.waiting_uow(_uow_id uuid) RETURNS wf.uow
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _uow wf.uow;
    _wf_uow wf.uow;
    _result wf_fn.complete_uow_result;
  BEGIN
    select *
    into _uow
    from wf.uow
    where id = _uow_id
    ;

    if _uow.id is null then
      raise exception 'no uow for id: %', _uow_id;
    end if;


    if _wf_uow.status = 'error' then
      return _uow;
    end if;

    select * into _wf_uow from wf.uow where id = (select uow_id from wf.wf where id = _uow.wf_id);
    if _wf_uow.status in ('paused', 'error', 'canceled', 'deleted', 'template', 'complete') then
      raise exception '(waiting) cannot update a uow with wf status: %', _wf_uow.status;
    end if;

    update wf.uow
    set status = 'waiting'
    where id = _uow.id
    returning * into _uow
    ;

    return _uow;
  end;
  $$;

------------------------------------------------------- save_wf_layout
CREATE OR REPLACE FUNCTION wf_api.save_wf_layout(_wf_id uuid, _layout jsonb)
  RETURNS wf.wf
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _wf wf.wf;
  BEGIN
    _wf := wf_fn.save_wf_layout(_wf_id, _layout);
    return _wf;
  end;
  $$;

CREATE OR REPLACE FUNCTION wf_fn.save_wf_layout(_wf_id uuid, _layout jsonb) RETURNS wf.wf
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _wf wf.wf;
  BEGIN
    select *
    into _wf
    from wf.wf
    where id = _wf_id
    ;

    if _wf.id is null then
      raise exception 'no wf for id: %', _wf_id;
    end if;


    update wf.wf
    set layout_override = _layout
    where id = _wf.id
    returning * into _wf
    ;

    return _wf;
  end;
  $$;

-- helper functions not exposed thru api
------------------------------------------------------- clone_wf_template
-- CREATE OR REPLACE FUNCTION wf_api.clone_wf_template(_identifier citext, _options wf_fn.clone_wf_template_options DEFAULT ROW('{}'::jsonb)::wf_fn.clone_wf_template_options) RETURNS wf.wf
--     LANGUAGE plpgsql
--     AS $$
--   DECLARE
--     _wf wf.wf;
--     _wf_uow wf.uow;
--     _err_context citext;
--   BEGIN
--     _wf := (
--       select wf_fn.clone_wf_template(
--         _identifier
--         ,auth_ext.tenant_id()
--         ,_options
--       )
--     );

--     return _wf;
--   END
--   $$;

CREATE OR REPLACE FUNCTION wf_fn.clone_wf_template(_identifier citext, _tenant_id uuid, _options wf_fn.clone_wf_template_options DEFAULT ROW('{}'::jsonb)::wf_fn.clone_wf_template_options) RETURNS wf.wf
    LANGUAGE plpgsql
    AS $$
  DECLARE
    _wf_template wf.wf;
    _wf wf.wf;
    _wf_uow wf.uow;
    _err_context citext;
  BEGIN

    select * 
    into _wf_template 
    from wf.wf 
    where 1=1
    -- tenant_id = _tenant_id
    and identifier = _identifier
    and is_template = true
    ;

    if _wf_template.id is null then
      raise exception 'no wf template for _identifier: %', _identifier;
    end if;

    insert into wf.wf(
      identifier,
      tenant_id,
      name,
      description,
      type,
      is_template,
      workflow_data,
      input_definitions
    )
    values (
      _wf_template.identifier
      ,_tenant_id
      ,_wf_template.name
      ,_wf_template.description
      ,_wf_template.type
      ,false
      ,_options.data
      ,coalesce(_wf_template.input_definitions, '{}'::wf.workflow_input_definition[])
    )
    returning *
    into _wf;

    -- raise exception '_wf: %', _wf.id;

    perform wf_fn.clone_uow_template(
      id
      ,_wf
    ) 
    from wf.uow 
    where wf_id = _wf_template.id
    ;


    select * into _wf_uow from wf.uow where wf_id = _wf.id and type = 'wf';

    update wf.wf set
      uow_id = _wf_uow.id
    where id = _wf.id
    returning * into _wf;

    -- calculate and apply task lineages
    with uow_map as (
      select
        pnt.identifier parent_identifier
        ,chd.identifier child_identifier
      from wf.wf p
      join wf.uow pnt on pnt.wf_id = p.id
      join wf.uow chd on pnt.id = chd.parent_uow_id
      where p.id = _wf_template.id
    )
    ,np_uows as (
      select
        chd.id child_uow_id
        ,pnt.id parent_uow_id
      from wf.uow chd
      join uow_map um on chd.identifier = um.child_identifier
      join wf.uow pnt on pnt.identifier = um.parent_identifier
      where chd.wf_id = _wf.id
      and pnt.wf_id = _wf.id
    )
    update wf.uow c_uow set
      parent_uow_id = np_uows.parent_uow_id
    from np_uows
    where c_uow.id = np_uows.child_uow_id
    ;
    -- calculate and apply task dependencies
    with uow_map as (
      select
        dee.identifier dee_identifier
        ,der.identifier der_identifier
      from wf.uow_dependency d
      join wf.uow dee on dee.id = d.dependee_id
      join wf.uow der on der.id = d.depender_id
      where dee.wf_id = _wf_template.id
    )
    ,np_uows as (
      select
        dee.tenant_id
        ,dee.id dependee_uow_id
        ,der.id depender_uow_id
        ,dee.is_template
      from wf.uow dee
      join uow_map um on dee.identifier = um.dee_identifier
      join wf.uow der on der.identifier = um.der_identifier
      where dee.wf_id = _wf.id
      and der.wf_id = _wf.id
    )
    insert into wf.uow_dependency(
      tenant_id
      ,wf_id
      ,dependee_id
      ,depender_id
    )
    select
      np_uows.tenant_id
      ,_wf.id
      ,np_uows.dependee_uow_id
      ,np_uows.depender_uow_id
    from np_uows
    ;

    -- WAITING: all uows that are dependers on other uows
    update wf.uow set status = 'waiting' where id
    in (select d.depender_id from wf.uow_dependency d join wf.uow u on d.depender_id = u.id where u.wf_id = _wf.id)
    ;

    -- WAITING: all uows that are parents of other uows
    update wf.uow set status = 'waiting' where id
    in (select parent_uow_id from wf.uow where wf_id = _wf.id)
    ;

    -- WAITNG: all uows that are children of dependers
    update wf.uow set status = 'waiting' where parent_uow_id
    in (select d.depender_id from wf.uow_dependency d join wf.uow u on d.depender_id = u.id where u.wf_id = _wf.id)
    ;

    return _wf;
  end;
  $$;
------------------------------------------------------- upsert_wf
-- CREATE OR REPLACE FUNCTION wf_api.upsert_wf(_wf_info wf_fn.wf_info) RETURNS wf.wf
--     LANGUAGE plpgsql
--     AS $$
--   DECLARE
--     _tenant_id uuid;
--     _wf wf.wf;
--     _err_context citext;
--   BEGIN
--     _tenant_id := auth_ext.tenant_id();
--     _wf := (select wf_fn.upsert_wf(
--       _wf_info
--       ,_tenant_id
--     ));

--     return _wf;
--   end;
--   $$;

CREATE OR REPLACE FUNCTION wf_fn.upsert_wf(_wf_info wf_fn.wf_info, _tenant_id uuid) RETURNS wf.wf
    LANGUAGE plpgsql
    AS $$
  DECLARE
    _wf wf.wf;
    _wf_uow wf.uow;
    _uow_info wf_fn.uow_info;
    _uow_dependency_info wf_fn.uow_dependency_info;
    _uow_dependency wf.uow_dependency;
    _uow_dependee wf.uow;
    _uow_depender wf.uow;
    _err_context citext;
  BEGIN
    select *
    into _wf
    from wf.wf
    where tenant_id = _tenant_id
    and identifier = _wf_info.identifier
    and is_template = true
    ;

    if _wf.id is null then
      insert into wf.wf_type(id)
      values (_wf_info.type)
      on conflict(id) do nothing
      ;

      insert into wf.wf(
        tenant_id
        ,name
        ,description
        ,identifier
        ,type
        ,is_template
        ,input_definitions
      )
      select
        _tenant_id
        ,_wf_info.name
        ,_wf_info.description
        ,_wf_info.identifier
        ,_wf_info.type
        ,true
        ,coalesce(_wf_info.input_definitions, '{}'::wf.workflow_input_definition[])
      returning *
      into _wf
      ;

      _wf_uow := (select wf_fn.upsert_uow(
        row(
          _wf_info.identifier::citext
          ,_wf_info.name::citext
          ,(_wf_info.name || ' root uow')::citext
          ,'wf'::wf.uow_type
          ,'{}'
          ,_wf.id::citext
          ,null::citext
          ,null::timestamptz
          ,_wf_info.on_completed_workflow_handler_key::citext
          ,(_wf_info.on_completed_workflow_handler_key is not null)::boolean
        )
        ,_wf.id
        ,_tenant_id
      ));

      update wf.wf set uow_id = _wf_uow.id where id = _wf.id returning * into _wf;
    else
      update wf.wf set
        updated_at = current_timestamp
        ,name = _wf_info.name
        ,is_template = _wf_info.is_template
        ,type = _wf_info.type
        ,workflow_input_definition = coalesce(_wf_info.workflow_input_definition, '{}'::jsonb)
      where id = _wf.id
      returning * into _wf
      ;

      _wf_uow := (select wf_fn.upsert_uow(
        row(
          _wf_info.identifier::citext
          ,_wf_info.name::citext
          ,(_wf_info.name || ' root uow')::citext
          ,'wf'::wf.uow_type
          ,'{}'
          ,_wf.id::citext
          ,null::citext
          ,null::timestamptz
          ,_wf_info.on_completed_workflow_handler_key::citext
          ,(_wf_info.on_completed_workflow_handler_key is not null)::boolean
        )
        ,_wf.id
        ,_tenant_id
      ));
    end if;

    foreach _uow_info in array(_wf_info.uows)
    loop
      _uow_info.wf_id := _wf.id;
      perform wf_fn.upsert_uow(_uow_info, _wf.id, _tenant_id);
    end loop;

    update wf.uow set 
      parent_uow_id = _wf_uow.id
    where wf_id = _wf.id
    and parent_uow_id is null
    and type != 'wf'
    ;

    foreach _uow_dependency_info in array(_wf_info.uow_dependencies)
    loop
      select *
      into _uow_dependee
      from wf.uow 
      where wf_id = _wf.id
      and identifier = _uow_dependency_info.dependee_identifier
      ;
      if _uow_dependee.id is null then
        raise exception 'no dependee for identifier: %', _uow_dependency_info.dependee_identifier;
      end if;

      select *
      into _uow_depender
      from wf.uow 
      where wf_id = _wf.id
      and identifier = _uow_dependency_info.depender_identifier
      ;
      if _uow_depender.id is null then
        raise exception 'no depender for identifier: %', _uow_dependency_info.depender_identifier;
      end if;


      select * 
      into _uow_dependency from wf.uow_dependency
      where dependee_id = _uow_dependee.id
      and depender_id = _uow_depender.id
      ;

      if _uow_dependency.id is null then
        insert into wf.uow_dependency(
          tenant_id
          ,wf_id
          ,dependee_id
          ,depender_id
          ,is_template
        )
        select
          _tenant_id
          ,_wf.id
          ,_uow_dependee.id
          ,_uow_depender.id
          ,_wf.is_template
        ;
      end if;
    end loop;

    perform wf_fn.compute_uow_status(id)
    from wf.uow
    where wf_id = _wf.id
    and type in ('milestone')
    ;

    return _wf;
  end;
  $$;
------------------------------------------------------- upsert_uow
-- CREATE OR REPLACE FUNCTION wf_api.upsert_uow(_uow_info wf_fn.uow_info, _wf_id uuid) RETURNS wf.uow
--   LANGUAGE plpgsql
--   VOLATILE
--   SECURITY INVOKER
--   AS $$
--   DECLARE
--     _uow wf.uow;
--     _tenant_id uuid;
--     _err_context citext;
--   BEGIN
--     _tenant_id := auth_ext.tenant_id();
--     _uow := (select wf_fn.upsert_uow(
--       _uow_info
--       ,_wf_id
--       ,_tenant_id
--     ));

--     return _uow;
--   end;
--   $$;

CREATE OR REPLACE FUNCTION wf_fn.upsert_uow(
    _uow_info wf_fn.uow_info,
    _wf_id uuid,
    _tenant_id uuid
  ) RETURNS wf.uow
    LANGUAGE plpgsql
    AS $$
  DECLARE
    _uow wf.uow;
    _parent_uow wf.uow;
    _err_context citext;
  BEGIN
    select *
    into _uow
    from wf.uow
    where tenant_id = _tenant_id
    and identifier = _uow_info.identifier
    and wf_id = _wf_id
    ;

    select * 
    into _parent_uow
    from wf.uow
    where wf_id = _wf_id
    and identifier = _uow_info.parent_uow_id
    or id = _uow.parent_uow_id::uuid
    ;

    if _parent_uow.id is null then
      select * 
      into _parent_uow
      from wf.uow
      where wf_id = _wf_id
      and (id = _wf_id or identifier = _wf_id::citext)
      ;
    end if;

    if _uow.id is null then
      insert into wf.uow(
        tenant_id
        ,identifier
        ,is_template
        ,name
        ,description
        ,type
        ,data
        ,wf_id
        ,status
        ,due_at
        ,parent_uow_id
        ,workflow_handler_key
        ,use_worker
      )
      select
        _tenant_id
        ,_uow_info.identifier
        ,true
        ,_uow_info.name
        ,_uow_info.description
        ,_uow_info.type
        ,_uow_info.data
        ,_wf_id
        ,'template'::wf.uow_status_type
        ,_uow_info.due_at
        ,_parent_uow.id
        ,_uow_info.workflow_handler_key
        ,coalesce(_uow_info.use_worker, false)
      returning *
      into _uow
      ;

      -- promote any parent task to a milestone
      update wf.uow set type = 'milestone' where id = _uow.parent_uow_id and type = 'task';
    else
      update wf.uow set
        updated_at = current_timestamp
        ,name = _uow_info.name
        -- ,is_template = _uow_info.is_template  --- should check for unique keys at beginning of upsert_workflow
        ,type = _uow_info.type
        ,workflow_handler_key = _uow_info.workflow_handler_key
      where id = _uow.id
      ;
    end if;

    return _uow;
  end;
  $$;
------------------------------------------------------- delete_uow
-- CREATE OR REPLACE FUNCTION wf_api.delete_uow(_uow_id uuid)
--   RETURNS boolean
--   LANGUAGE plpgsql
--   VOLATILE
--   SECURITY INVOKER
--   AS $$
--   DECLARE
--   BEGIN
--     perform wf_fn.delete_uow(_uow_id);
--     return true;
--   end;
--   $$;

CREATE OR REPLACE FUNCTION wf_fn.delete_uow(_uow_id uuid) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
  DECLARE
    _uow wf.uow;
    _sibling_count integer;
    _err_context citext;
  BEGIN

    select * into _uow from wf.uow where id = _uow_id;

    if _uow.id is null then
      raise exception 'no uow for id: %', _uow_id;
    end if;

    -- update parent uow from milestone to task, where appropriate
    select count(*) into _sibling_count from wf.uow where parent_uow_id = _uow.parent_uow_id and id != _uow.id;
    if _sibling_count = 0 then
      update wf.uow set type = 'task' where id = _uow.parent_uow_id and type = 'milestone';
    end if;

    delete from uow where id = _uow_id;

    return true;
  end;
  $$;
------------------------------------------------------- compute_uow_status
CREATE OR REPLACE FUNCTION wf_fn.compute_uow_status(_uow_id uuid) 
    RETURNS wf.uow_status_type
    STABLE
    SECURITY INVOKER
    LANGUAGE plpgsql
    AS $$
  DECLARE
    _uow wf.uow;
    _parent_uow wf.uow;
    _children_count integer;
    _dependency_count integer;
    _error_count integer;
    _status wf.uow_status_type;
    _err_context citext;
  BEGIN
    -- this function calculates status for the specified uow based on status of relative uows
    -- 
    select * into _uow from wf.uow where id = _uow_id;
    select count(*) into _children_count
    from wf.uow
    where parent_uow_id = _uow_id
    and status in ('incomplete', 'waiting');

    select count(*) into _dependency_count
    from wf.uow_dependency d
    join wf.uow dee on d.dependee_id = dee.id
    where d.depender_id = _uow_id
    and dee.status in ('incomplete', 'waiting')
    ;

    if _uow.type = 'wf' then
      select count(*) into _error_count
      from wf.uow
      where wf_id = _uow.wf_id
      and status in ('error')
      ;

      _status := (
        select case
          when _error_count > 0 then 'error'::wf.uow_status_type
          when _dependency_count > 0 then 'waiting'::wf.uow_status_type
          when _children_count > 0 then 'waiting'::wf.uow_status_type
          else 'incomplete'::wf.uow_status_type
        end
      );
    end if;

    if _uow.type = 'milestone' then
      _status := (
        select case
          when _dependency_count > 0 then 'waiting'::wf.uow_status_type
          when _children_count > 0 then 'waiting'::wf.uow_status_type
          else 'complete'::wf.uow_status_type
        end
      );
    end if;

    if _uow.type = 'task' then
      select * into _parent_uow
      from wf.uow where id = _uow.parent_uow_id
      ;

      if _children_count > 0 then
        raise exception 'workflow task cannot have children';
      end if;
      if _dependency_count > 0 then
        _status := 'waiting';
      else
        _status := (
          select case
            when _uow.status = 'complete' then 'complete'
            when _uow.status = 'paused' then 'paused'
            when _uow.status = 'canceled' then 'canceled'
            when _uow.status = 'deleted' then 'deleted'
            when _uow.status = 'error' then 'error'
            else 'incomplete'
          end
        );
      end if;
    end if;

    -- raise notice 'COMPUTING STATUS: % - % - % - % - %', _uow.type, _uow.identifier, _children_count, _dependency_count, _status;
    return _status;
  end;
  $$;
------------------------------------------------------- clone_uow_template
CREATE OR REPLACE FUNCTION wf_fn.clone_uow_template(_uow_id uuid, _wf wf.wf) RETURNS wf.uow
    LANGUAGE plpgsql
    AS $$
  DECLARE
    _uow wf.uow;
    _err_context citext;
  BEGIN
    select * into _uow from wf.uow where id = _uow_id and is_template = 'true';

    if _uow.id is null then
      raise exception 'no uow template for id: %', _uow_id;
    end if;

    insert into wf.uow(
      identifier
      ,tenant_id
      ,is_template
      ,name
      ,description
      ,type
      ,data
      ,wf_id
      ,status
      ,workflow_handler_key
      ,use_worker
    )
    values (
      _uow.identifier
      ,_wf.tenant_id
      ,false
      ,_uow.name
      ,_uow.description
      ,_uow.type
      ,_uow.data
      ,_wf.id
      ,'incomplete'
      ,_uow.workflow_handler_key
      ,_uow.use_worker
    )
    returning *
    into _uow;

    return _uow;
  end;
  $$;

-- queries can live directly in api
------------------------------------------------------- search_wfs
CREATE OR REPLACE FUNCTION wf_api.search_wfs(_options wf_fn.search_wfs_options) RETURNS SETOF wf.wf
    LANGUAGE plpgsql STABLE SECURITY INVOKER
    AS $$
  DECLARE
    _err_context citext;
    _search_terms citext[];
  BEGIN
    -- _search_terms :=
    if 
      _options.wf_type is null and
      _options.is_template is null and
      _options.search_terms is null and
      _options.date_range_start is null and
      _options.date_range_end is null and
      _options.app_user_id is null and
      _options.tenant_id is null and
      _options.wf_uow_status is null
    then
      raise exception 'must specify one or more options';
    end if;
    
    return query
    select *
    from wf.wf p
    where is_template = false
    and (_options.wf_type is null or p.type = _options.wf_type)
    and (_options.app_user_id is null or p.workflow_data #>> '{workflowInputData,appUserId}' = _options.app_user_id)
    -- and (_options.app_user_id is null or p.workflow_data #>> '{workflowInputData,appUserId}' = _options.app_user_id)
    -- and (_options.app_user_id is null or p.workflow_data #>> '{workflowInputData,appUserId}' = _options.app_user_id)
    -- and (_options.app_user_id is null or p.workflow_data #>> '{workflowInputData,appUserId}' = _options.app_user_id)
    -- and (_options.app_user_id is null or p.workflow_data #>> '{workflowInputData,appUserId}' = _options.app_user_id)
    -- and (_options.app_user_id is null or p.workflow_data #>> '{workflowInputData,appUserId}' = _options.app_user_id)
    order by created_at desc
    limit _options.result_limit
    ;
  END
  $$;
------------------------------------------------------- uow_by_wf_and_identifier
CREATE OR REPLACE FUNCTION wf_api.uow_by_wf_and_identifier(_wf_id uuid, _identifier citext) RETURNS wf.uow
    LANGUAGE plpgsql STABLE SECURITY INVOKER
    AS $$
  DECLARE
    _uow wf.uow;
  BEGIN

    select *
    into _uow
    from wf.uow
    where wf_id = _wf_id
    and identifier = _identifier
    ;

    return _uow;

  END
  $$;
------------------------------------------------------- uow_by_wf_and_identifier
CREATE OR REPLACE FUNCTION wf_api.wf_template_by_identifier(_identifier citext) RETURNS wf.wf
    LANGUAGE plpgsql STABLE SECURITY INVOKER
    AS $$
  DECLARE
    _wf wf.wf;
  BEGIN

    select *
    into _wf
    from wf.wf
    where identifier = _identifier
    ;

    return _wf;

  END
  $$;

