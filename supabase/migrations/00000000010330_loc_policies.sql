--- loc_api policies
grant usage on schema loc_api to anon, authenticated, service_role;
grant all on all tables in schema loc_api to anon, authenticated, service_role;
grant all on all routines in schema loc_api to anon, authenticated, service_role;
grant all on all sequences in schema loc_api to anon, authenticated, service_role;
alter default privileges for role postgres in schema loc_api grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema loc_api grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema loc_api grant all on sequences to anon, authenticated, service_role;

--- loc_fn policies
grant usage on schema loc_fn to anon, authenticated, service_role;
grant all on all tables in schema loc_fn to anon, authenticated, service_role;
grant all on all routines in schema loc_fn to anon, authenticated, service_role;
grant all on all sequences in schema loc_fn to anon, authenticated, service_role;
alter default privileges for role postgres in schema loc_fn grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema loc_fn grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema loc_fn grant all on sequences to anon, authenticated, service_role;


--- loc policies
grant usage on schema loc to anon, authenticated, service_role;
grant all on all tables in schema loc to anon, authenticated, service_role;
grant all on all routines in schema loc to anon, authenticated, service_role;
grant all on all sequences in schema loc to anon, authenticated, service_role;
alter default privileges for role postgres in schema loc grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema loc grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema loc grant all on sequences to anon, authenticated, service_role;


------------------------------------------------------------------------ loc
alter table loc.location enable row level security;
    CREATE POLICY manage_all_for_tenant ON loc.location
      FOR ALL
      USING (auth_ext.tenant_id()::uuid = tenant_id)
      WITH CHECK (auth_ext.tenant_id()::uuid = tenant_id)
      ;
