-- this schema is used to help build databases in non-supabase containers
-- dbSchema tool cannot connect with the connection string provided by supabase local

create schema if not exists auth;

create table if not exists auth.users (
  id uuid not null primary key default gen_random_uuid()
  ,email text
);




CREATE OR REPLACE FUNCTION auth.uid()
  RETURNS uuid
  LANGUAGE plpgsql
  stable
  SECURITY INVOKER
  AS $$
  DECLARE
    _retval uuid;
  BEGIN
    _retval = gen_random_uuid();

    return _retval;
  end;
  $$;
