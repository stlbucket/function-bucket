begin;
drop schema if exists bandz cascade;
drop schema if exists bandz_fn cascade;
drop schema if exists bandz_fn_api cascade;
-----------------------------------------------
-- script  bandz schema
-----------------------------------------------
create schema if not exists bandz;
create schema if not exists bandz_fn;
create schema if not exists bandz_fn_api;

------------------------------------------------------------------------ band_status
create type bandz.band_status as enum (
  'active'
  ,'inactive'
);
-----------------------------------------------
create table if not exists bandz.band(
  id uuid not null default gen_random_uuid() primary key
  ,tenant_id uuid not null references app.tenant(id)
  ,name citext NOT NULL
  ,status bandz.band_status
);

commit;