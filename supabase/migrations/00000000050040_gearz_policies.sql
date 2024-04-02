--- gearz_fn_api policies
grant usage on schema gearz_fn_api to anon, authenticated, service_role;
grant all on all tables in schema gearz_fn_api to anon, authenticated, service_role;
grant all on all routines in schema gearz_fn_api to anon, authenticated, service_role;
grant all on all sequences in schema gearz_fn_api to anon, authenticated, service_role;
alter default privileges for role postgres in schema gearz_fn_api grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema gearz_fn_api grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema gearz_fn_api grant all on sequences to anon, authenticated, service_role;

--- gearz_fn policies
grant usage on schema gearz_fn to anon, authenticated, service_role;
grant all on all tables in schema gearz_fn to anon, authenticated, service_role;
grant all on all routines in schema gearz_fn to anon, authenticated, service_role;
grant all on all sequences in schema gearz_fn to anon, authenticated, service_role;
alter default privileges for role postgres in schema gearz_fn grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema gearz_fn grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema gearz_fn grant all on sequences to anon, authenticated, service_role;


--- gearz policies
grant usage on schema gearz to anon, authenticated, service_role;
grant all on all tables in schema gearz to anon, authenticated, service_role;
grant all on all routines in schema gearz to anon, authenticated, service_role;
grant all on all sequences in schema gearz to anon, authenticated, service_role;
alter default privileges for role postgres in schema gearz grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema gearz grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema gearz grant all on sequences to anon, authenticated, service_role;


------------------------------------------------------------------------ gearz
-- alter table gearz.gear enable row level security;
--     CREATE POLICY manage_all_for_tenant ON gearz.gear
--       FOR ALL
--       USING (auth_ext.tenant_id()::uuid = tenant_id)
--       WITH CHECK (auth_ext.tenant_id()::uuid = tenant_id)
--       ;
