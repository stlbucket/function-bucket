------------------------------------------------------- clone_project_template
CREATE OR REPLACE FUNCTION wf_api.clone_project_template(_identifier text, _options wf_fn.clone_project_template_options DEFAULT ROW('{}'::jsonb)::wf_fn.clone_project_template_options) RETURNS wf.project
    LANGUAGE plpgsql
    AS $$
  DECLARE
    _project wf.project;
    _project_uow wf.uow;
    _err_context text;
  BEGIN
    _project := (
      select wf_fn.clone_project_template(
        _identifier
        ,auth_ext.tenant_id()
        ,_options
      )
    );

    return _project;
  END
  $$;

CREATE OR REPLACE FUNCTION wf_fn.clone_project_template(_identifier text, _tenant_id uuid, _options wf_fn.clone_project_template_options DEFAULT ROW('{}'::jsonb)::wf_fn.clone_project_template_options) RETURNS wf.project
    LANGUAGE plpgsql
    AS $$
  DECLARE
    _project_template wf.project;
    _project wf.project;
    _project_uow wf.uow;
    _err_context text;
  BEGIN

    select * 
    into _project_template 
    from wf.project 
    where 1=1
    -- tenant_id = _tenant_id
    and identifier = _identifier
    and is_template = true
    ;

    if _project_template.id is null then
      raise exception 'no project template for _identifier: %', _identifier;
    end if;

    insert into wf.project(
      identifier,
      tenant_id,
      name,
      type,
      is_template,
      workflow_data
    )
    values (
      _project_template.identifier
      ,_tenant_id
      ,_project_template.name
      ,_project_template.type
      ,false
      ,_options.data
    )
    returning *
    into _project;

    -- raise exception '_project: %', _project.id;

    perform wf_fn.clone_uow_template(
      id
      ,_project
    ) 
    from wf.uow 
    where project_id = _project_template.id
    ;


    select * into _project_uow from wf.uow where project_id = _project.id and type = 'project';

    update wf.project set
      uow_id = _project_uow.id
    where id = _project.id
    returning * into _project;

    -- calculate and apply task lineages
    with uow_map as (
      select
        pnt.identifier parent_identifier
        ,chd.identifier child_identifier
      from wf.project p
      join wf.uow pnt on pnt.project_id = p.id
      join wf.uow chd on pnt.id = chd.parent_uow_id
      where p.id = _project_template.id
    )
    ,np_uows as (
      select
        chd.id child_uow_id
        ,pnt.id parent_uow_id
      from wf.uow chd
      join uow_map um on chd.identifier = um.child_identifier
      join wf.uow pnt on pnt.identifier = um.parent_identifier
      where chd.project_id = _project.id
      and pnt.project_id = _project.id
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
      where dee.project_id = _project_template.id
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
      where dee.project_id = _project.id
      and der.project_id = _project.id
    )
    insert into wf.uow_dependency(
      tenant_id
      ,dependee_id
      ,depender_id
    )
    select
      np_uows.tenant_id
      ,np_uows.dependee_uow_id
      ,np_uows.depender_uow_id
    from np_uows
    ;

    -- WAITING: all uows that are dependers on other uows
    update wf.uow set status = 'waiting' where id
    in (select d.depender_id from wf.uow_dependency d join wf.uow u on d.depender_id = u.id where u.project_id = _project.id)
    ;

    -- WAITING: all uows that are parents of other uows
    update wf.uow set status = 'waiting' where id
    in (select parent_uow_id from wf.uow where project_id = _project.id)
    ;

    -- WAITNG: all uows that are children of dependers
    update wf.uow set status = 'waiting' where parent_uow_id
    in (select d.depender_id from wf.uow_dependency d join wf.uow u on d.depender_id = u.id where u.project_id = _project.id)
    ;

    return _project;
  end;
  $$;
------------------------------------------------------- queue_workflow
CREATE OR REPLACE FUNCTION wf_api.queue_workflow(_identifier text, _workflow_input_data jsonb) RETURNS jsonb
    LANGUAGE plpgsql
    AS $$
  DECLARE
    _tenant_id uuid;
    _result jsonb;
    _err_context text;
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

CREATE OR REPLACE FUNCTION wf_fn.queue_workflow(_identifier text, _tenant_id uuid, _workflow_input_data jsonb) RETURNS jsonb
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
  DECLARE
    _project wf.project;
    _uows_to_schedule wf.uow[];
    _result wf_fn.queue_workflow_result;
    _err_context text;
  BEGIN

    _project := (
      select wf_fn.clone_project_template(
        _identifier
        ,_tenant_id
        ,row(_workflow_input_data)
      )
    );

    with uows as (
      select *
      from wf.uow
      where project_id = _project.id
      and type = 'task'
      and status = 'incomplete'
      and use_worker = true
    )
    select array_agg(u.*)
    into _uows_to_schedule
    from uows u
    ;

    _result.project := _project;
    _result.uows_to_schedule := _uows_to_schedule;

    return to_jsonb(_result);
  end;
  $$;

CREATE OR REPLACE FUNCTION wf_fn.queue_anon_workflow(_identifier text, _workflow_input_data jsonb, _tenant_id uuid DEFAULT NULL::uuid) RETURNS jsonb
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
  DECLARE
    _project wf.project;
    _uows_to_schedule wf.uow[];
    _result wf_fn.queue_workflow_result;
    _err_context text;
  BEGIN

    -- if _identifier not in (
    --   'brochure-contact'
    -- ) then
    --   raise exception 'cannot perform this workflow anonymously';
    -- end if;

    if _tenant_id is null then
      select id into _tenant_id
      from app.tenant where type = 'anchor';
    end if;

    _project := (
      select wf_fn.clone_project_template(
        _identifier
        ,_tenant_id
        ,row(_workflow_input_data)
      )
    );

    with uows as (
      select *
      from wf.uow
      where project_id = _project.id
      and type = 'task'
      and status = 'incomplete'
      and use_worker = true
    )
    select array_agg(u.*)
    into _uows_to_schedule
    from uows u
    ;

    _result.project := _project;
    _result.uows_to_schedule := _uows_to_schedule;

    return to_jsonb(_result);
  end;
  $$;
------------------------------------------------------- upsert_project
CREATE OR REPLACE FUNCTION wf_fn.upsert_project(_project_info wf_fn.project_info) RETURNS wf.project
    LANGUAGE plpgsql
    AS $$
  DECLARE
    _tenant_id uuid;
    _project wf.project;
    _err_context text;
  BEGIN
    _tenant_id := auth_ext.tenant_id();
    _project := (select wf_fn.upsert_project(
      _project_info
      ,_tenant_id
    ));

    return _project;
  end;
  $$;

CREATE OR REPLACE FUNCTION wf_fn.upsert_project(_project_info wf_fn.project_info, _tenant_id uuid) RETURNS wf.project
    LANGUAGE plpgsql
    AS $$
  DECLARE
    _project wf.project;
    _project_uow wf.uow;
    _uow_info wf_fn.uow_info;
    _uow_dependency_info wf_fn.uow_dependency_info;
    _uow_dependency wf.uow_dependency;
    _uow_dependee wf.uow;
    _uow_depender wf.uow;
    _err_context text;
  BEGIN
    if _project_info.is_template is null then
      raise exception 'is_template must be specified for project_info';
    end if;

    select *
    into _project
    from wf.project
    where tenant_id = _tenant_id
    and (
        (identifier = _project_info.identifier and is_template = true and _project_info.is_template = true)
      or 
        (id = _project_info.id and is_template = false and _project_info.is_template = false)
    )
    and is_template = _project_info.is_template
    ;

  -- raise exception '_project_info.workflow_input_definition: %', _project_info.workflow_input_definition;
    if _project.id is null then
      insert into wf.project_type(id)
      values (_project_info.type)
      on conflict(id) do nothing
      ;

      insert into wf.project(
        tenant_id
        ,name
        ,identifier
        ,type
        ,is_template
        ,workflow_input_definition
      )
      select
        _tenant_id
        ,_project_info.name
        ,_project_info.identifier
        ,_project_info.type
        ,coalesce(_project_info.is_template, false)
        ,coalesce(_project_info.workflow_input_definition, '{}'::jsonb)
      returning *
      into _project
      ;

      _project_uow := (select wf_fn.do_upsert_uow(
        row(
          null
          ,_project_info.identifier
          ,_project_info.name
          ,coalesce(_project_info.is_template, false)
          ,_project_info.name || ' root uow'
          ,'project'
          ,'{}'
          ,_project.id
          ,null
          ,null
          ,_project_info.on_completed_workflow_handler_key
          ,(_project_info.on_completed_workflow_handler_key is not null)
        )
        ,_tenant_id
      ));

      update wf.project set uow_id = _project_uow.id where id = _project.id returning * into _project;
    else
      update wf.project set
        updated_at = current_timestamp
        ,name = _project_info.name
        ,is_template = _project_info.is_template
        ,type = _project_info.type
        ,workflow_input_definition = coalesce(_project_info.workflow_input_definition, '{}'::jsonb)
      where id = _project.id
      returning * into _project
      ;

      _project_uow := (select wf_fn.do_upsert_uow(
        row(
          null
          ,_project_info.identifier
          ,_project_info.name
          ,coalesce(_project_info.is_template, false)
          ,_project_info.name || ' root uow'
          ,'project'
          ,'{}'
          ,_project.id
          ,null
          ,null
          ,_project_info.on_completed_workflow_handler_key
          ,(_project_info.on_completed_workflow_handler_key is not null)
        ),
        _tenant_id
      ));
    end if;

    foreach _uow_info in array(_project_info.uows)
    loop
      _uow_info.project_id := _project.id;
      perform wf_fn.do_upsert_uow(_uow_info, _tenant_id);
    end loop;

    update wf.uow set 
      parent_uow_id = _project_uow.id
    where project_id = _project.id
    and parent_uow_id is null
    and type != 'project'
    ;

    foreach _uow_dependency_info in array(_project_info.uow_dependencies)
    loop
      select *
      into _uow_dependee
      from wf.uow 
      where project_id = _project.id
      and identifier = _uow_dependency_info.dependee_identifier
      ;
      if _uow_dependee.id is null then
        raise exception 'no dependee for identifier: %', _uow_dependency_info.dependee_identifier;
      end if;

      select *
      into _uow_depender
      from wf.uow 
      where project_id = _project.id
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
          ,dependee_id
          ,depender_id
          ,is_template
        )
        select
          _tenant_id
          ,_uow_dependee.id
          ,_uow_depender.id
          ,_project.is_template
        ;
      end if;
    end loop;

    perform wf_fn.compute_uow_status(id)
    from wf.uow
    where project_id = _project.id
    and type in ('milestone')
    ;

    return _project;
  end;
  $$;
------------------------------------------------------- upsert_uow
CREATE OR REPLACE FUNCTION wf_fn.upsert_uow_api(_uow_info wf_fn.uow_info, _tenant_id uuid) RETURNS wf.uow
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _uow wf.uow;
    _tenant_id uuid;
    _err_context text;
  BEGIN
    _tenant_id := auth_ext.tenant_id();
    _uow := (select wf_fn.do_upsert_uow(
      _uow_info
      ,_tenant_id
    ));

    return _uow;
  end;
  $$;

CREATE OR REPLACE FUNCTION wf_fn.upsert_uow(_uow_info wf_fn.uow_info, _tenant_id uuid) RETURNS wf.uow
    LANGUAGE plpgsql
    AS $$
  DECLARE
    _uow wf.uow;
    _err_context text;
  BEGIN
    if _uow_info.id is not null then
      select *
      into _uow
      from wf.uow
      where tenant_id = _tenant_id
      and id = _uow_info.id
      ;
      
      if _uow.id is null then
        raise exception 'uow id specified does not exist';
      end if;
    else 
      select *
      into _uow
      from wf.uow
      where tenant_id = _tenant_id
      and identifier = _uow_info.identifier
      and project_id = _uow_info.project_id
      ;
    end if;

    if _uow.id is null then
      insert into wf.uow(
        id
        ,tenant_id
        ,identifier
        ,is_template
        ,name
        ,description
        ,type
        ,data
        ,project_id
        ,status
        ,due_at
        ,parent_uow_id
        ,workflow_handler_key
        ,use_worker
      )
      select
        coalesce(_uow_info.id, shard_1.id_generator())
        ,_tenant_id
        ,_uow_info.identifier
        ,_uow_info.is_template
        ,_uow_info.name
        ,_uow_info.description
        ,_uow_info.type
        ,_uow_info.data
        ,_uow_info.project_id
        ,case
          when _uow_info.is_template then
            'template'::wf.uow_status_type
          else
            'incomplete'::wf.uow_status_type
        end 
        ,_uow_info.due_at
        ,(
          select id from wf.uow
          where project_id = _uow_info.project_id
          and (id = _uow_info.parent_uow_id or identifier = _uow_info.parent_uow_id)
        )
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
        ,is_template = _uow_info.is_template
        ,type = _uow_info.type
        ,workflow_handler_key = _uow_info.workflow_handler_key
      where id = _uow.id
      ;
    end if;

    return _uow;
  end;
  $$;
------------------------------------------------------- delete_uow
CREATE OR REPLACE FUNCTION wf_fn.delete_uow(_uow_id uuid)
  RETURNS boolean
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
  BEGIN
    perform wf_fn.delete_uow(_uow_id);
    return true;
  end;
  $$;

CREATE OR REPLACE FUNCTION wf_fn.delete_uow(_uow_id uuid) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
  DECLARE
    _uow wf.uow;
    _sibling_count integer;
    _err_context text;
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
------------------------------------------------------- error_uow
CREATE OR REPLACE FUNCTION wf_fn.error_uow_api(_uow_id uuid, _message text, _stack text[])
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

CREATE OR REPLACE FUNCTION wf_fn.error_uow(_uow_id uuid, _message text, _stack text[]) RETURNS wf.uow
    LANGUAGE plpgsql
    AS $$
  DECLARE
    _uow wf.uow;
    _project_uow wf.uow;
    _err_context text;
  BEGIN
    select *
    into _uow
    from wf.uow
    where id = _uow_id
    ;

    if _uow.id is null then
      raise exception 'no uow for id: %', _uow_id;
    end if;

    select * into _project_uow from wf.uow where id = (select uow_id from wf.project where id = _uow.project_id);
    if _project_uow.status in ('paused', 'canceled', 'deleted', 'template', 'complete') then
      raise exception 'cannot update a uow with project status: %', _project_uow.status;
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
    where id = _project_uow.id
    ;

    update wf.project set
      workflow_data = workflow_data || jsonb_build_object(
        'error', jsonb_build_object(
          'message', _message
          ,'stack', _stack
        )
      )
    where id = _uow.project_id
    ;

    return _uow;
  end;
  $$;
------------------------------------------------------- cancel_project
CREATE OR REPLACE FUNCTION wf_fn.cancel_project_api(_project_id uuid)
  RETURNS wf.project
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _project wf.project;
  BEGIN
    _project := wf_fn.cancel_project(_project_id);
    return _project;
  end;
  $$;

CREATE OR REPLACE FUNCTION wf_fn.cancel_project(_project_id uuid) RETURNS wf.project
    LANGUAGE plpgsql
    AS $$
  DECLARE
    _project wf.project;
    _err_context text;
  BEGIN
    select * into _project
    from wf.project 
    where id = _project_id;

    if _project.id is null then
      raise exception 'no project for id: %', _project_id;
    end if;

    update wf.uow set
      status = 'canceled'
    where project_id = _project_id
    and status != 'complete'
    ;

    return _project;
  end;
  $$;
-------------------------------------------------------
CREATE OR REPLACE FUNCTION wf_fn.complete_uow_api(_uow_id uuid, _options wf_fn.complete_uow_options DEFAULT ROW(NULL::jsonb, NULL::jsonb))
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
    _project_uow wf.uow;
    _data jsonb;
    _uows_to_schedule wf.uow[];
    _depender_uow wf.uow;
    _child_uow wf.uow;
    _depender_status wf.uow_status_type;
    _child_status wf.uow_status_type;
    _parent_status wf.uow_status_type;
    _result wf_fn.complete_uow_result;
    _err_context text;
  BEGIN
    select *
    into _uow
    from wf.uow
    where id = _uow_id
    ;

    if _uow.id is null then
      raise exception 'no uow for id: %', _uow_id;
    end if;

    if _uow.status not in ('incomplete', 'waiting') then
      raise exception 'can only complete an incomplete or waiting uow: % - %', _uow.identifier, _uow.status;
    end if;

    select * into _project_uow from wf.uow where id = (select uow_id from wf.project where id = _uow.project_id);
    if _project_uow.status in ('paused', 'error', 'canceled', 'deleted', 'template', 'complete') then
      raise exception 'cannot update a uow with project status: %', _project_uow.status;
    end if;

    if _uow.status != 'complete' then
      raise notice 'updating: %, %', _uow.identifier, 'complete';
      update wf.uow
      set 
        status = 'complete'
        ,data = data || coalesce(_options.step_data, '{}'::jsonb)
      where id = _uow.id
      returning *
      into _uow
      ;

      update wf.project set
        workflow_data = workflow_data || coalesce(_options.workflow_data, '{}'::jsonb)
      where id = _uow.project_id
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

    with uows as (
      select *
      from wf.uow
      where project_id = _uow.project_id
      -- and type = 'task'
      and status = 'incomplete'
      and use_worker = true
    )
    select array_agg(u.*)
    into _uows_to_schedule
    from uows u
    ;
    -- select * into _project_uow from wf.uow where id = (select uow_id from wf.project where id = _uow.project_id);
    -- if _project_uow.status not in ('paused', 'error', 'canceled', 'deleted', 'template', 'complete') then
    --   with uows as (
    --     select *
    --     from wf.uow
    --     where project_id = _uow.project_id
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
CREATE OR REPLACE FUNCTION wf_fn.incomplete_uow_api(_uow_id uuid)
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
    _project_uow wf.uow;
    _result wf_fn.complete_uow_result;
    _depender_status wf.uow_status_type;
    _child_status wf.uow_status_type;
    _parent_status wf.uow_status_type;
    _err_context text;
  BEGIN
    select *
    into _uow
    from wf.uow
    where id = _uow_id
    ;

    if _project_uow.status = 'error' then
      return _uow;
    end if;

    if _uow.id is null then
      raise exception 'no uow for id: %', _uow_id;
    end if;

    select * into _project_uow from wf.uow where id = (select uow_id from wf.project where id = _uow.project_id);
    if _project_uow.status in ('paused', 'error', 'canceled', 'deleted', 'template', 'complete') then
      raise exception 'cannot update a uow with project status: %', _project_uow.status;
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
CREATE OR REPLACE FUNCTION wf_fn.pause_uow_api(_uow_id uuid)
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
    _project_uow wf.uow;
    _result wf_fn.complete_uow_result;
    _err_context text;
  BEGIN
    select *
    into _uow
    from wf.uow
    where id = _uow_id
    ;

    if _project_uow.status = 'error' then
      return _uow;
    end if;

    if _uow.id is null then
      raise exception 'no uow for id: %', _uow_id;
    end if;

    select * into _project_uow from wf.uow where id = (select uow_id from wf.project where id = _uow.project_id);
    if _project_uow.status in ('paused', 'error', 'canceled', 'deleted', 'template', 'complete') then
      raise exception 'cannot update a uow with project status: %', _project_uow.status;
    end if;

    update wf.uow
    set status = 'paused'
    where id = _uow.id
    returning * into _uow
    ;

    update wf.uow
    set status = 'paused'
    where id = _project_uow.id
    ;

    return _uow;
  end;
  $$;
------------------------------------------------------- waiting_uow
CREATE OR REPLACE FUNCTION wf_fn.waiting_uow_api(_uow_id uuid)
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
    _project_uow wf.uow;
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


    if _project_uow.status = 'error' then
      return _uow;
    end if;

    select * into _project_uow from wf.uow where id = (select uow_id from wf.project where id = _uow.project_id);
    if _project_uow.status in ('paused', 'error', 'canceled', 'deleted', 'template', 'complete') then
      raise exception 'cannot update a uow with project status: %', _project_uow.status;
    end if;

    update wf.uow
    set status = 'waiting'
    where id = _uow.id
    returning * into _uow
    ;

    return _uow;
  end;
  $$;

-- helper functions not exposed thru api
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
    _err_context text;
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

    if _uow.type = 'project' then
      select count(*) into _error_count
      from wf.uow
      where project_id = _uow.project_id
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
CREATE OR REPLACE FUNCTION wf_fn.clone_uow_template(_uow_id uuid, _project wf.project, _options wf_fn.clone_uow_template_options DEFAULT ROW(('{}'::jsonb)::json)::wf_fn.clone_uow_template_options) RETURNS wf.uow
    LANGUAGE plpgsql
    AS $$
  DECLARE
    _uow wf.uow;
    _err_context text;
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
      ,project_id
      ,status
      ,workflow_handler_key
      ,use_worker
    )
    values (
      _uow.identifier
      ,_project.tenant_id
      ,false
      ,_uow.name
      ,_uow.description
      ,_uow.type
      ,_options.data
      ,_project.id
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
------------------------------------------------------- search_projects
CREATE OR REPLACE FUNCTION wf_api.search_projects(_options wf_fn.search_projects_options) RETURNS SETOF wf.project
    LANGUAGE plpgsql STABLE SECURITY INVOKER
    AS $$
  DECLARE
    _err_context text;
    _search_terms text[];
  BEGIN
    -- _search_terms :=
    if 
      _options.project_type is null and
      _options.is_template is null and
      _options.search_terms is null and
      _options.date_range_start is null and
      _options.date_range_end is null and
      _options.app_user_id is null and
      _options.tenant_id is null and
      _options.project_uow_status is null
    then
      raise exception 'must specify one or more options';
    end if;
    
    return query
    select *
    from wf.project p
    where is_template = false
    and (_options.project_type is null or p.type = _options.project_type)
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
------------------------------------------------------- uow_by_project_and_identifier
CREATE OR REPLACE FUNCTION wf_api.uow_by_project_and_identifier(_project_id uuid, _identifier text) RETURNS wf.uow
    LANGUAGE plpgsql STABLE SECURITY INVOKER
    AS $$
  DECLARE
    _uow wf.uow;
  BEGIN

    select *
    into _uow
    from wf.uow
    where project_id = _project_id
    and identifier = _identifier
    ;

    return _uow;

  END
  $$;
