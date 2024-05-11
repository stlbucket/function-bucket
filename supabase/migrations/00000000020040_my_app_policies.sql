--- my_app_api policies
grant usage on schema my_app_api to anon, authenticated, service_role;
grant all on all tables in schema my_app_api to anon, authenticated, service_role;
grant all on all routines in schema my_app_api to anon, authenticated, service_role;
grant all on all sequences in schema my_app_api to anon, authenticated, service_role;
alter default privileges for role postgres in schema my_app_api grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema my_app_api grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema my_app_api grant all on sequences to anon, authenticated, service_role;

--- my_app_fn policies
grant usage on schema my_app_fn to anon, authenticated, service_role;
grant all on all tables in schema my_app_fn to anon, authenticated, service_role;
grant all on all routines in schema my_app_fn to anon, authenticated, service_role;
grant all on all sequences in schema my_app_fn to anon, authenticated, service_role;
alter default privileges for role postgres in schema my_app_fn grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema my_app_fn grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema my_app_fn grant all on sequences to anon, authenticated, service_role;


--- my_app policies
grant usage on schema my_app to anon, authenticated, service_role;
grant all on all tables in schema my_app to anon, authenticated, service_role;
grant all on all routines in schema my_app to anon, authenticated, service_role;
grant all on all sequences in schema my_app to anon, authenticated, service_role;
alter default privileges for role postgres in schema my_app grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema my_app grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema my_app grant all on sequences to anon, authenticated, service_role;


------------------------------------------------------------------------ my_app
-- alter table my_app.band enable row level security;
--     CREATE POLICY manage_all_for_tenant ON my_app.band
--       FOR ALL
--       USING (auth_ext.tenant_id()::uuid = tenant_id)
--       WITH CHECK (auth_ext.tenant_id()::uuid = tenant_id)
--       ;
