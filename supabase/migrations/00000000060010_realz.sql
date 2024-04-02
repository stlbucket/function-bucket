begin;
drop schema if exists realz cascade;
drop schema if exists realz_fn cascade;
drop schema if exists realz_fn_api cascade;
-----------------------------------------------
-- script  realz schema
-----------------------------------------------
create schema if not exists realz;
create schema if not exists realz_fn;
create schema if not exists realz_fn_api;

------------------------------------------------------------------------ real_status
create type realz.real_status as enum (
  'active'
  ,'inactive'
);
-----------------------------------------------
create table if not exists realz.real(
  id uuid not null default gen_random_uuid() primary key
  ,tenant_id uuid not null references app.tenant(id)
  ,name citext NOT NULL
  ,status realz.real_status
);

commit;