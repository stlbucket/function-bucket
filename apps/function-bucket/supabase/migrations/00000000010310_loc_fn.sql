----------------------------------- handle_update_profile ---  NO API
create or replace function loc_fn.handle_update_profile()
  returns trigger
  language plpgsql
  security definer
  as $$
  DECLARE
    _claims jsonb;
  begin
    update loc.loc_resident set
      display_name = new.display_name
    where resident_id in (
      select id from app.resident where profile_id = new.id
    );

    return new;
  end;
  $$;
  -- trigger the function every time a user is created
create or replace trigger loc_on_app_profile_updated
  after update on app.profile
  for each row execute procedure loc_fn.handle_update_profile();
-------------------------------------- ensure_loc_resident
CREATE OR REPLACE FUNCTION loc_fn.ensure_loc_resident(
    _resident_id uuid
  ) RETURNS loc.loc_resident
    LANGUAGE plpgsql VOLATILE SECURITY DEFINER
    AS $$
  DECLARE
    _loc_tenant loc.loc_tenant;
    _loc_resident loc.loc_resident;
  BEGIN
    -- ensure that the resident has a loc_resident and loc_tenant.  add them if not.
    select t.* 
    into _loc_tenant 
    from loc.loc_tenant t 
    join app.resident aut on t.tenant_id = aut.tenant_id and aut.id = _resident_id
    ;

    if _loc_tenant.tenant_id is null then
      insert into loc.loc_tenant(tenant_id, name)
        select tenant_id, tenant_name
        from app.resident 
        where id = _resident_id
      returning * into _loc_tenant;
    end if;

    select * into _loc_resident from loc.loc_resident where resident_id = _resident_id;
    if _loc_resident.resident_id is null then
      insert into loc.loc_resident(resident_id, display_name, tenant_id)
        select id, display_name, tenant_id
        from app.resident 
        where id = _resident_id 
      returning * into _loc_resident;
    end if;
    return _loc_resident;
  end;
  $$;
---------------------------------------------- create_location
CREATE OR REPLACE FUNCTION loc_api.create_location(
    _location_info loc_fn.location_info
  )
  RETURNS loc.location
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _retval loc.location;
  BEGIN
    _retval := loc_fn.create_location(
      _location_info
      ,auth_ext.resident_id()
    );
    return _retval;
  end;
  $$;

CREATE OR REPLACE FUNCTION loc_fn.create_location(
    _location_info loc_fn.location_info
    ,_resident_id uuid
  )
  RETURNS loc.location
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _loc_resident loc.loc_resident;
    _retval loc.location;
  BEGIN
    _loc_resident := loc_fn.ensure_loc_resident(_resident_id);

    insert into loc.location(
      tenant_id,
      resident_id,
      name,
      address1,
      address2,
      city,
      state,
      postal_code,
      country,
      -- latlon,
      lat,
      lon
    ) values (
      _loc_resident.tenant_id,
      _resident_id,
      _location_info.name,
      _location_info.address1,
      _location_info.address2,
      _location_info.city,
      _location_info.state,
      _location_info.postal_code,
      _location_info.country,
      -- st_point(coalesce(_location_info.lat::double precision,0::double precision)::double precision, coalesce(_location_info.lon::double precision, 0::double precision)::double precision),
      _location_info.lat,
      _location_info.lon
    )
    returning * into _retval
    ;

    return _retval;
  end;
  $$;
---------------------------------------------- delete_location
CREATE OR REPLACE FUNCTION loc_api.delete_location(_location_id uuid)
  RETURNS boolean
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _retval boolean;
  BEGIN
    _retval := loc_fn.delete_location(_location_id);
    return _retval;
  end;
  $$;

CREATE OR REPLACE FUNCTION loc_fn.delete_location(_location_id uuid)
  RETURNS boolean
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
  BEGIN
    delete from loc.location where id = _location_id;
    return true;
  end;
  $$;
---------------------------------------------- update_location
CREATE OR REPLACE FUNCTION loc_api.update_location(
    _location_info loc_fn.location_info
  )
  RETURNS loc.location
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _retval loc.location;
  BEGIN
    _retval := loc_fn.update_location(
      _location_info
    );
    return _retval;
  end;
  $$;

CREATE OR REPLACE FUNCTION loc_fn.update_location(
    _location_info loc_fn.location_info
  )
  RETURNS loc.location
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _loc_resident loc.loc_resident;
    _retval loc.location;
  BEGIN
    if _location_info.id is null then
      raise exception '30041: LOCATION ID REQUIRED FOR UPDATE';
    end if;

    update loc.location set
      name = _location_info.name,
      address1 = _location_info.address1,
      address2 = _location_info.address2,
      city = _location_info.city,
      state = _location_info.state,
      postal_code = _location_info.postal_code,
      country = _location_info.country,
      lat = _location_info.lat,
      lon = _location_info.lon
    where id = _location_info.id
    returning * into _retval
    ;

    return _retval;
  end;
  $$;
