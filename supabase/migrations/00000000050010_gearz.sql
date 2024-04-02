begin;
drop schema if exists gearz cascade;
drop schema if exists gearz_fn cascade;
drop schema if exists gearz_fn_api cascade;
-----------------------------------------------
-- script  gearz schema
-----------------------------------------------
create schema if not exists gearz;
create schema if not exists gearz_fn;
create schema if not exists gearz_fn_api;

------------------------------------------------------------------------ gear_status
create type gearz.gear_status as enum (
  'active'
  ,'inactive'
);
-----------------------------------------------
create table if not exists gearz.gear(
  id uuid not null default gen_random_uuid() primary key
  ,tenant_id uuid not null references app.tenant(id)
  ,name citext NOT NULL
  ,status gearz.gear_status
);

commit;