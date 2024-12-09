select wf_fn.upsert_wf(
  row(
    'the-waiting-game'::citext -- identifier,
    ,'the-waiting-game'::citext -- type,
    ,'The Waiting Game'::citext -- name,
    ,'Just a bunch of waiting'::citext -- description
    ,array[
      row(
        'wait-first'::citext -- identifier
        ,'Wait first'::citext -- name
        ,'Wait a specified number of milliseconds'::citext -- description,
        ,'task'::wf.uow_type
        ,'{"afterStepDelay":2000}'::jsonb
        ,null::citext -- wf_id
        ,'the-waiting-game'::citext -- parent_uow_id
        ,null::timestamp with time zone -- due_at
        ,'wait'::citext -- workflow_handler_key,
        ,true::boolean -- use_worker
      )::wf_fn.uow_info
      ,row(
        'wait-for-these-1'::citext -- identifier
        ,'Wait for these 1'::citext -- name
        ,'This is about the milestone'::citext -- description,
        ,'milestone'::wf.uow_type
        ,'{}'::jsonb
        ,null::citext -- wf_id
        ,'the-waiting-game'::citext -- parent_uow_id
        ,null::timestamp with time zone -- due_at
        ,'wait'::citext -- workflow_handler_key,
        ,true::boolean -- use_worker
      )::wf_fn.uow_info
      ,row(
        'wait-1-1'::citext -- identifier
        ,'Wait 1-1'::citext -- name
        ,'Wait a specified number of milliseconds'::citext -- description,
        ,'task'::wf.uow_type
        ,'{"afterStepDelay":2000}'::jsonb
        ,null::citext -- wf_id
        ,'wait-for-these-1'::citext -- parent_uow_id
        ,null::timestamp with time zone -- due_at
        ,'wait'::citext -- workflow_handler_key,
        ,true::boolean -- use_worker
      )::wf_fn.uow_info
      ,row(
        'wait-1-2'::citext -- identifier
        ,'Wait 1-2'::citext -- name
        ,'Wait a specified number of milliseconds'::citext -- description,
        ,'task'::wf.uow_type
        ,'{"afterStepDelay":2000}'::jsonb
        ,null::citext -- wf_id
        ,'wait-for-these-1'::citext -- parent_uow_id
        ,null::timestamp with time zone -- due_at
        ,'wait'::citext -- workflow_handler_key,
        ,true::boolean -- use_worker
      )::wf_fn.uow_info
      ,row(
        'wait-for-these-2'::citext -- identifier
        ,'Wait for these 2'::citext -- name
        ,'This is about the milestone'::citext -- description,
        ,'milestone'::wf.uow_type
        ,'{}'::jsonb
        ,null::citext -- wf_id
        ,'the-waiting-game'::citext -- parent_uow_id
        ,null::timestamp with time zone -- due_at
        ,'wait'::citext -- workflow_handler_key,
        ,true::boolean -- use_worker
      )::wf_fn.uow_info
      ,row(
        'wait-2-1'::citext -- identifier
        ,'Wait 2-1'::citext -- name
        ,'Wait a specified number of milliseconds'::citext -- description,
        ,'task'::wf.uow_type
        ,'{"afterStepDelay":4000}'::jsonb
        ,null::citext -- wf_id
        ,'wait-for-these-2'::citext -- parent_uow_id
        ,null::timestamp with time zone -- due_at
        ,'wait'::citext -- workflow_handler_key,
        ,true::boolean -- use_worker
      )::wf_fn.uow_info
      ,row(
        'wait-2-2'::citext -- identifier
        ,'Wait 2-2'::citext -- name
        ,'Wait a specified number of milliseconds'::citext -- description,
        ,'task'::wf.uow_type
        ,'{"afterStepDelay":500}'::jsonb
        ,null::citext -- wf_id
        ,'wait-for-these-2'::citext -- parent_uow_id
        ,null::timestamp with time zone -- due_at
        ,'wait'::citext -- workflow_handler_key,
        ,true::boolean -- use_worker
      )::wf_fn.uow_info
      ,row(
        'wait-for-these-3'::citext -- identifier
        ,'Wait for these 3'::citext -- name
        ,'This is about the milestone'::citext -- description,
        ,'milestone'::wf.uow_type
        ,'{}'::jsonb
        ,null::citext -- wf_id
        ,'the-waiting-game'::citext -- parent_uow_id
        ,null::timestamp with time zone -- due_at
        ,'wait'::citext -- workflow_handler_key,
        ,true::boolean -- use_worker
      )::wf_fn.uow_info
      ,row(
        'wait-3-1'::citext -- identifier
        ,'Wait 3-1'::citext -- name
        ,'Wait a specified number of milliseconds'::citext -- description,
        ,'task'::wf.uow_type
        ,'{"afterStepDelay":1000}'::jsonb
        ,null::citext -- wf_id
        ,'wait-for-these-3'::citext -- parent_uow_id
        ,null::timestamp with time zone -- due_at
        ,'wait'::citext -- workflow_handler_key,
        ,true::boolean -- use_worker
      )::wf_fn.uow_info
      ,row(
        'wait-2-2'::citext -- identifier
        ,'Wait 3-2'::citext -- name
        ,'Wait a specified number of milliseconds'::citext -- description,
        ,'task'::wf.uow_type
        ,'{"afterStepDelay":2000}'::jsonb
        ,null::citext -- wf_id
        ,'wait-for-these-3'::citext -- parent_uow_id
        ,null::timestamp with time zone -- due_at
        ,'wait'::citext -- workflow_handler_key,
        ,true::boolean -- use_worker
      )::wf_fn.uow_info
      ,row(
        'wait-last'::citext -- identifier
        ,'Wait Last'::citext -- name
        ,'More waiting'::citext -- description,
        ,'task'::wf.uow_type
        ,'{"afterStepDelay":2500}'::jsonb
        ,null::citext -- wf_id
        ,'the-waiting-game'::citext -- parent_uow_id
        ,null::timestamp with time zone -- due_at
        ,'wait'::citext -- workflow_handler_key,
        ,true::boolean -- use_worker
      )::wf_fn.uow_info
    ]::wf_fn.uow_info[] -- uows
    ,array[
      row(
        'wait-for-these-1'::citext --depender_identifier
        ,'wait-first'::citext -- dependee_identifier
      )::wf_fn.uow_dependency_info
      ,row(
        'wait-last'::citext --depender_identifier
        ,'wait-for-these-1'::citext -- dependee_identifier
      )::wf_fn.uow_dependency_info
      ,row(
        'wait-for-these-2'::citext --depender_identifier
        ,'wait-first'::citext -- dependee_identifier
      )::wf_fn.uow_dependency_info
      ,row(
        'wait-last'::citext --depender_identifier
        ,'wait-for-these-2'::citext -- dependee_identifier
      )::wf_fn.uow_dependency_info
      ,row(
        'wait-1-2'::citext --depender_identifier
        ,'wait-1-1'::citext -- dependee_identifier
      )::wf_fn.uow_dependency_info
      ,row(
        'wait-2-2'::citext --depender_identifier
        ,'wait-2-1'::citext -- dependee_identifier
      )::wf_fn.uow_dependency_info
      ,row(
        'wait-for-these-3'::citext --depender_identifier
        ,'wait-first'::citext -- dependee_identifier
      )::wf_fn.uow_dependency_info
      ,row(
        'wait-last'::citext --depender_identifier
        ,'wait-for-these-3'::citext -- dependee_identifier
      )::wf_fn.uow_dependency_info
    ]::wf_fn.uow_dependency_info[]
    ,'close-workflow-wf'::citext -- on_completed_workflow_handler_key
    ,array[
      -- row(
      --   'stockSymbol'::citext -- name
      --   ,'string'::wf.workflow_input_data_type -- data_type
      --   ,'TSLA'::citext -- default_value
      --   ,true -- isRequired
      -- )::wf.workflow_input_definition
    ]::wf.workflow_input_definition[]
  )::wf_fn.wf_info
  ,(select id from app.tenant where identifier = 'anchor')
);
