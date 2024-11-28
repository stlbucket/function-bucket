select wf_fn.upsert_wf(
  row(
    'wf-exerciser'::citext -- identifier,
    ,'wf-exerciser'::citext -- type,
    ,'Workflow Exerciser'::citext -- name,
    ,'Demonstrates workflow capabilities'::citext -- description
    ,array[
      row(
        'init-workflow-exerciser'::citext -- identifier
        ,'Init Workflow Exerciser'::citext -- name
        ,'Initial housekeeping stuff'::citext -- description,
        ,'task'::wf.uow_type
        ,'{}'::jsonb
        ,null::citext -- wf_id
        ,'wf-exerciser'::citext -- parent_uow_id
        ,null::timestamp with time zone -- due_at
        ,'init-workflow-exerciser'::citext -- workflow_handler_key,
        ,true::boolean -- use_worker
      )::wf_fn.uow_info
      ,row(
        'do-the-things'::citext -- identifier
        ,'Do the things'::citext -- name
        ,'This is about the milestone'::citext -- description,
        ,'milestone'::wf.uow_type
        ,'{}'::jsonb
        ,null::citext -- wf_id
        ,'wf-exerciser'::citext -- parent_uow_id
        ,null::timestamp with time zone -- due_at
        ,'do-the-things'::citext -- workflow_handler_key,
        ,true::boolean -- use_worker
      )::wf_fn.uow_info
      ,row(
        'get-stock-quote'::citext -- identifier
        ,'Get a stock quote'::citext -- name
        ,'Get a stock quote'::citext -- description,
        ,'task'::wf.uow_type
        ,'{}'::jsonb
        ,null::citext -- wf_id
        ,'do-the-things'::citext -- parent_uow_id
        ,null::timestamp with time zone -- due_at
        ,'get-stock-quote'::citext -- workflow_handler_key,
        ,true::boolean -- use_worker
      )::wf_fn.uow_info
      ,row(
        'maybe-throw-error'::citext -- identifier
        ,'Maybe throw an error'::citext -- name
        ,'Maybe throw an error'::citext -- description,
        ,'task'::wf.uow_type
        ,'{}'::jsonb
        ,null::citext -- wf_id
        ,'do-the-things'::citext -- parent_uow_id
        ,null::timestamp with time zone -- due_at
        ,'maybe-throw-error'::citext -- workflow_handler_key,
        ,true::boolean -- use_worker
      )::wf_fn.uow_info
      ,row(
        'maybe-raise-exception'::citext -- identifier
        ,'Maybe raise an exception'::citext -- name
        ,'Maybe raise an exception'::citext -- description,
        ,'task'::wf.uow_type
        ,'{}'::jsonb
        ,null::citext -- wf_id
        ,'do-the-things'::citext -- parent_uow_id
        ,null::timestamp with time zone -- due_at
        ,'maybe-raise-exception'::citext -- workflow_handler_key,
        ,true::boolean -- use_worker
      )::wf_fn.uow_info
      ,row(
        'finish-workflow-exerciser'::citext -- identifier
        ,'Finish Workflow Exerciser'::citext -- name
        ,'Final housekeeping stuff'::citext -- description,
        ,'task'::wf.uow_type
        ,'{}'::jsonb
        ,null::citext -- wf_id
        ,null::citext -- parent_uow_id
        ,null::timestamp with time zone -- due_at
        ,'finish-workflow-exerciser'::citext -- workflow_handler_key,
        ,true::boolean -- use_worker
      )::wf_fn.uow_info
    ]::wf_fn.uow_info[] -- uows
    ,array[
      row(
        'do-the-things'::citext --depender_identifier
        ,'init-workflow-exerciser'::citext -- dependee_identifier
      )::wf_fn.uow_dependency_info
      ,row(
        'maybe-throw-error'::citext --depender_identifier
        ,'get-stock-quote'::citext -- dependee_identifier
      )::wf_fn.uow_dependency_info
      ,row(
        'maybe-raise-exception'::citext --depender_identifier
        ,'maybe-throw-error'::citext -- dependee_identifier
      )::wf_fn.uow_dependency_info
      ,row(
        'finish-workflow-exerciser'::citext --depender_identifier
        ,'do-the-things'::citext -- dependee_identifier
      )::wf_fn.uow_dependency_info
    ]::wf_fn.uow_dependency_info[]
    ,'close-workflow-wf'::citext -- on_completed_workflow_handler_key
    ,array[
      row(
        'stockSymbol'::citext -- name
        ,'string'::wf.workflow_input_data_type -- data_type
        ,'TSLA'::citext -- default_value
        ,true -- isRequired
      )::wf.workflow_input_definition
      ,row(
        'throwError'::citext -- name
        ,'boolean'::wf.workflow_input_data_type -- data_type
        ,null::citext -- default_value
        ,false -- isRequired
      )::wf.workflow_input_definition
      ,row(
        'raiseExceptionMessage'::citext -- name
        ,'string'::wf.workflow_input_data_type -- data_type
        ,null::citext -- default_value
        ,false -- isRequired
      )::wf.workflow_input_definition
    ]::wf.workflow_input_definition[]
  )::wf_fn.wf_info
  ,(select id from app.tenant where identifier = 'anchor')
);
