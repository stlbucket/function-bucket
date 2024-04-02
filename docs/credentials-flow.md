# Authentication and Authorization
## Default Setup
By default, PKCE flow with OTP magic-link login is enabled.

Coupled with the demo data and the DemoAppTenants component, this helps during early stages of development and demonstration.

It is up to you to implement the final authentication flow; you might also keep or evolve this one.

This is intentional, so as not to be tied to any of the external authentication solutions including:
  - [oso](https://www.osohq.com/)
  - [clerk](https://clerk.com/)
  - [fusionauth](https://fusionauth.io/)
  - ...etc

[supabase auth docs](https://supabase.com/docs/guides/auth) - learn it.  love it.  live it.

## Permissions and Licensing
A core function of the app and app_fn schema is to derive user claims from the licenses they are assigned and to update them in the ```auth.users.raw_user_meta_data``` field.

Each application (base, incidents, your_app) exposes license-types to which users are subscribed.  Each license-type has one or more permissions associated with it.

Claims are the rollup of all of these permissions, as well as a few other useful datapoints and can be obtained by calling ```app_fn.current_profile_claims``` as follows:
```
postgres=> select jsonb_pretty(to_jsonb(app_fn.current_profile_claims(id))) as claims from app.profile where email = 'app-admin-super@example.com';
                           claims
------------------------------------------------------------
 {                                                         +
     "email": "app-admin-super@example.com",               +
     "tenant_id": "9dab4723-515b-4273-8f33-314b43b184be",  +
     "profile_id": "631ee696-1521-4f35-9b9c-495a7ae7bc2d", +
     "permissions": [                                      +
         "p:app-admin-super",                              +
         "p:app-admin",                                    +
         "p:app-admin-support",                            +
         "p:incidents",                                    +
         "p:incidents-admin",                              +
         "p:todo",                                         +
         "p:discussions",                                  +
         "p:address-book"                                  +
     ],                                                    +
     "resident_id": "54b20ad7-b2dc-4b97-ad5a-182605c0b981",+
     "tenant_name": "Anchor Tenant",                       +
     "display_name": "app-admin-super",                    +
     "profile_status": "active",                           +
     "actual_resident_id": null                            +
}
```
These claims - particularly the permissions - are then used anywhere in the application to expose functionality in the UI, and to enforce access control in the database.

## app_fn.current_profile_claims => raw_user_meta_data
Some actions change individual user claims, and effect the update of ```auth.user.raw_user_meta_data``` field in supabase, including:

- User license assignment
- User blocked/unblocked
- User changes tenant
- Support user enters/exits support mode for a tenant

This is done within a database function, but could also be moved to an edge function.

This metadata then shows up in the user JWT through supabase.

Alternative auth solutions might use an edge function to push claims into user metadata in an external system.

It is recommended you read the JWT [deep dive](https://supabase.com/docs/learn/auth-deep-dive/auth-deep-dive-jwts) in the docs.

## Server Authorization
``` ts
// Currently, we use the appState.loggedIn flag in conjunction with supabase session
//   --  if loggedIn, and there is a supabase token, we expect a supabase session, setting to 'INVALID SESSION' if it does not exist
//   --  if !loggedIn, we are anon
//
//
// NOTE: https://github.com/nuxt-modules/supabase/issues/246
// The logic here may not change
// But the supabase cookie is present even after logging out
//

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  try {
    const appStateCookie: any = getCookie(event, 'appState')
    const appState = appStateCookie ? JSON.parse(appStateCookie) : {
      loggedIn: false
    }
    if (appState.loggedIn) {
      // Here is where we get user session info from anywhere:  redis, our current database, useSupabaseUser(), etc...
      const client = await serverSupabaseClient(event)
      const session = (await client.auth.getSession()).data.session

      // the session will be used later by graphql
      event.context.session = session || 'INVALID SESSION'  
    }
  } catch(e: any) {
    console.log('AUTH ERROR', e)
    throw e
  }  
})

```
## postgraphile context
The last step is to pass the claims along with each database call.

With postgraphile, this is done using the context function referenced in graphile.config.ts
``` ts
// server/api/graphile.config.ts
...
    /* options for Grafast, including setting GraphQL context*/
    context: (requestContext, args) => {
      // this is where user session data set in 
      // server/middleware/auth is used to pass into the query context
      const session = requestContext.h3v1?.event.context.session
      if (session === 'INVALID SESSION') {
        throw new Error(session)
      }
      const claims = session?.user
      const additionalSettings = {
        role: claims?.aud || 'anon',
        'request.jwt.claim.sub': claims?.id,
        'request.jwt.claim.aud': claims?.aud,
        'request.jwt.claim.email': claims?.email,
        'request.jwt.claim': JSON.stringify(claims)
      }  
      return {
        pgSettings: {
          ...args.contextValue?.pgSettings,
          ...additionalSettings
        }
      }
    }
...
```
## example db call stack
``` sql
---------------------------------------------- create_todo
-- there are two functions involved
--      todo_api.create_todo
--        - exposed via graphql
--        - enforces permissions
--        - incorporates context into todo_fn call
--
--      todo_fn.create_todo
--        - no references to auth or auth_ext
--        - functions at this level should be context unaware meaning
--          parameters such as tenant_id, resident_id, etc are passed from api layer
--          

CREATE OR REPLACE FUNCTION todo_api.create_todo(
    _name citext
    ,_options todo_fn.create_todo_options
  )
  RETURNS todo.todo
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _retval todo.todo;
  BEGIN
    -- enforce any permissions here
    if auth_ext.has_permission('p:todo') = false then
      raise exception '30000: PERMISSION DENIED';
    end if;
  
    _options.resident_id = auth_ext.resident_id()::uuid;

    -- call todo_fn layer, including relevant context info; _resident_id, in this case.
    _retval := todo_fn.create_todo(
      _name::citext
      ,_options::todo_fn.create_todo_options
    );
    return _retval;
  end;
  $$;

CREATE OR REPLACE FUNCTION todo_fn.create_todo(
    _name citext
    ,_options todo_fn.create_todo_options
  )
  RETURNS todo.todo
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _ordinal integer;
    _todo_resident todo.todo_resident;
    _retval todo.todo;
  BEGIN
    _todo_resident := todo_fn.ensure_todo_resident(_options.resident_id);

    _ordinal := 0;
    if _options.parent_todo_id is not null then
      _ordinal := (select count(*) + 1 from todo.todo where parent_todo_id = _options.parent_todo_id);
    end if;

    insert into todo.todo(
      tenant_id
      ,resident_id
      ,name
      ,description
      ,parent_todo_id
      ,ordinal
    ) 
    values(
      _todo_resident.tenant_id
      ,_todo_resident.resident_id
      ,_name
      ,_options.description
      ,_options.parent_todo_id
      ,_ordinal
    )
    returning * into _retval;

    if _options.parent_todo_id is not null then
      update todo.todo set type = 'milestone' where id = _options.parent_todo_id;

      perform todo_fn.update_todo_status(
        _todo_id => _retval.id
        ,_status => 'incomplete'
      );
    end if;

    
    return _retval;
  end;
  $$;
  ```