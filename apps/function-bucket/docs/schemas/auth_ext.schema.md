# auth_ext
This schema is a group of functions that pull data out of the jwt without having to reference it directly.

There are also functions to determine if the user has a particular permission.

It is a layer of indirection between the application and supabase.

## functions
```
postgres=> \df auth_ext.*
List of functions-[ RECORD 1 ]-------+--------------------------------------------------------------
Schema              | auth_ext
Name                | actual_resident_id
Result data type    | uuid
Argument data types |
Type                | func
-[ RECORD 2 ]-------+--------------------------------------------------------------
Schema              | auth_ext
Name                | display_name
Result data type    | citext
Argument data types |
Type                | func
-[ RECORD 3 ]-------+--------------------------------------------------------------
Schema              | auth_ext
Name                | email
Result data type    | citext
Argument data types |
Type                | func
-[ RECORD 4 ]-------+--------------------------------------------------------------
Schema              | auth_ext
Name                | enforce_permission
Result data type    | boolean
Argument data types | _permission_key citext, _tenant_id uuid DEFAULT NULL::uuid
Type                | func
-[ RECORD 5 ]-------+--------------------------------------------------------------
Schema              | auth_ext
Name                | has_all_permissions
Result data type    | boolean
Argument data types | _permission_keys citext[], _tenant_id uuid DEFAULT NULL::uuid
Type                | func
-[ RECORD 6 ]-------+--------------------------------------------------------------
Schema              | auth_ext
Name                | has_permission
Result data type    | boolean
Argument data types | _permission_key citext, _tenant_id uuid DEFAULT NULL::uuid
Type                | func
-[ RECORD 7 ]-------+--------------------------------------------------------------
Schema              | auth_ext
Name                | permissions
Result data type    | citext[]
Argument data types |
Type                | func
-[ RECORD 8 ]-------+--------------------------------------------------------------
Schema              | auth_ext
Name                | resident_id
Result data type    | uuid
Argument data types |
Type                | func
-[ RECORD 9 ]-------+--------------------------------------------------------------
Schema              | auth_ext
Name                | tenant_id
Result data type    | uuid
Argument data types |
Type                | func```
