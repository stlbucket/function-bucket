----------------------------------------------------------------- become_support
CREATE OR REPLACE FUNCTION app_api.become_support(_tenant_id uuid)
  RETURNS app.resident
  LANGUAGE plpgsql
  VOLATILE
  SECURITY DEFINER
  AS $$
  DECLARE
    _resident app.resident;
  BEGIN
    if 
      auth_ext.has_permission('p:app-admin-super') = false 
      and
      auth_ext.has_permission('p:app-admin-support') = false 
    then
      raise exception '30000: PERMISSION DENIED';
    end if;

    _resident := (select app_fn.become_support(_tenant_id, auth.uid()));
    return _resident;
  end;
  $$;  

CREATE OR REPLACE FUNCTION app_fn.become_support(_tenant_id uuid, _profile_id uuid)
  RETURNS app.resident
  LANGUAGE plpgsql
  VOLATILE
  SECURITY DEFINER
  AS $$
  DECLARE
    _tenant app.tenant;
    _resident app.resident;
    _actual_resident app.resident;
    _support_email citext;
    _support_display_name citext;
  BEGIN
      select * into _tenant from app.tenant where id = _tenant_id;

      update app.resident set status = 'supporting' 
      where profile_id = _profile_id and status = 'active'
      returning * into _actual_resident;

      select coalesce(value, 'support@example.com') into _support_email from app.app_settings where key = 'support-email' and application_key = 'base';
      select coalesce(value, 'Site Support') into _support_display_name from app.app_settings where key = 'support-display-name' and application_key = 'base';

      insert into app.resident(
        tenant_id
        ,profile_id
        ,tenant_name
        ,email
        ,display_name
        ,status
        ,type
      ) values (
        _tenant.id
        ,_profile_id
        ,_tenant.name
        ,_support_email
        ,_support_display_name
        ,'active'
        ,'support'::app.resident_type
      )
      on conflict(tenant_id, profile_id, type) do update
        set status = 'active'
      returning * into _resident
      ;

      insert into app.license(
        tenant_id
        ,resident_id
        ,tenant_subscription_id
        ,license_type_key
      )
      values (
        _resident.tenant_id
        ,_resident.id
        ,(select id from app.tenant_subscription where tenant_id = _resident.tenant_id limit 1)
        ,'app-admin-support'
      )
      on conflict (resident_id, license_type_key) DO NOTHING
      -- on conflict (resident_id, license_type_key) DO UPDATE SET updated_at = current_timestamp
      ;

      insert into app.license(
        tenant_id
        ,resident_id
        ,tenant_subscription_id
        ,license_type_key
      )
      select
        _resident.tenant_id
        ,_resident.id
        ,ats.id
        ,lplt.license_type_key
      from app.tenant_subscription ats
      join app.license_pack lp on lp.key = ats.license_pack_key
      join app.license_pack_license_type lplt on lplt.license_pack_key = lp.key
      join app.license_type lt on lt.key = lplt.license_type_key
      where ats.tenant_id = _resident.tenant_id
      and lt.assignment_scope in ('admin', 'all', 'none') -- this is a super special rule only for support users
      and not exists (
        select id from app.license
        where resident_id = _resident.id
        and license_type_key = lplt.license_type_key
      )
      on conflict (resident_id, license_type_key) DO NOTHING
      ;

      -- perform app_fn.configure_user_metadata(_resident.profile_id);

    return _resident;
  end;
  $$;  
----------------------------------------------------------------- exit_support_mode
CREATE OR REPLACE FUNCTION app_api.exit_support_mode()
  RETURNS app.resident
  LANGUAGE plpgsql
  VOLATILE
  SECURITY DEFINER
  AS $$
  DECLARE
    _resident app.resident;
  BEGIN
    if auth_ext.has_permission('p:app-admin-support') = false then
      raise exception '30000: PERMISSION DENIED';
    end if;
    -- raise exception 'auth_ext.resident_id(): %, auth_ext.actual_resident_id(): %', auth_ext.resident_id(), auth_ext.actual_resident_id();

    _resident := (select app_fn.exit_support_mode(auth_ext.resident_id(), auth_ext.actual_resident_id()));
    return _resident;
  end;
  $$;  

CREATE OR REPLACE FUNCTION app_fn.exit_support_mode(_support_resident_id uuid, _actual_resident uuid)
  RETURNS app.resident
  LANGUAGE plpgsql
  VOLATILE
  SECURITY DEFINER
  AS $$
  DECLARE
    _resident app.resident;
  BEGIN
    -- raise exception '_actual_resident: %', _active_resident_id;
    update app.resident set status = 'inactive' where id = _support_resident_id;
    _resident := (select app_fn.assume_residency(id::uuid, email::citext) from app.resident where id = _actual_resident);

    return _resident;
  end;
  $$;  
----------------------------------- deactivate_tenant
CREATE OR REPLACE FUNCTION app_api.deactivate_tenant(_tenant_id uuid)
  RETURNS app.tenant
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $function$
  DECLARE
    _tenant app.tenant;
  BEGIN
    if auth_ext.has_permission('p:app-admin-super') != true then raise exception '30000: NOT AUTHORIZED'; end if;

    _tenant := app_fn.deactivate_tenant(_tenant_id);
    return _tenant;
  end;
  $function$
  ;

CREATE OR REPLACE FUNCTION app_fn.deactivate_tenant(_tenant_id uuid)
  RETURNS app.tenant
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $function$
  DECLARE
    _tenant app.tenant;
    _active_resident_ids uuid[];
  BEGIN
    select array_agg(aut.id) into _active_resident_ids from app.resident aut where tenant_id = _tenant_id and status = 'active';

    update app.tenant set status = 'inactive' where id = _tenant_id;
    update app.resident set status = 'blocked_tenant' where tenant_id = _tenant_id and status in ('invited', 'active', 'inactive');

    -- perform app_fn.configure_user_metadata(aut.profile_id) from app.resident aut where id = any(_active_resident_ids);

    return _tenant;
  end;
  $function$
  ;

----------------------------------- activate_tenant
CREATE OR REPLACE FUNCTION app_api.activate_tenant(_tenant_id uuid)
  RETURNS app.tenant
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $function$
  DECLARE
    _tenant app.tenant;
  BEGIN
    if auth_ext.has_permission('p:app-admin-super') != true then raise exception '30000: NOT AUTHORIZED'; end if;

    _tenant := app_fn.activate_tenant(_tenant_id);
    return _tenant;
  end;
  $function$
  ;

CREATE OR REPLACE FUNCTION app_fn.activate_tenant(_tenant_id uuid)
  RETURNS app.tenant
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $function$
  DECLARE
    _tenant app.tenant;
  BEGIN
    update app.tenant set status = 'active' where id = _tenant_id;
    update app.resident 
      set status = 'inactive' 
    where tenant_id = _tenant_id 
    and status in ('blocked_tenant')
    and profile_id is not null
    ;

    update app.resident 
      set status = 'invited' 
    where tenant_id = _tenant_id 
    and status in ('blocked_tenant')
    and profile_id is null
    ;

    return _tenant;
  end;
  $function$
  ;
----------------------------------- deactivate_tenant_subscription
CREATE OR REPLACE FUNCTION app_api.deactivate_tenant_subscription(_tenant_subscription_id uuid)
  RETURNS app.tenant_subscription
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $function$
  DECLARE
    _tenant_subscription app.tenant_subscription;
  BEGIN
    if auth_ext.has_permission('p:app-admin-super') != true then 
      raise exception '30000: NOT AUTHORIZED'; 
    end if;

    _tenant_subscription := app_fn.deactivate_tenant_subscription(_tenant_subscription_id);
    return _tenant_subscription;
  end;
  $function$
  ;

CREATE OR REPLACE FUNCTION app_fn.deactivate_tenant_subscription(_tenant_subscription_id uuid)
  RETURNS app.tenant_subscription
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $function$
  DECLARE
    _tenant_subscription app.tenant_subscription;
   BEGIN
    update app.tenant_subscription set status = 'inactive' where id = _tenant_subscription_id returning * into _tenant_subscription;
    update app.license set status = 'inactive' where tenant_subscription_id = _tenant_subscription_id;

    -- perform app_fn.configure_user_metadata(profile_id) from app.resident aut where tenant_id = _tenant_subscription.tenant_id and status = 'active';

    return _tenant_subscription;
  end;
  $function$
  ;

----------------------------------- reactivate_tenant_subscription
CREATE OR REPLACE FUNCTION app_api.reactivate_tenant_subscription(_tenant_subscription_id uuid)
  RETURNS app.tenant_subscription
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $function$
  DECLARE
    _tenant_subscription app.tenant_subscription;
  BEGIN
    if auth_ext.has_permission('p:app-admin-super') != true then 
      raise exception '30000: NOT AUTHORIZED'; 
    end if;

    _tenant_subscription := app_fn.reactivate_tenant_subscription(_tenant_subscription_id);
    return _tenant_subscription;
  end;
  $function$
  ;

CREATE OR REPLACE FUNCTION app_fn.reactivate_tenant_subscription(_tenant_subscription_id uuid)
  RETURNS app.tenant_subscription
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $function$
  DECLARE
    _tenant_subscription app.tenant_subscription;
  BEGIN
    update app.tenant_subscription set status = 'active' where id = _tenant_subscription_id returning * into _tenant_subscription;
    update app.license set status = 'active' where tenant_subscription_id = _tenant_subscription_id and status = 'inactive';  -- ignore expired

    -- perform app_fn.configure_user_metadata(profile_id) from app.resident aut where tenant_id = _tenant_subscription.tenant_id and status = 'active';

    return _tenant_subscription;
  end;
  $function$
  ;
---------------------------------------------- search_residents
CREATE OR REPLACE FUNCTION app_api.search_residents(_options app_fn.search_residents_options)
    RETURNS setof app.resident
    LANGUAGE plpgsql
    stable
    SECURITY DEFINER
    AS $$
    DECLARE
    BEGIN
      if auth_ext.has_permission('p:app-admin-support') != true then 
        raise exception '30000: NOT AUTHORIZED'; 
      end if;

      return query select * from app_fn.search_residents(_options);
    end;
    $$;

CREATE OR REPLACE FUNCTION app_fn.search_residents(_options app_fn.search_residents_options)
    RETURNS setof app.resident
    LANGUAGE plpgsql
    stable
    SECURITY DEFINER
    AS $$
    DECLARE
      _use_options app_fn.search_residents_options;
    BEGIN
      -- resident: add paging options

      return query
      select r.* 
      from app.resident r
      join app.tenant a on a.id = r.tenant_id
      where (
        _options.search_term is null 
        or r.email like '%'||_options.search_term||'%'
        or r.tenant_name like '%'||_options.search_term||'%'
        or r.display_name like '%'||_options.search_term||'%'
      )
      and (_options.status is null or r.status = _options.status)
      and r.type != 'support'
      and a.type != 'anchor'
      ;
    end;
    $$;
---------------------------------------------- search_profiles
CREATE OR REPLACE FUNCTION app_api.search_profiles(_options app_fn.search_profiles_options)
    RETURNS setof app.profile
    LANGUAGE plpgsql
    stable
    SECURITY DEFINER
    AS $$
    DECLARE
    BEGIN
      if auth_ext.has_permission('p:app-admin-support') != true then 
        raise exception '30000: NOT AUTHORIZED'; 
      end if;

      return query select * from app_fn.search_profiles(_options);
    end;
    $$;

CREATE OR REPLACE FUNCTION app_fn.search_profiles(_options app_fn.search_profiles_options)
    RETURNS setof app.profile
    LANGUAGE plpgsql
    stable
    SECURITY DEFINER
    AS $$
    DECLARE
      _use_options app_fn.search_profiles_options;
    BEGIN
      -- profile: add paging options

      return query
      select p.* 
      from app.profile p
      where (
        _options.search_term is null 
        or p.email like '%'||_options.search_term||'%'
        or p.display_name like '%'||_options.search_term||'%'
      )
      ;
    end;
    $$;

---------------------------------------------- search_tenants
CREATE OR REPLACE FUNCTION app_api.search_tenants(_options app_fn.search_tenants_options)
    RETURNS setof app.tenant
    LANGUAGE plpgsql
    stable
    SECURITY DEFINER
    AS $$
    DECLARE
    BEGIN
      if auth_ext.has_permission('p:app-admin-support') != true then 
        raise exception '30000: NOT AUTHORIZED'; 
      end if;

      return query select * from app_fn.search_tenants(_options);
    end;
    $$;

CREATE OR REPLACE FUNCTION app_fn.search_tenants(_options app_fn.search_tenants_options)
    RETURNS setof app.tenant
    LANGUAGE plpgsql
    stable
    SECURITY DEFINER
    AS $$
    DECLARE
      _use_options app_fn.search_tenants_options;
    BEGIN
      -- profile: add paging options

      return query
      select t.* 
      from app.tenant t
      where (
        _options.search_term is null 
        or t.name like '%'||_options.search_term||'%'
        or t.identifier like '%'||_options.search_term||'%'
      )
      and (_options.status is null or t.status = _options.status)
      and (_options.type is null or t.type = _options.type)
      and type != 'anchor'
      ;
    end;
    $$;


-- ---------------------------------------------- search_site_users
-- CREATE OR REPLACE FUNCTION app_api.search_site_users(_options app_fn.search_site_users_options)
--     RETURNS setof app.tenant
--     LANGUAGE plpgsql
--     stable
--     SECURITY DEFINER
--     AS $$
--     DECLARE
--     BEGIN
--       if auth_ext.has_permission('p:app-admin-support') != true then 
--         raise exception '30000: NOT AUTHORIZED'; 
--       end if;

--       return query select * from app_fn.search_site_users(_options);
--     end;
--     $$;

-- CREATE OR REPLACE FUNCTION app_fn.search_site_users(_options app_fn.search_site_users_options)
--     RETURNS setof app.tenant
--     LANGUAGE plpgsql
--     stable
--     SECURITY DEFINER
--     AS $$
--     DECLARE
--       _use_options app_fn.search_site_users_options;
--     BEGIN
--       -- profile: add paging options

--       return query
--       select t.* 
--       from app.tenant t
--       where (
--         _options.search_term is null 
--         or t.name like '%'||_options.search_term||'%'
--         or t.identifier like '%'||_options.search_term||'%'
--       )
--       and (_options.status is null or t.status = _options.status)
--       and (_options.type is null or t.type = _options.type)
--       and type != 'anchor'
--       ;
--     end;
--     $$;


---------------------------------------------- site_user_by_id
CREATE OR REPLACE FUNCTION app_api.site_user_by_id(_id uuid)
    RETURNS jsonb
    LANGUAGE plpgsql
    stable
    SECURITY DEFINER
    AS $$
    DECLARE
      _result jsonb;
    BEGIN
      if auth_ext.has_permission('p:app-admin-support') != true then 
        raise exception '30000: NOT AUTHORIZED'; 
      end if;

      _result := app_fn.site_user_by_id(_id);
      return _result;
    end;
    $$;

CREATE OR REPLACE FUNCTION app_fn.site_user_by_id(_id uuid)
    RETURNS jsonb
    LANGUAGE plpgsql
    stable
    SECURITY DEFINER
    AS $$
    DECLARE
      _result jsonb;
      _auth_user jsonb;
      _residency_info jsonb[];
      _resident app.resident;
      _license app.license;
    BEGIN
      select to_jsonb(u.*) into _auth_user from auth.users u where u.id = _id;

      _residency_info = '{}'::jsonb[];
      for _resident in
        select * from app.resident where profile_id = _id
      loop
        _residency_info := array_append(_residency_info, to_jsonb(_resident));
      end loop;

      _auth_user = _auth_user || jsonb_build_object('encrypted_password', 'HIDDEN');

      _result = jsonb_build_object(
        'authUser', _auth_user,
        'residencies', _residency_info
      );
      return _result;
    end;
    $$;


