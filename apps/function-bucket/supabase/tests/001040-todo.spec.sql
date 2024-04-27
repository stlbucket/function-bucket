BEGIN;
-- SELECT plan(7);
SELECT * FROM no_plan();

-- Examples: https://pgtap.org/documentation.html
\set _tenant_name 'todo-test-tenant'
\set _tenant_admin_email 'todo-test-tenant1-admin@example.com'
-- \set _license_pack_key 'todo'
\set _identifier 'todo-test-tenant'
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
  -- select test_helpers.logout();
------------------------------------------------------------------------
-- END SETUP TEST TENANT
------------------------------------------------------------------------ 

------------------------------------------------------------------------ 
-- EXERCISE TODO FUNCTIONS
------------------------------------------------------------------------ 
  \set _todo_list_name "test todo name"
  \set _todo_name_1 "test todo 1"
  \set _todo_name_2 "test todo 2"
  ------------------------------------------------------------------------ 
  select isa_ok(
    (
      select todo_fn.create_todo(
        _name => :'_todo_list_name'::citext
        ,_options => row(
          null
          ,null
          ,'{}'::citext[]
          ,false
          ,null
        )
        ,_resident_id => (select id from app.resident where email = :'_tenant_admin_email'::citext)
      )
    )
    ,'todo.todo'
    ,'should create a todo'
  );
      select isa_ok(
        (select id from todo.todo where name = :'_todo_list_name'::citext)::uuid
        ,'uuid'
        ,'todo_list id should be uuid'
      );
      select is(
        (select status from todo.todo where name = :'_todo_list_name'::citext)::todo.todo_status
        ,'incomplete'::todo.todo_status
        ,'todo list status should be incomplete'
      );
      select is(
        (select type from todo.todo where name = :'_todo_list_name'::citext)::todo.todo_type
        ,'task'::todo.todo_type
        ,'todo list type should be task'
      );
  ------------------------------------------------------------------------ 
  select isa_ok(
    (
      select todo_fn.create_todo(
        _name => :'_todo_name_1'::citext
        ,_options => row(
          null
          ,(select id from todo.todo where name = :'_todo_list_name'::citext)
          ,'{}'::citext[]
          ,false
          ,null
        )
        ,_resident_id => (select id from app.resident where email = :'_tenant_admin_email'::citext)
      )
    )
    ,'todo.todo'
    ,'should create a todo'
  );
      select isa_ok(
        (select id from todo.todo where name = :'_todo_name_1'::citext)
        ,'uuid'
        ,'todo 1 id should be uuid'
      );
      select is(
        (select status from todo.todo where name = :'_todo_name_1'::citext)::todo.todo_status
        ,'incomplete'::todo.todo_status
        ,'todo status should be incomplete'
      );
      select is(
        (select type from todo.todo where name = :'_todo_list_name'::citext)::todo.todo_type
        ,'milestone'::todo.todo_type
        ,'todo list type should be milestone'
      );
      select isa_ok(
        (select todo_fn.pin_todo(id) from todo.todo where name = :'_todo_name_1'::citext)::todo.todo
        ,'todo.todo'
        ,'todo pin todo'
      );
      select is(
        (select pinned from todo.todo where name = :'_todo_name_1'::citext)::boolean
        ,true
        ,'todo should be pinned'
      );
      select isa_ok(
        (select todo_fn.unpin_todo(id) from todo.todo where name = :'_todo_name_1'::citext)::todo.todo
        ,'todo.todo'
        ,'todo unpin todo'
      );
      select is(
        (select pinned from todo.todo where name = :'_todo_name_1'::citext)::boolean
        ,false
        ,'todo should be unpinned'
      );
  ------------------------------------------------------------------------ 
  select isa_ok(
    (
      select todo_fn.create_todo(
        _name => :'_todo_name_2'::citext
        ,_options => row(
          null
          ,(select id from todo.todo where name = :'_todo_list_name'::citext)
          ,'{}'::citext[]
          ,false
          ,null
        )
        ,_resident_id => (select id from app.resident where email = :'_tenant_admin_email'::citext)
      )
    )
    ,'todo.todo'
    ,'should create a todo'
  );
      select isa_ok(
        (select id from todo.todo where name = :'_todo_name_2'::citext)
        ,'uuid'
        ,'todo 1 id should be uuid'
      );
      select is(
        (select status from todo.todo where name = :'_todo_name_2'::citext)::todo.todo_status
        ,'incomplete'::todo.todo_status
        ,'todo status should be incomplete'
      );
  ------------------------------------------------------------------------ 
  select isa_ok(
    (
      select todo_fn.update_todo_status(
        _todo_id => (select id from todo.todo where name = :'_todo_name_1'::citext)
        ,_status => 'complete'
      )
    )
    ,'todo.todo'
    ,'should todo 1'
  );
      select is(
        (select status from todo.todo where name = :'_todo_name_1')::todo.todo_status
        ,'complete'::todo.todo_status
        ,'todo status should be complete'
      );
  select isa_ok(
    (
      select todo_fn.update_todo_status(
        _todo_id => (select id from todo.todo where name = :'_todo_name_2'::citext)
        ,_status => 'complete'
      )
    )
    ,'todo.todo'
    ,'should complete all todos'
  );
      select is(
        (select status from todo.todo where name = :'_todo_name_2')::todo.todo_status
        ,'complete'::todo.todo_status
        ,'todo status should be complete'
      );
      select is(
        (select status from todo.todo where name = :'_todo_list_name')::todo.todo_status
        ,'complete'::todo.todo_status
        ,'todo list status should be complete'
      );
  ---------------------------------------------------------------------- 
  select is(
    (
      select todo_fn.delete_todo(
        _todo_id => (select id from todo.todo where name = :'_todo_name_1')::uuid
      )
    )
    ,true
    ,'should delete a todo'
  );
      select is(
        (select count(*) from todo.todo where name = :'_todo_name_1')::integer
        ,0::integer
        ,'should be no todo with _todo_name_1'
      );
  ---------------------------------------------------------------------- 
  select is(
    (
      select todo_fn.delete_todo(
        _todo_id => (select id from todo.todo where name = :'_todo_name_2')::uuid
      )
    )
    ,true
    ,'should delete a todo'
  );
      select is(
        (select count(*) from todo.todo where name = :'_todo_name_2')::integer
        ,0::integer
        ,'should be no todo with _todo_name_2'
      );
  ---------------------------------------------------------------------- 
  select is(
    (select type from todo.todo where name = :'_todo_list_name'::citext)::todo.todo_type
    ,'task'::todo.todo_type
    ,'todo list type should be task'
  );
  select is(
    (
      select todo_fn.delete_todo(
        _todo_id => (select id from todo.todo where name = :'_todo_list_name')::uuid
      )
    )
    ,true
    ,'should delete a todo list'
  );
  select is(
    (select count(*) from todo.todo)::integer
    ,0::integer
    ,'should be no todos'
  );
------------------------------------------------------------------------ 
-- END EXERCISE TODO FUNCTIONS
------------------------------------------------------------------------ 

SELECT * FROM finish();
ROLLBACK;
