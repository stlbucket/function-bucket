-----------------------------------------------
-- script  todo_fn schema
-----------------------------------------------

create schema if not exists todo_api;
create schema if not exists todo_fn;

create type todo_fn.create_todo_options as (
  description citext
  ,parent_todo_id uuid
  ,tags citext[]
  ,is_template boolean
  ,location loc_fn.location_info
);
