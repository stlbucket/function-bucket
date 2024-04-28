// import { serverSupabaseClient } from '#supabase/server'
// import { useFnbPgClient } from '~/composables/use-pg-client.js'
import { H3Event } from 'h3'
import { getH3EventClaims } from '~/server/_common/get-h3-event-claims.js'

export default defineEventHandler(async (event: H3Event) => {
  // graphql request claims must be checked in the context handler in graphile.config.ts
  if (event.node.req.url !== '/api/graphql') {
    await getH3EventClaims(event)
  }
})

// THIS ALL GETS DELETED SOON - WAS REFACTORED
// import { serverSupabaseClient } from '#supabase/server'
// import { useFnbPgClient } from '~/composables/use-pg-client.js'
// import { H3Event } from 'h3'

// export default defineEventHandler(async (event: H3Event) => {
//   try {
//     // Here is where we get user session info from anywhere:  redis, our current database, useSupabaseUser(), etc...
//     // Since we are using supabase, we use the supabase client, but this could integrate with any auth provider
//     const client = await serverSupabaseClient(event)
//     const session = (await client.auth.getSession()).data.session

//     // the session will be used later by graphql
//     // right now we do nothing if there is no session
//     // this results in no claims at the postgraphile layer, so anonymous user.

//     // this implementation is retrieving current user claims from the database
//     // on every call.  there is currently no user metadata stored in the jwt
//     // in favor of this approach. this could be adjusted, depending on 
//     // scalability concerns and/or auth provider implementations

//     if (session) {
//       event.context.session = session
//       const client = useFnbPgClient()
//       const claims = (await client.doQuery(`
//         with p as (select * from app.profile where email = $1) 
//         select to_jsonb(c.*) from p, app_fn.current_profile_claims(p.id) c
//       ;`, [session.user.email])).rows[0].to_jsonb
//       event.context.claims = claims
//     }

//   } catch(e: any) {
//     console.log('AUTH ERROR', e)
//     throw e
//   }  
// })
