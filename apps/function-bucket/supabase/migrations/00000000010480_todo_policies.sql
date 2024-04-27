--- todo_api policies
grant usage on schema todo_api to anon, authenticated, service_role;
grant all on all tables in schema todo_api to anon, authenticated, service_role;
grant all on all routines in schema todo_api to anon, authenticated, service_role;
grant all on all sequences in schema todo_api to anon, authenticated, service_role;
alter default privileges for role postgres in schema todo_api grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema todo_api grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema todo_api grant all on sequences to anon, authenticated, service_role;

--- todo_fn policies
grant usage on schema todo_fn to anon, authenticated, service_role;
grant all on all tables in schema todo_fn to anon, authenticated, service_role;
grant all on all routines in schema todo_fn to anon, authenticated, service_role;
grant all on all sequences in schema todo_fn to anon, authenticated, service_role;
alter default privileges for role postgres in schema todo_fn grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema todo_fn grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema todo_fn grant all on sequences to anon, authenticated, service_role;


--- todo policies
grant usage on schema todo to anon, authenticated, service_role;
grant all on all tables in schema todo to anon, authenticated, service_role;
grant all on all routines in schema todo to anon, authenticated, service_role;
grant all on all sequences in schema todo to anon, authenticated, service_role;
alter default privileges for role postgres in schema todo grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema todo grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema todo grant all on sequences to anon, authenticated, service_role;


------------------------------------------------------------------------ todo
alter table todo.todo_resident enable row level security;
    CREATE POLICY view_all_for_tenant ON todo.todo_tenant
      FOR SELECT
      USING (auth_ext.tenant_id() = tenant_id)
      ;
    CREATE POLICY create_for_tenant ON todo.todo_tenant
      FOR INSERT
      WITH CHECK (auth_ext.tenant_id() = tenant_id)
      ;

------------------------------------------------------------------------ todo
alter table todo.todo_resident enable row level security;
    CREATE POLICY view_all_for_tenant ON todo.todo_resident
      FOR SELECT
      USING (auth_ext.has_permission('p:todo', tenant_id))
      ;
    CREATE POLICY create_for_tenant ON todo.todo_resident
      FOR INSERT
      WITH CHECK (auth_ext.has_permission('p:todo', tenant_id))
      ;
------------------------------------------------------------------------ todo
alter table todo.todo enable row level security;
    CREATE POLICY manage_all_for_tenant ON todo.todo
      FOR ALL
      USING (auth_ext.tenant_id()::uuid = tenant_id)
      WITH CHECK (auth_ext.tenant_id()::uuid = tenant_id)
      ;
