--- msg_api policies
grant usage on schema msg_api to anon, authenticated, service_role;
grant all on all tables in schema msg_api to anon, authenticated, service_role;
grant all on all routines in schema msg_api to anon, authenticated, service_role;
grant all on all sequences in schema msg_api to anon, authenticated, service_role;
alter default privileges for role postgres in schema msg_api grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema msg_api grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema msg_api grant all on sequences to anon, authenticated, service_role;

--- msg_fn policies
grant usage on schema msg_fn to anon, authenticated, service_role;
grant all on all tables in schema msg_fn to anon, authenticated, service_role;
grant all on all routines in schema msg_fn to anon, authenticated, service_role;
grant all on all sequences in schema msg_fn to anon, authenticated, service_role;
alter default privileges for role postgres in schema msg_fn grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema msg_fn grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema msg_fn grant all on sequences to anon, authenticated, service_role;


--- msg policies
grant usage on schema msg to anon, authenticated, service_role;
grant all on all tables in schema msg to anon, authenticated, service_role;
grant all on all routines in schema msg to anon, authenticated, service_role;
grant all on all sequences in schema msg to anon, authenticated, service_role;
alter default privileges for role postgres in schema msg grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema msg grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema msg grant all on sequences to anon, authenticated, service_role;


------------------------------------------------------------------------ msg
alter table msg.msg_resident enable row level security;
    CREATE POLICY view_all_for_tenant ON msg.msg_tenant
      FOR SELECT
      USING (auth_ext.tenant_id() = tenant_id)
      ;
    CREATE POLICY create_for_tenant ON msg.msg_tenant
      FOR INSERT
      WITH CHECK (auth_ext.tenant_id() = tenant_id)
      ;

alter table msg.msg_resident enable row level security;
    CREATE POLICY view_all_for_tenant ON msg.msg_resident
      FOR SELECT
      USING (auth_ext.has_permission('p:discussions', tenant_id))
      ;
    CREATE POLICY create_for_tenant ON msg.msg_resident
      FOR INSERT
      WITH CHECK (auth_ext.has_permission('p:discussions', tenant_id))
      ;

alter table msg.topic enable row level security;
    CREATE POLICY view_all_for_tenant ON msg.topic
      FOR SELECT
      USING (auth_ext.has_permission('p:discussions', tenant_id))
      ;
    CREATE POLICY create_for_tenant ON msg.topic
      FOR INSERT
      WITH CHECK (auth_ext.has_permission('p:discussions', tenant_id))
      ;

alter table msg.subscriber enable row level security;
    CREATE POLICY view_all_for_tenant ON msg.subscriber
      FOR SELECT
      USING (auth_ext.has_permission('p:discussions', tenant_id))
      ;
    CREATE POLICY create_for_tenant ON msg.subscriber
      FOR INSERT
      WITH CHECK (auth_ext.has_permission('p:discussions', tenant_id))
      ;

alter table msg.message enable row level security;
    CREATE POLICY view_all_for_tenant ON msg.message
      FOR SELECT
      USING (auth_ext.has_permission('p:discussions', tenant_id))
      ;
    CREATE POLICY create_for_tenant ON msg.message
      FOR INSERT
      WITH CHECK (auth_ext.has_permission('p:discussions', tenant_id))
      ;

    -- CREATE POLICY manage_all_for_tenant ON msg.topic
    --   FOR ALL
    --   USING (auth_ext.has_all_permissions('{"p:discussions","p:app-admin"}'::citext[], tenant_id));
    --   ;

    -- CREATE POLICY manage_all_super_admin ON msg.topic
    --   FOR ALL
    --   USING (auth_ext.has_permission('p:app-admin-super'))
    --   WITH CHECK (auth_ext.has_permission('p:app-admin-super'))
    --   ;
