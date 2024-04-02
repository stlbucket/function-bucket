\x on
\pset pager off
-----------------------------  TENANT

begin;
    select bandz_fn.install_bandz_application();
commit;

begin;
  select app_fn.create_tenant(
    _name => 'Shady Bottom Studio'::citext
    ,_identifier => 'shady-bottom-studio'::citext
    ,_email => 'bucket@function-bucket.net'::citext
    ,_type => 'customer'::app.tenant_type
  );
commit;

begin;
  select app_fn.subscribe_tenant_to_license_pack(
    (select id from app.tenant where identifier = 'shady-bottom-studio')
    ,'bandz'
  );
commit;

begin;
  select app_fn.invite_user(id, 'brassmoose@gmail.com', 'admin') from app.tenant where identifier = 'shady-bottom-studio';
  -- select app_fn.invite_user(id, 'EMAIL', 'user') from app.tenant where identifier = 'shady-bottom-studio';

  INSERT INTO
    auth.users (
      email,
      instance_id, id, aud, role, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
    )
    values
      (
        'brassmoose@gmail.com',  -- this is the line that matters
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
        'brassmoose@gmail.com'
        -- ,'EMAIL'
      )
    );

commit;