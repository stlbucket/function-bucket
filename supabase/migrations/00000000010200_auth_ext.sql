----------------------------------------------------------------------------------------------
-- this schema provides helpers, primarily to access jwt->user_metadata->A-VALUE
----------------------------------------------------------------------------------------------
create schema if not exists auth_ext;
----------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION auth_ext.enforce_permission(_permission_key citext, _tenant_id uuid default null)
  RETURNS boolean
  LANGUAGE plpgsql
  STABLE
  SECURITY INVOKER
  AS $function$
  DECLARE
    _has_permission boolean;
  BEGIN
    _has_permission := auth_ext.has_permission(_permission_key, _tenant_id);
    
    if _has_permission = false then raise exception '30000: NOT AUTHORIZED'; end if;

    return _has_permission;
  end;
  $function$
  ;
----------------------------------- auth_ext
CREATE OR REPLACE FUNCTION auth_ext.has_permission(_permission_key citext, _tenant_id uuid default null)
  RETURNS boolean
  LANGUAGE plpgsql
  STABLE
  SECURITY INVOKER
  AS $function$
  DECLARE
    _retval boolean;
    _permissions citext[];
  BEGIN
    _retval := (
      SELECT _permission_key = any(auth_ext.permissions())
    );
    if _tenant_id is not null then
      _retval := (select _retval and auth_ext.tenant_id() = _tenant_id);
    end if;
    return _retval;
  end;
  $function$
  ;
----------------------------------------------------------------------------------------------
-- CREATE OR REPLACE FUNCTION auth_ext.has_all_permissions(_permission_keys citext[], _tenant_id uuid default null)
--   RETURNS boolean
--   LANGUAGE plpgsql
--   STABLE
--   SECURITY INVOKER
--   AS $function$
--   DECLARE
--     _retval boolean;
--     _permissions citext[];
--   BEGIN
--     _permissions := auth_ext.permissions();
--     _retval := (
--       SELECT 
--       EXISTS (    
--         SELECT 1 FROM unnest(_permissions) AS perm  
--         WHERE perm LIKE _permission_key||'%'
--       ) 
--     );
--     if _tenant_id is not null then
--       -- _retval := (select _retval and ((auth.jwt()->'user_metadata')->>'tenant_id')::uuid = _tenant_id);
--       _retval := (select _retval and auth_ext.tenant_id() = _tenant_id);
--     end if;

--     _retval = true;
--     return _retval;
--   end;
--   $function$
--   ;
----------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION auth_ext.permissions()
  RETURNS citext[]
  LANGUAGE plpgsql
  STABLE
  SECURITY INVOKER
  AS $function$
  DECLARE
    _user_metadata jsonb;
    _permissions_text text;
    _permissions citext[];
  BEGIN
    _user_metadata = auth.jwt()->'user_metadata';
    _permissions_text = _user_metadata->>'permissions';

    if _permissions_text is null then
      _permissions = '{}'::citext[];
    else
      _permissions := array(select jsonb_array_elements_text((_user_metadata->'permissions')))::citext[];
    end if;

    return _permissions;
  end;
  $function$
  ;
----------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION auth_ext.tenant_id()
  RETURNS uuid
  LANGUAGE plpgsql
  STABLE
  SECURITY INVOKER
  AS $function$
  DECLARE
    _tenant_id uuid;
  BEGIN
    _tenant_id := ((auth.jwt()->'user_metadata')->>'tenant_id')::uuid;
    return _tenant_id;
  end;
  $function$
  ;
----------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION auth_ext.resident_id()
  RETURNS uuid
  LANGUAGE plpgsql
  STABLE
  SECURITY INVOKER
  AS $function$
  DECLARE
    _resident_id uuid;
  BEGIN
    _resident_id := ((auth.jwt()->'user_metadata')->>'resident_id')::uuid;
    return _resident_id;
  end;
  $function$
  ;
----------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION auth_ext.profile_id()
  RETURNS uuid
  LANGUAGE plpgsql
  STABLE
  SECURITY INVOKER
  AS $function$
  DECLARE
    _profile_id uuid;
  BEGIN
    _profile_id := ((auth.jwt()->'user_metadata')->>'profile_id')::uuid;
    return _profile_id;
  end;
  $function$
  ;
----------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION auth_ext.actual_resident_id()
  RETURNS uuid
  LANGUAGE plpgsql
  STABLE
  SECURITY INVOKER
  AS $function$
  DECLARE
    _resident_id uuid;
  BEGIN
    _resident_id := ((auth.jwt()->'user_metadata')->>'actual_resident_id')::uuid;
    return _resident_id;
  end;
  $function$
  ;
----------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION auth_ext.email()
  RETURNS citext
  LANGUAGE plpgsql
  STABLE
  SECURITY INVOKER
  AS $function$
  DECLARE
    _email citext;
  BEGIN
    _email := (auth.jwt()->>'email')::citext;
    return _email;
  end;
  $function$
  ;
----------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION auth_ext.display_name()
  RETURNS citext
  LANGUAGE plpgsql
  STABLE
  SECURITY INVOKER
  AS $function$
  DECLARE
    _display_name citext;
  BEGIN
    _display_name := (auth.jwt()->>'display_name')::citext;
    return _display_name;
  end;
  $function$
  ;
