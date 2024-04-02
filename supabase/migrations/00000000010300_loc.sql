create schema loc;
create schema if not exists loc_api;
create schema if not exists loc_fn;

create type loc_fn.location_info as (
  id uuid,
  name text,
  address1 text,
  address2 text,
  city text,
  state text,
  postal_code text,
  country text,
  lat text,
  lon text
);

create type loc_fn.search_locations_options as (
  search_term citext
  ,paging_options app_fn.paging_options
);

create table loc.loc_tenant (
  tenant_id uuid not null references app.tenant(id) primary key
  ,name citext not null
);

create table loc.loc_resident (
  resident_id uuid not null references app.resident(id) primary key
  ,tenant_id uuid not null references loc.loc_tenant(tenant_id)
  ,display_name citext not null
);

create table loc.location (
  id uuid NOT NULL DEFAULT gen_random_uuid() primary key,
  tenant_id uuid not null references loc.loc_tenant(tenant_id),
  resident_id uuid not null references loc.loc_resident(resident_id),
  name text,
  address1 text,
  address2 text,
  city text,
  state text,
  postal_code text,
  country text,
  -- latlon geography (POINT),
  lat text,
  lon text
);

-- create index idx_location_latlon
--   on loc.location
--   using GIST (latlon);
