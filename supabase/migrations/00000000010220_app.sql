-----------------------------------------------
-- script  app schema
-----------------------------------------------
create schema if not exists app;
create schema if not exists app_fn;
----------------------------------------------------------------------------------------------
create type app.tenant_type as enum (
    'anchor'
    ,'customer'
    ,'demo'
    ,'test'
    ,'trial'
  );
----------------------------------------------------------------------------------------------
create type app.tenant_status as enum (
    'active'
    ,'inactive'
    ,'paused'
  );
----------------------------------------------------------------------------------------------
create type app.tenant_subscription_status as enum (
    'active'
    ,'inactive'
  );
----------------------------------------------------------------------------------------------
create type app.resident_type as enum (
  'home'  -- only one of these per user
  ,'guest'
  ,'support'
);
----------------------------------------------------------------------------------------------
create type app.profile_status as enum (
    'active'
    ,'inactive'
    ,'blocked'
  );
----------------------------------------------------------------------------------------------
create type app.resident_status as enum (
    'invited'
    ,'declined'
    ,'active'
    ,'inactive'
    ,'blocked_individual'
    ,'blocked_tenant'
    ,'supporting'
  );
--------------------------------------------------------------------------------------------
create type app.license_type_assignment_scope as enum (
  'user'
  ,'admin'
  ,'superadmin'
  ,'support'
  ,'none'
  ,'all'
);
--------------------------------------------------------------------------------------------
create type app.license_status as enum (
  'active'
  ,'inactive'
  ,'expired'
);
--------------------------------------------------------------------------------------------
create type app.expiration_interval_type as enum (
    'none'
    ,'day'
    ,'week'
    ,'month'
    ,'quarter'
    ,'year'
    ,'explicit'
);
--------------------------------------------------------------------------------------------
CREATE TABLE app.application (
  key citext PRIMARY KEY
  ,name citext not null
);
CREATE TABLE app.module (
  key citext primary key
  ,application_key citext not null references app.application(key)
  ,name citext not null
  ,permission_keys citext[] not null default '{}'::citext[]
  ,default_icon_key citext
);
CREATE TABLE app.tool (
  key citext primary key
  ,module_key citext not null references app.module(key)
  ,name citext not null
  ,permission_keys citext[] not null default '{}'::citext[]
  ,default_icon_key citext
  ,route citext not null
);
--------------------------------------------------------------------------------------------
CREATE TABLE app.app_settings (
  key citext PRIMARY KEY
  ,application_key citext not null references app.application(key)
  ,display_name citext not null
  ,value citext not null
);
--------------------------------------------------------------------------------------------
CREATE TABLE app.permission (
  key citext PRIMARY KEY
);
--------------------------------------------------------------------------------------------
CREATE TABLE app.license_type (
  key citext PRIMARY KEY
  ,created_at timestamptz not null default current_timestamp
  ,updated_at timestamptz not null default current_timestamp
  ,application_key citext not null references app.application(key)
  ,display_name citext not null
  ,assignment_scope app.license_type_assignment_scope not null
);
--------------------------------------------------------------------------------------------
CREATE TABLE app.license_pack (
  key citext PRIMARY KEY
  ,created_at timestamptz not null default current_timestamp
  ,updated_at timestamptz not null default current_timestamp
  ,display_name citext not null
  ,description citext not null
  ,auto_subscribe boolean not null default false
);
--------------------------------------------------------------------------------------------
CREATE TABLE app.license_pack_license_type (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY
  ,license_pack_key citext not null references app.license_pack(key)
  ,license_type_key citext not null references app.license_type(key)
  ,number_of_licenses integer not null default -1 -- (-1=unlimited, 0=tenant-license)
  ,expiration_interval_type app.expiration_interval_type not null default 'none'
  ,expiration_interval_multiplier integer not null default 1
  ,unique(license_pack_key, license_type_key)
);

--------------------------------------------------------------------------------------------
CREATE TABLE app.license_type_permission (
  license_type_key citext not null references app.license_type(key)
  ,permission_key citext not null references app.permission(key)
  ,unique(license_type_key, permission_key)
);
--------------------------------------------------------------------------------------------
create table if not exists app.tenant (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY
    ,created_at timestamptz not null default current_timestamp
    ,updated_at timestamptz not null default current_timestamp
    ,identifier citext unique
    ,name citext not null unique
    ,type app.tenant_type not null default 'customer'
    ,status app.tenant_status not null default 'active'
  );
--------------------------------------------------------------------------------------------
CREATE TABLE app.tenant_subscription (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY
  ,tenant_id uuid not null references app.tenant(id)
  ,license_pack_key citext not null references app.license_pack(key)
  ,created_at timestamptz not null default current_timestamp
  ,updated_at timestamptz not null default current_timestamp
  ,status app.tenant_subscription_status not null default 'active'
);
----------------------------------------------------------------------------------------------
create table if not exists app.profile (
    id uuid not null references auth.users on delete cascade primary key  -- this is for supabase
    ,created_at timestamptz not null default current_timestamp
    ,updated_at timestamptz not null default current_timestamp
    ,email citext not null unique
    ,identifier citext unique
    ,first_name citext null
    ,last_name citext null
    ,phone citext null
    ,display_name citext null unique
    ,avatar_key citext null
    ,status app.profile_status not null default 'active'
    ,is_public boolean not null default false
    ,full_name citext GENERATED ALWAYS AS (first_name||' '||last_name) STORED
  );
----------------------------------------------------------------------------------------------
create table if not exists app.resident (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY
    ,profile_id uuid null references app.profile(id)
    ,invited_by_profile_id uuid null references app.profile(id)
    ,invited_by_display_name citext
    ,tenant_id uuid not null references app.tenant(id)
    ,tenant_name citext not null
    ,email text not null
    ,display_name citext null
    ,created_at timestamptz not null default current_timestamp
    ,updated_at timestamptz not null default current_timestamp
    ,status app.resident_status not null default 'invited'
    ,type app.resident_type not null
  );
----------------------------------------------------------------------------------------------
CREATE TABLE app.license (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY
    ,tenant_id uuid not null references app.tenant(id)
    ,resident_id uuid not null references app.resident(id)
    ,profile_id uuid null references app.profile(id)
    ,tenant_subscription_id uuid not null references app.tenant_subscription(id)
    ,license_type_key citext not null references app.license_type(key)
    ,created_at timestamptz not null default current_timestamp
    ,updated_at timestamptz not null default current_timestamp
    ,expires_at timestamptz null
    ,status app.license_status NOT NULL default 'active'
  );
----------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION app.application_license_count(_application app.application)
  RETURNS integer
  LANGUAGE plpgsql
  STABLE
  SECURITY INVOKER
  AS $function$
  DECLARE
    _license_count integer;
  BEGIN
    _license_count := (
      select count(*)
      from app.license
      where license_type_key in (
        select key from app.license_type where application_key = _application.key
      )
    );
      
    return _license_count;
  end;
  $function$
  ;
----------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION app.license_pack_license_type_issued_count(_license_pack_license_type app.license_pack_license_type)
  RETURNS integer
  LANGUAGE plpgsql
  STABLE
  SECURITY INVOKER
  AS $function$
  DECLARE
    _license_count integer;
  BEGIN
    _license_count := (
      select count(*)
      from app.license_pack_license_type lplt
      join app.license_pack lp on lp.key = lplt.license_pack_key
      join app.tenant_subscription ats on ats.license_pack_key = lp.key
      join app.license l on l.tenant_subscription_id = ats.id
      where lplt.license_pack_key = _license_pack_license_type.license_pack_key
      and lplt.license_type_key = _license_pack_license_type.license_type_key
      and l.license_type_key = _license_pack_license_type.license_type_key
    );
      
    return _license_count;
  end;
  $function$
  ;

----------------------------------------------------------------------------------------------
--             CONSTRAINTS AND INDEXES

------------------------------------------------- license_type
create index idx_license_type_application on app.license_type(application_key);

------------------------------------------------- license_type
create index idx_lplt_license_pack on app.license_pack_license_type(license_pack_key);
create index idx_lplt_license_type on app.license_pack_license_type(license_type_key);

------------------------------------------------- license_type_permission
create index idx_ltp_license_type on app.license_type_permission(license_type_key);
create index idx_lplt_permission on app.license_type_permission(permission_key);

------------------------------------------------- license
create index idx_app_license_license_type_key on app.license(license_type_key);
alter table only app.license add constraint uqresident_license unique(resident_id, license_type_key);
create index idx_license_resident on app.license(resident_id);
create index idx_license_tenant on app.license(tenant_id);
create index idx_license_tenant_subscription on app.license(tenant_subscription_id);
------------------------------------------------- tenant_subscription
create index idx_ats_license_pack on app.tenant_subscription(license_pack_key);
create index idx_app_tenant_subscription_tenant_id on app.tenant_subscription(tenant_id);

------------------------------------------------- resident
create index idx_resident_profile on app.resident(profile_id);
create index idx_resident_tenant on app.resident(tenant_id);
create index idx_app_resident_invited_by_profile_id on app.resident(invited_by_profile_id);
alter table only app.resident add constraint uq_resident unique(tenant_id, profile_id, type);
create unique index idx_uq_resident on app.resident(profile_id) where status = 'active';
create unique index idx_uq_home_resident on app.resident(profile_id) where type = 'home';

----------------------------------------------------------------------------------------------

--------------  special anchor tenant restrictions
-- these two indexes ensure that only one license pack (anchor) can ever have super admin or support licenses
-- anchor license pack is created when the app is seeded by calling app_fn.install_anchor_application()
create unique index idx_uq_lplt_admin_super on app.license_pack_license_type(license_pack_key) where license_type_key = 'app-admin-super';
create unique index idx_uq_lplt_admin_support on app.license_pack_license_type(license_pack_key) where license_type_key = 'app-admin-support';
-- there can only ever be one subscriber to the anchor license pack, the anchor tenant
create unique index idx_uq_anchor_subscription on app.tenant_subscription(id) where license_pack_key = 'anchor';
--------------- indexes to enforce uniqueness of scoped license types in an application
create unique index idx_uq_app_license_type_scope_superadmin on app.license_type(key, application_key) where assignment_scope = 'superadmin';
create unique index idx_uq_app_license_type_scope_admin on app.license_type(key, application_key) where assignment_scope = 'admin';
create unique index idx_uq_app_license_type_scope_user on app.license_type(key, application_key) where assignment_scope = 'user';
create unique index idx_uq_app_license_type_scope_support on app.license_type(key, application_key) where assignment_scope = 'support';
