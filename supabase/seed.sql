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
