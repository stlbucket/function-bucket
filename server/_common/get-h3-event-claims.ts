import { serverSupabaseClient } from '#supabase/server'
import { useFnbPgClient } from '~/composables/use-pg-client.js'
import { H3Event } from 'h3'

async function getH3EventClaims(event: H3Event) {
  try {
    // Here is where we get user session info from anywhere:  redis, our current database, useSupabaseUser(), etc...
    // Since we are using supabase, we use the supabase client, but this could integrate with any auth provider
    const client = await serverSupabaseClient(event)
    // const session = (await client.auth.getSession()).data.session
    const { data: { user } } = await client.auth.getUser()

    // this implementation is retrieving current user claims from the database
    // on every call.  there is currently no user metadata stored in the jwt
    // in favor of this approach. this could be adjusted, depending on 
    // scalability concerns and/or auth provider implementations

    if (user) {
      event.context.session = user
      const client = useFnbPgClient()
      const claims = (await client.doQuery(`
        with p as (select * from app.profile where email = $1) 
        select to_jsonb(c.*) from p, app_fn.current_profile_claims(p.id) c
      ;`, [user.email])).rows[0].to_jsonb
      event.context.claims = claims
      return {
        user,
        claims
      }
    } else {
      return {
        user: undefined,
        claims: undefined
      }
    }

  } catch(e: any) {
    console.log('AUTH ERROR', e)
    throw e
  }
}

export { getH3EventClaims }
