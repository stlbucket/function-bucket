--- realz_fn_api policies
grant usage on schema realz_fn_api to anon, authenticated, service_role;
grant all on all tables in schema realz_fn_api to anon, authenticated, service_role;
grant all on all routines in schema realz_fn_api to anon, authenticated, service_role;
grant all on all sequences in schema realz_fn_api to anon, authenticated, service_role;
alter default privileges for role postgres in schema realz_fn_api grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema realz_fn_api grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema realz_fn_api grant all on sequences to anon, authenticated, service_role;

--- realz_fn policies
grant usage on schema realz_fn to anon, authenticated, service_role;
grant all on all tables in schema realz_fn to anon, authenticated, service_role;
grant all on all routines in schema realz_fn to anon, authenticated, service_role;
grant all on all sequences in schema realz_fn to anon, authenticated, service_role;
alter default privileges for role postgres in schema realz_fn grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema realz_fn grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema realz_fn grant all on sequences to anon, authenticated, service_role;


--- realz policies
grant usage on schema realz to anon, authenticated, service_role;
grant all on all tables in schema realz to anon, authenticated, service_role;
grant all on all routines in schema realz to anon, authenticated, service_role;
grant all on all sequences in schema realz to anon, authenticated, service_role;
alter default privileges for role postgres in schema realz grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema realz grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema realz grant all on sequences to anon, authenticated, service_role;


------------------------------------------------------------------------ realz
-- alter table realz.real enable row level security;
--     CREATE POLICY manage_all_for_tenant ON realz.real
--       FOR ALL
--       USING (auth_ext.tenant_id()::uuid = tenant_id)
--       WITH CHECK (auth_ext.tenant_id()::uuid = tenant_id)
--       ;
