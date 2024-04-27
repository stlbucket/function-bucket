\x on
\pset pager off
-- -------------------------------  DEMO TENANT
    DO $$
    DECLARE
      _i integer;
      _j integer;
      _tenant_name citext;
      _tenant_identifier citext;
      _users jsonb;
      _user_info jsonb;
      _address jsonb;
      _tenant app.tenant;
    BEGIN
      -- for _i in 1..2 loop
        -- SETUP THE TENANT
        -- raise notice 'heyo: %', _i;
        _users := (to_json(http_get('https://random-data-api.com/api/v2/users?size=3&response_type=json'))->>'content')::jsonb;
        -- raise notice 'users: %', jsonb_pretty(_users);
        _user_info := _users->0;
        _tenant_name = _user_info->>'last_name'||' and Associates'::citext;

        -- raise notice 'tenatn: %', _tenant_name;

        -- _tenant_name = ('Demo Tenant '||(select count(*) from app.tenant))::citext;
        _tenant_identifier = ('demo-tenant-'||(select count(*) from app.tenant))::citext;

        -- _user_info := _users->0;
        _tenant := app_fn.create_tenant(
          _name => _tenant_name::citext
          ,_identifier => _tenant_identifier::citext
          ,_email => ('bucket+admin-'||(split_part(_user_info->>'email','@',1))||'@function-bucket.net')::citext
          , _type => 'demo'::app.tenant_type
        );

        -- ADDITIONAL USERS
        for _j in 1..2 loop
          _user_info := _users->_j;
          perform app_fn.invite_user(
            _tenant_id => _tenant.id::uuid
            ,_email => ('bucket+user-'||(split_part(_user_info->>'email','@',1))||'@function-bucket.net')::citext
            ,_assignment_scope => 'user'::app.license_type_assignment_scope
          );
        end loop;
      -- end loop;
    END $$;
