-- grant anon, authenticated to postgres;
-----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS test_helpers;
-----------------------------------------------------
-- anon and authenticated should have access to test_helpers schema
GRANT USAGE ON SCHEMA test_helpers TO anon, authenticated;
-- Don't allow public to execute any functions in the test_helpers schema
ALTER DEFAULT PRIVILEGES IN SCHEMA test_helpers REVOKE EXECUTE ON FUNCTIONS FROM public;
-- Grant execute to anon and authenticated for testing purposes
ALTER DEFAULT PRIVILEGES IN SCHEMA test_helpers GRANT EXECUTE ON FUNCTIONS TO anon, authenticated;
-----------------------------------------------------
CREATE OR REPLACE FUNCTION test_helpers.create_supabase_user(
    _email citext
    ,_phone citext default null
    ,_user_metadata jsonb default '{}'::jsonb
    ,_password text default 'badpassword'::text
    ,_tenant_identifier citext default null
    ,_assignment_scope app.license_type_assignment_scope default 'user'
) RETURNS uuid AS $$
  declare
  _user_id uuid;
  _encrypted_pw text;
  _resident app.resident;
BEGIN  
  _user_id := gen_random_uuid();
  _encrypted_pw := crypt(_password, gen_salt('bf'));

  if _tenant_identifier is not null then
    _resident = (select app_fn.invite_user(
      _tenant_id => (select id from app.tenant where identifier = _tenant_identifier)
      ,_email => _email
      ,_assignment_scope => _assignment_scope
    ));
    -- raise notice 'CREATED RESIDENT: %', _resident;
  end if;
  
  INSERT INTO auth.users
    (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token, phone)
  VALUES
    ('00000000-0000-0000-0000-000000000000', _user_id, 'authenticated', 'authenticated', _email, _encrypted_pw, current_timestamp, current_timestamp, current_timestamp, '{"provider":"email","providers":["email"]}'::jsonb, _user_metadata, current_timestamp, current_timestamp, '', '', '', '', _phone);
  
  INSERT INTO auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
  VALUES
    (gen_random_uuid(), _user_id, _user_id, format('{"sub":"%s","email":"%s"}', _user_id::text, _email)::jsonb, 'email', current_timestamp, current_timestamp, current_timestamp);

  return _user_id;
END;
$$ LANGUAGE plpgsql;
-----------------------------------------------------
-----------------------------------------------------
-----------------------------------------------------
create or replace function test_helpers.login_as_user (_email text) returns void
    language plpgsql
    as $$
declare
    _auth_user auth.users;
    _profile_claims app_fn.profile_claims;
begin
    -- raise notice 'LOGGING IN AS USER: %', _email;
    select * into _auth_user from auth.users where email = _email;
    select * into _profile_claims from app_fn.current_profile_claims(_auth_user.id);

    -- execute format('set request.jwt.claim=%L', json_strip_nulls(json_build_object('user_meta_data', (_auth_user).raw_user_meta_data))::text);
    -- execute format('set request.jwt.claim=%L', jsonb_strip_nulls(to_jsonb(_profile_claims))::text);
    -- raise notice '_auth_user: %', jsonb_pretty(to_jsonb(_auth_user));
    -- raise notice 'claims: %', jsonb_pretty(to_jsonb(_profile_claims));
    execute format('set request.jwt.claim=%L', jsonb_build_object('user_metadata', jsonb_strip_nulls(to_jsonb(_profile_claims)))::text);
    execute format('set request.jwt.claim.sub=%L', (_auth_user).id::text);
    execute format('set request.jwt.claim.role=%I', (_auth_user).role);
    execute format('set request.jwt.claim.email=%L', (_auth_user).email);
    execute format('set role %I', (_auth_user).role);
end;
$$;
-----------------------------------------------------
create or replace function test_helpers.login_as_anon() returns void
    language plpgsql
    as $$
begin
    set request.jwt.claim.sub='';
    set request.jwt.claim.role='';
    set request.jwt.claim.email='';
    set request.jwt.claims='';
    set role anon;
end;
$$;

create or replace function test_helpers.logout () returns void
    language plpgsql
    as $$
begin
    set request.jwt.claim.sub='';
    set request.jwt.claim.role='';
    set request.jwt.claim.email='';
    set request.jwt.claims='';
    set role postgres;
end;
$$;
-----------------------------------------------------
create or replace function test_helpers.setup_test_tenant (
  _tenant_name citext
  ,_identifier citext
  ,_admin_email citext
  ,_license_pack_key citext
) returns app.tenant
    language plpgsql
    as $$
  declare
    _tenant app.tenant;
    _resident app.resident;
    _tenant_subcription app.tenant_subscription;
  begin
  _tenant := (select app_fn.create_tenant(
    _name => _tenant_name
    ,_identifier => _identifier
    ,_email => _admin_email
  ));
  _tenant_subcription := (select app_fn.subscribe_tenant_to_license_pack(
    _tenant_id => _tenant.id
    ,_license_pack_key => _license_pack_key
  ));
  ------------------------------------------------------------------------
  ------------------------------------------------------------------------ create_supabase_user
  perform test_helpers.create_supabase_user(
    _email => _admin_email
    ,_phone => '555.555.5555'
    ,_user_metadata => '{"test": "meta"}'::jsonb
    ,_password => 'badpassword'
  );
  ------------------------------------------------------------------------
  ------------------------------------------------------------------------ assume_residency
  select * into _resident from app.resident where id = _tenant.id and email = _admin_email;
  perform app_fn.assume_residency(
    _resident_id => _resident.id
    ,_email => _admin_email
  );
  return _tenant;
end;
$$;


BEGIN;
-------------------------------------------------------------------------- structure tests
select * from no_plan();
-- SELECT plan(12);

-- -- create_supabase_user
-- SELECT has_function(
--     'test_helpers'
--     ,'create_supabase_user'
--     ,ARRAY ['text', 'text', 'jsonb']
-- );
-- SELECT function_lang_is(
--     'test_helpers'
--     ,'create_supabase_user'
--     ,ARRAY ['text', 'text', 'jsonb']
--     ,'plpgsql'
-- );
-- SELECT function_returns(
--     'test_helpers'
--     ,'create_supabase_user'
--     ,ARRAY ['text', 'text', 'jsonb']
--     ,'uuid'
-- );
-- create_supabase_user
SELECT has_function(
    'test_helpers'
    ,'create_supabase_user'
    ,ARRAY ['citext', 'citext', 'jsonb', 'text', 'citext', 'app.license_type_assignment_scope']
);
SELECT function_lang_is(
    'test_helpers'
    ,'create_supabase_user'
    ,ARRAY ['citext', 'citext', 'jsonb', 'text', 'citext', 'app.license_type_assignment_scope']
    ,'plpgsql'
);
SELECT function_returns(
    'test_helpers'
    ,'create_supabase_user'
    ,ARRAY ['citext', 'citext', 'jsonb', 'text', 'citext', 'app.license_type_assignment_scope']
    ,'uuid'
);
------------------------------------
-- login_as_user
SELECT has_function(
    'test_helpers'
    ,'login_as_user'
    ,ARRAY ['text']
);
SELECT function_lang_is(
    'test_helpers'
    ,'login_as_user'
    ,ARRAY ['text']
    ,'plpgsql'
);
SELECT function_returns(
    'test_helpers'
    ,'login_as_user'
    ,ARRAY ['text']
    ,'void'
);
------------------------------------
-- login_as_anon
SELECT has_function(
    'test_helpers'
    ,'login_as_anon'
    ,'function login_as_anon() should exist'
);
SELECT function_lang_is(
    'test_helpers'
    ,'login_as_anon'
    ,'plpgsql'
    ,'function login_as_anon() lang is plpsql'
);
SELECT function_returns(
    'test_helpers'
    ,'login_as_anon'
    ,'void'
    ,'function login_as_anon() lang returns void'
);
------------------------------------
-- logout
SELECT has_function(
    'test_helpers'
    ,'logout'
    ,'function logout() should exist'
);
SELECT function_lang_is(
    'test_helpers'
    ,'logout'
    ,'plpgsql'
    ,'function logout() lang is plpsql'
);
SELECT function_returns(
    'test_helpers'
    ,'logout'
    ,'void'
    ,'function logout() lang returns void'
);




-------------------------------------------------------------------------- logic tests

\set _superadmin_email 'bucket@function-bucket.net'
\set _email 'test-user@example.com'
\set _role 'authenticated'
------------------------------------
select isa_ok(
  test_helpers.create_supabase_user(
    _email => :'_email'::citext
    ,_phone => '555.555.5555'
    ,_user_metadata => '{"test": "meta"}'::jsonb
    ,_password => 'badpassword'::text
  )
  ,'uuid'
  ,'create_supabase_user should return uuid'
);
------------------------------------
select is(
  users.email
  ,:'_email'
  ,'create test user'
) from auth.users where email = :'_email';
------------------------------------
select test_helpers.login_as_anon();
select is(current_setting('role'), 'anon', 'role should be anon');
------------------------------------
select test_helpers.logout();
select is(current_setting('role'), 'postgres', 'role should be postgres');
------------------------------------
-- note: if you leave logged in as anon, this will fail
-- to directly access the users table without restriction, you have to be the postgres user
select test_helpers.login_as_user(
  _email => :'_email'::text
);
select is(current_setting('request.jwt.claim.email'), :'_email', 'user email should be correct');
select is(current_setting('request.jwt.claim.role'), :'_role', 'user role should be correct');
select isa_ok(auth.uid(), 'uuid', 'auth.uid() should be a uuid');
------------------------------------
select test_helpers.logout();
select is(current_setting('role'), 'postgres', 'role should be postgres');
------------------------------------
-- select isa_ok(
--   (select test_helpers.assume_super_admin(:'_superadmin_email'::citext))
--   , 'app.resident', 'should have superadmin resident'
-- );

select * from finish();
ROLLBACK;