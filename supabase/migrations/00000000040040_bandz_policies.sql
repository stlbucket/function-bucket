--- bandz_fn_api policies
grant usage on schema bandz_fn_api to anon, authenticated, service_role;
grant all on all tables in schema bandz_fn_api to anon, authenticated, service_role;
grant all on all routines in schema bandz_fn_api to anon, authenticated, service_role;
grant all on all sequences in schema bandz_fn_api to anon, authenticated, service_role;
alter default privileges for role postgres in schema bandz_fn_api grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema bandz_fn_api grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema bandz_fn_api grant all on sequences to anon, authenticated, service_role;

--- bandz_fn policies
grant usage on schema bandz_fn to anon, authenticated, service_role;
grant all on all tables in schema bandz_fn to anon, authenticated, service_role;
grant all on all routines in schema bandz_fn to anon, authenticated, service_role;
grant all on all sequences in schema bandz_fn to anon, authenticated, service_role;
alter default privileges for role postgres in schema bandz_fn grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema bandz_fn grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema bandz_fn grant all on sequences to anon, authenticated, service_role;


--- bandz policies
grant usage on schema bandz to anon, authenticated, service_role;
grant all on all tables in schema bandz to anon, authenticated, service_role;
grant all on all routines in schema bandz to anon, authenticated, service_role;
grant all on all sequences in schema bandz to anon, authenticated, service_role;
alter default privileges for role postgres in schema bandz grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema bandz grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema bandz grant all on sequences to anon, authenticated, service_role;


------------------------------------------------------------------------ bandz
-- alter table bandz.band enable row level security;
--     CREATE POLICY manage_all_for_tenant ON bandz.band
--       FOR ALL
--       USING (auth_ext.tenant_id()::uuid = tenant_id)
--       WITH CHECK (auth_ext.tenant_id()::uuid = tenant_id)
--       ;
