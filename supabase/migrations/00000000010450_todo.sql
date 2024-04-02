-----------------------------------------------
-- script  todo schema
-----------------------------------------------
create schema if not exists todo;
create schema if not exists todo_fn;
-----------------------------------------------
create type todo.todo_status as enum (
  'incomplete'
  ,'complete'
  ,'archived'
  ,'unfinished'
);
-----------------------------------------------
create type todo.todo_type as enum (
  'task'
  ,'milestone'
);
-----------------------------------------------
create type todo_fn.search_todos_options as (
  search_term citext
  ,todo_type todo.todo_type
  ,todo_status todo.todo_status
  ,roots_only boolean
  ,is_template boolean
  ,paging_options app_fn.paging_options
);
------------------------------------------------------------------------ todo_tenant
create table todo.todo_tenant (
  tenant_id uuid not null references app.tenant(id) primary key
  ,name citext not null
);
------------------------------------------------------------------------ todo_resident
create table todo.todo_resident (
  resident_id uuid not null references app.resident(id) primary key
  ,tenant_id uuid not null references todo.todo_tenant(tenant_id)
  ,display_name citext not null
);
------------------------------------------------------------------------ todo
create table if not exists todo.todo (
  id uuid NOT NULL DEFAULT gen_random_uuid() primary key
  ,parent_todo_id uuid null references todo.todo(id)
  ,root_todo_id uuid not null references todo.todo(id)
  ,tenant_id uuid not null references todo.todo_tenant(tenant_id)
  ,resident_id uuid null references todo.todo_resident(resident_id)
  ,location_id uuid null references loc.location(id)
  ,topic_id uuid not null references msg.topic(id)
  ,created_at timestamptz not null default current_timestamp
  ,updated_at timestamptz not null default current_timestamp
  ,name citext not null
  ,description citext
  ,status todo.todo_status not null default 'incomplete'
  ,check(char_length(name) >= 3)
  ,type todo.todo_type not null default 'task'
  ,ordinal integer not null
  ,pinned boolean not null default false
  ,tags citext[] not null default '{}'::citext[]
  ,is_template boolean not null default false
);
-----------------------------------------------
 create index idx_todo_todo_tenant_id on todo.todo(tenant_id);
 create index idx_todo_todo_resident_id on todo.todo(resident_id);
 create index idx_todo_todo_parent_todo_id on todo.todo(parent_todo_id);
 create index idx_todo_todo_root_todo_id on todo.todo(root_todo_id);
