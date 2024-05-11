-- create the schema and table structure for my_app
begin;
drop schema if exists my_app cascade;                         -- this is the primary schema for my_app data
-- drop schema if exists my_app_private cascade;              -- an easy way to keep selected data private
drop schema if exists my_app_fn cascade;                      -- business logic functions for my_app.  no request context.
drop schema if exists my_app_api cascade;                  -- exposed thru graphql. enforce permissions and request context.
-----------------------------------------------
-- script  my_app schema
-----------------------------------------------
create schema if not exists my_app;
-- create schema if not exists my_app_private;
create schema if not exists my_app_fn;
create schema if not exists my_app_api;

------------------------------------------------------------------------ thing_status
create type my_app.thing_status as enum (
  'active'
  ,'inactive'
);
-----------------------------------------------
create table if not exists my_app.thing(
  id uuid not null default gen_random_uuid() primary key
  ,tenant_id uuid not null references app.tenant(id)
  ,name citext NOT NULL
  ,status my_app.thing_status
);

commit;