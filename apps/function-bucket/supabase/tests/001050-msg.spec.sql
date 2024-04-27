BEGIN;
-- SELECT plan(7);
SELECT * FROM no_plan();

-- Examples: https://pgtap.org/documentation.html
\set _tenant_name 'msg-test-tenant'
\set _tenant_admin_email 'msg-test-tenant1-admin@example.com'
-- \set _license_pack_key 'msg'
\set _identifier 'msg-test-tenant'
------------------------------------------------------------------------
-- SETUP TEST TENANT
------------------------------------------------------------------------ 
  select isa_ok(
    (select app_fn.create_tenant(
      :'_tenant_name'::citext
      ,:'_identifier'::citext
      ,:'_tenant_admin_email'::citext
    ))
    ,'app.tenant'
    ,'should create an tenant'
  );
------------------------------------------------------------------------
-- END SETUP TEST TENANT
------------------------------------------------------------------------ 

------------------------------------------------------------------------ 
-- EXERCISE MSG FUNCTIONS
------------------------------------------------------------------------ 
  \set _topic_name "test msg topic name"
  \set _msg_1 "test msg 1"
  \set _msg_2 "test msg 2"

------------------------------------------------------------------------ 
-- END EXERCISE MSG FUNCTIONS
------------------------------------------------------------------------ 

SELECT * FROM finish();
ROLLBACK;
