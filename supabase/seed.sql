---------------------- CREATE ANCHOR TENANT AND SUPER ADMIN USER ---------------------------------------------
-- change parameters as appropriate
begin;
  select app_fn.create_anchor_tenant(
    _name => 'Anchor Tenant'::citext
    ,_email => 'bucket@function-bucket.net'::citext
  );
commit;

begin;
  insert into app.app_settings(application_key, key, display_name, value) values ('base', 'support-email', 'Site Support Email', 'site-support@example.com');
  insert into app.app_settings(application_key, key, display_name, value) values ('base', 'support-display-name', 'Site Support Display Name', 'Site Support');
commit;

begin;
INSERT INTO
  auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
  ) (
  select
    '00000000-0000-0000-0000-000000000000',
    uuid_generate_v4 (),
    'authenticated',
    'authenticated',
    'bucket@function-bucket.net',
    crypt ('poiuytre', gen_salt ('bf')),
    current_timestamp,
    current_timestamp,
    current_timestamp,
    '{"provider":"email","providers":["email"]}',
    '{}',
    current_timestamp,
    current_timestamp,
    '',
    '',
    '',
    ''
  );

-- test user email identities
INSERT INTO
  auth.identities (
    id,
    user_id,
    provider_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  ) (
    select
      uuid_generate_v4 (),
      id,
      id,
      format('{"sub":"%s","email":"%s"}', id::text, email)::jsonb,
      'email',
      current_timestamp,
      current_timestamp,
      current_timestamp
    from
      auth.users
    where email in ('bucket@function-bucket.net')
  );
commit;


begin;
 with usrs(email,first_name,last_name,phone) as (
  values
  ('stlbucket@gmail.com', 'Kevin', 'Burkett', '206.660.6219')
)
  INSERT INTO
    auth.users (
      email
      ,phone
      ,encrypted_password
      ,instance_id
      ,id
      ,aud
      ,role
      ,email_confirmed_at
      ,recovery_sent_at
      ,last_sign_in_at
      ,raw_app_meta_data
      ,raw_user_meta_data
      ,created_at
      ,updated_at
      ,confirmation_token
      ,email_change
      ,email_change_token_new
      ,recovery_token
    )
    select
      email, phone, crypt ('poiuytre', gen_salt ('bf'))
      ,'00000000-0000-0000-0000-000000000000', uuid_generate_v4 (), 'authenticated', 'authenticated'
      ,current_timestamp, current_timestamp, current_timestamp
      ,'{"provider":"email","providers":["email"]}'
      ,'{}'
      , current_timestamp, current_timestamp, '', '', '', ''
    from usrs
    ;

    INSERT INTO
    auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at) (
      select uuid_generate_v4(), id, id, format('{"sub":"%s","email":"%s"}', id::text, email)::jsonb, 'email', current_timestamp, current_timestamp, current_timestamp
      from auth.users
      where email in (
        select email from auth.users where id not in (select user_id from auth.identities)
      )
    );

 with usrs(email,first_name,last_name,phone) as (
  values
  ('stlbucket@gmail.com', 'Kevin', 'Burkett', '206.660.6219')
)
update app.profile p set
  first_name = u.first_name
  ,last_name = u.last_name
  ,phone = u.phone
from usrs u
where u.email = p.email
;
commit;

-----------------------------  TENANT

begin;
    select my_app_fn.install_my_app_application();
commit;

begin;
  select app_fn.create_tenant(
    _name => 'My App Tenant'::citext
    ,_identifier => 'my-app'::citext
    ,_email => 'bucket@function-bucket.net'::citext
    ,_type => 'customer'::app.tenant_type
  );
commit;

begin;
  select app_fn.subscribe_tenant_to_license_pack(
    (select id from app.tenant where identifier = 'my-app')
    ,'my-app'
  );
commit;

begin;
  select app_fn.invite_user(id, 'my-app-tenant-admin@example.com', 'admin') from app.tenant where identifier = 'my-app';
  select app_fn.invite_user(id, 'my-app-tenant-user@example.com', 'user') from app.tenant where identifier = 'my-app';
  -- select app_fn.invite_user(id, 'EMAIL', 'user') from app.tenant where identifier = 'my-app';

  INSERT INTO
    auth.users (
      email,
      instance_id, id, aud, role, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
    )
    values
      (
        'my-app-tenant-admin@example.com',  -- this is the line that matters
        '00000000-0000-0000-0000-000000000000', uuid_generate_v4 (), 'authenticated', 'authenticated', crypt ('poiuytre', gen_salt ('bf')), current_timestamp, current_timestamp, current_timestamp, '{"provider":"email","providers":["email"]}', '{}', current_timestamp, current_timestamp, '', '', '', ''
      )
      ,(
        'my-app-tenant-user@example.com',  -- this is the line that matters
        '00000000-0000-0000-0000-000000000000', uuid_generate_v4 (), 'authenticated', 'authenticated', crypt ('poiuytre', gen_salt ('bf')), current_timestamp, current_timestamp, current_timestamp, '{"provider":"email","providers":["email"]}', '{}', current_timestamp, current_timestamp, '', '', '', ''
      )
      -- ,(
      --   'EMAIL',  -- this is the line that matters
      --   '00000000-0000-0000-0000-000000000000', uuid_generate_v4 (), 'authenticated', 'authenticated', crypt ('poiuytre', gen_salt ('bf')), current_timestamp, current_timestamp, current_timestamp, '{"provider":"email","providers":["email"]}', '{}', current_timestamp, current_timestamp, '', '', '', ''
      -- )
    ;

  -- test user email identities
  INSERT INTO
    auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at) (
      select uuid_generate_v4(), id, id, format('{"sub":"%s","email":"%s"}', id::text, email)::jsonb, 'email', current_timestamp, current_timestamp, current_timestamp
      from auth.users
      where email in (
        -- add all emails here
        'my-app-tenant-admin@example.com'
        ,'my-app-tenant-user@example.com'
        -- ,'EMAIL'
      )
    );

commit;

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
        ,'{"afterStepDelay":2000}'::jsonb
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
        ,'{"afterStepDelay":2000}'::jsonb
        ,null::citext -- wf_id
        ,'wf-exerciser'::citext -- parent_uow_id
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


