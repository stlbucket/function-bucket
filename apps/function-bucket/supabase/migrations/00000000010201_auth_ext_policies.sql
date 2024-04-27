--- auth_ext policies
grant usage on schema auth_ext to anon, authenticated, service_role;
grant all on all tables in schema auth_ext to anon, authenticated, service_role;
grant all on all routines in schema auth_ext to anon, authenticated, service_role;
grant all on all sequences in schema auth_ext to anon, authenticated, service_role;
alter default privileges for role postgres in schema auth_ext grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema auth_ext grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema auth_ext grant all on sequences to anon, authenticated, service_role;
