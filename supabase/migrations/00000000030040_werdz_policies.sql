--- werdz_fn_api policies
grant usage on schema werdz_fn_api to anon, authenticated, service_role;
grant all on all tables in schema werdz_fn_api to anon, authenticated, service_role;
grant all on all routines in schema werdz_fn_api to anon, authenticated, service_role;
grant all on all sequences in schema werdz_fn_api to anon, authenticated, service_role;
alter default privileges for role postgres in schema werdz_fn_api grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema werdz_fn_api grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema werdz_fn_api grant all on sequences to anon, authenticated, service_role;

--- werdz_fn policies
grant usage on schema werdz_fn to anon, authenticated, service_role;
grant all on all tables in schema werdz_fn to anon, authenticated, service_role;
grant all on all routines in schema werdz_fn to anon, authenticated, service_role;
grant all on all sequences in schema werdz_fn to anon, authenticated, service_role;
alter default privileges for role postgres in schema werdz_fn grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema werdz_fn grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema werdz_fn grant all on sequences to anon, authenticated, service_role;


--- werdz policies
grant usage on schema werdz to anon, authenticated, service_role;
grant all on all tables in schema werdz to anon, authenticated, service_role;
grant all on all routines in schema werdz to anon, authenticated, service_role;
grant all on all sequences in schema werdz to anon, authenticated, service_role;
alter default privileges for role postgres in schema werdz grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema werdz grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema werdz grant all on sequences to anon, authenticated, service_role;


-- ------------------------------------------------------------------------ werdz
-- alter table werdz.werdz_resident enable row level security;
--     CREATE POLICY view_all_for_tenant ON werdz.werdz_tenant
--       FOR SELECT
--       USING (auth_ext.tenant_id() = tenant_id)
--       ;
--     CREATE POLICY create_for_tenant ON werdz.werdz_tenant
--       FOR INSERT
--       WITH CHECK (auth_ext.tenant_id() = tenant_id)
--       ;

-- ------------------------------------------------------------------------ werdz
-- alter table werdz.werdz_resident enable row level security;
--     CREATE POLICY view_all_for_tenant ON werdz.werdz_resident
--       FOR SELECT
--       USING (auth_ext.has_permission('p:werdz-user', tenant_id))
--       ;
--     CREATE POLICY create_for_tenant ON werdz.werdz_resident
--       FOR INSERT
--       WITH CHECK (auth_ext.has_permission('p:werdz-user', tenant_id))
--       ;
------------------------------------------------------------------------ werdz
-- alter table werdz.wb_game enable row level security;
--     CREATE POLICY manage_all_for_tenant ON werdz.wb_game
--       FOR ALL
--       USING (auth_ext.tenant_id()::uuid = tenant_id)
--       WITH CHECK (auth_ext.tenant_id()::uuid = tenant_id)
--       ;

-- alter table werdz.werdz_resident disable row level security;
-- alter table werdz.werdz_resident disable row level security;
