--- wf_api policies
grant usage on schema wf_api to anon, authenticated, service_role;
grant all on all tables in schema wf_api to anon, authenticated, service_role;
grant all on all routines in schema wf_api to anon, authenticated, service_role;
grant all on all sequences in schema wf_api to anon, authenticated, service_role;
alter default privileges for role postgres in schema wf_api grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema wf_api grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema wf_api grant all on sequences to anon, authenticated, service_role;

--- wf_fn policies
grant usage on schema wf_fn to anon, authenticated, service_role;
grant all on all tables in schema wf_fn to anon, authenticated, service_role;
grant all on all routines in schema wf_fn to anon, authenticated, service_role;
grant all on all sequences in schema wf_fn to anon, authenticated, service_role;
alter default privileges for role postgres in schema wf_fn grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema wf_fn grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema wf_fn grant all on sequences to anon, authenticated, service_role;


--- wf policies
grant usage on schema wf to anon, authenticated, service_role;
grant all on all tables in schema wf to anon, authenticated, service_role;
grant all on all routines in schema wf to anon, authenticated, service_role;
grant all on all sequences in schema wf to anon, authenticated, service_role;
alter default privileges for role postgres in schema wf grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema wf grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema wf grant all on sequences to anon, authenticated, service_role;


------------------------------------------------------------------------ wf
-- alter table wf.wf enable row level security;
--     CREATE POLICY manage_all_for_tenant ON wf.wf
--       FOR ALL
--       USING (auth_ext.tenant_id()::uuid = tenant_id)
--       WITH CHECK (auth_ext.tenant_id()::uuid = tenant_id)
--       ;
