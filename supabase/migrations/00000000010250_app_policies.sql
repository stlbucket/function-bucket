--- app_api policies
grant usage on schema app_api to anon, authenticated, service_role;
grant all on all tables in schema app_api to anon, authenticated, service_role;
grant all on all routines in schema app_api to anon, authenticated, service_role;
grant all on all sequences in schema app_api to anon, authenticated, service_role;
alter default privileges for role postgres in schema app_api grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema app_api grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema app_api grant all on sequences to anon, authenticated, service_role;

--- app_fn policies
grant usage on schema app_fn to anon, authenticated, service_role;
grant all on all tables in schema app_fn to anon, authenticated, service_role;
grant all on all routines in schema app_fn to anon, authenticated, service_role;
grant all on all sequences in schema app_fn to anon, authenticated, service_role;
alter default privileges for role postgres in schema app_fn grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema app_fn grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema app_fn grant all on sequences to anon, authenticated, service_role;

--- app policies
grant usage on schema app to anon, authenticated, service_role;
grant all on all tables in schema app to anon, authenticated, service_role;
grant all on all routines in schema app to anon, authenticated, service_role;
grant all on all sequences in schema app to anon, authenticated, service_role;
alter default privileges for role postgres in schema app grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema app grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema app grant all on sequences to anon, authenticated, service_role;

------------------------------------------------------------------------ profile
alter table app.profile enable row level security;
    CREATE POLICY view_self ON app.profile
      FOR SELECT
      USING (auth.uid() = id);
    CREATE POLICY update_self ON app.profile
      FOR UPDATE
      USING (auth.uid() = id)
      WITH CHECK (auth.uid() = id)
      ;
    CREATE POLICY manage_all_super_admin ON app.profile
      FOR ALL
      USING (auth_ext.has_permission('p:app-admin-super'));
------------------------------------------------------------------------ resident
alter table app.resident enable row level security;
    CREATE POLICY view_own_resident_email ON app.resident
      FOR SELECT
      USING (auth.jwt()->>'email' = email and auth_ext.tenant_id() = tenant_id);
    CREATE POLICY view_own_resident ON app.resident
      FOR SELECT
      USING (auth.uid() = profile_id and type != 'support' and auth_ext.tenant_id() = tenant_id);
    CREATE POLICY update_own_resident ON app.resident
      FOR UPDATE
      USING (auth.uid() = profile_id)
      WITH CHECK (auth.uid() = profile_id);
    CREATE POLICY manage_own_tenant_residencies ON app.resident
      FOR ALL
      USING (auth_ext.has_permission('p:app-admin', tenant_id) and type != 'support');
    -- CREATE POLICY manage_resident ON app.resident
    --   FOR ALL
    --   USING (auth_ext.has_permission('p:app-admin-super'));
------------------------------------------------------------------------ tenant
alter table app.tenant enable row level security;
    CREATE POLICY view_own_tenant_user ON app.tenant
      FOR SELECT
      USING (auth_ext.has_permission('p:app-user', id));
    CREATE POLICY manage_own_tenant_admin ON app.tenant
      FOR ALL
      USING (auth_ext.has_permission('p:app-admin', id));
    CREATE POLICY manage_tenant ON app.tenant
      FOR ALL
      USING (auth_ext.has_permission('p:app-admin-super'));
------------------------------------------------------------------------ tenant_subscription
alter table app.tenant_subscription enable row level security;
    CREATE POLICY view_own_tenant_subscriptions ON app.tenant_subscription
      FOR SELECT
      USING (auth_ext.has_permission('p:app-admin', tenant_id));
    CREATE POLICY manage_tenant_subscription ON app.tenant_subscription
      FOR ALL
      USING (auth_ext.has_permission('p:app-admin-super'));
------------------------------------------------------------------------ license
alter table app.license enable row level security;
    CREATE POLICY view_own_profile_licenses ON app.license
      FOR ALL
      USING (auth_ext.profile_id() = profile_id);
    CREATE POLICY view_own_tenant_licenses ON app.license
      FOR ALL
      USING (auth_ext.has_permission('p:app-admin', tenant_id));
    CREATE POLICY manage_license ON app.license
      FOR ALL
      USING (auth_ext.has_permission('p:app-admin-super'));
------------------------------------------------------------------------ application
alter table app.application enable row level security;
    CREATE POLICY view_all_users ON app.application
      FOR SELECT
      USING (1=1);
------------------------------------------------------------------------ license_pack
alter table app.license_pack enable row level security;
    CREATE POLICY view_all_users ON app.license_pack
      FOR SELECT
      USING (1=1);
------------------------------------------------------------------------ license_pack_license_type
alter table app.license_pack_license_type enable row level security;
    CREATE POLICY view_all_users ON app.license_pack_license_type
      FOR SELECT
      USING (1=1);
------------------------------------------------------------------------ license_type
alter table app.license_type enable row level security;
    CREATE POLICY view_all_users ON app.license_type
      FOR SELECT
      USING (1=1);
------------------------------------------------------------------------ license_type_permission
alter table app.license_type_permission enable row level security;
    CREATE POLICY view_all_users ON app.license_type_permission
      FOR SELECT
      USING (1=1);
------------------------------------------------------------------------ permission
alter table app.permission enable row level security;
    CREATE POLICY view_all_users ON app.permission
      FOR SELECT
      USING (1=1);
