import { serverSupabaseClient } from '#supabase/server'
import { useFnbPgClient } from '~/composables/use-pg-client.js'

import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { useRuntimeConfig } from '#imports'

async function getWsMessageClaims(requestContext: any) {
  try {
    const {
      supabase: { url, key, cookieName, clientOptions }
    } = useRuntimeConfig().public
    const options = {
      auth: {
        detectSessionInUrl: false,
        persistSession: false,
        autoRefreshToken: false
      }
    }
    const req = requestContext.ws.request
    const sbToken = (req.rawHeaders[req.rawHeaders.indexOf('cookie') + 1]).split('; ')
    .map(t => {
      const split = t.split('=')
      return {
        [split[0]]: split[1]
      }
    })
    .reduce((a, t) => {
      return {
        ...a,
        ...t
      }
    }, {})

    // Here is where we get user session info from anywhere:  redis, our current database, useSupabaseUser(), etc...
    // Since we are using supabase, we use the supabase client, but this could integrate with any auth provider
    const supabaseClient: SupabaseClient = createClient(url, key, options)
    const accessToken = sbToken['sb-access-token']
    const refreshToken = sbToken['sb-refresh-token']

    if (!accessToken || !refreshToken) throw new Error('Auth required')

    const authResponse = await supabaseClient.auth.setSession({
      refresh_token: refreshToken,
      access_token: accessToken
    })

    // the session could be used later by graphql
    // right now we do nothing if there is no session
    // this results in no claims at the postgraphile layer, so anonymous user.

    // this implementation is retrieving current user claims from the database
    // on every call.  there is currently no user metadata stored in the jwt
    // in favor of this approach. this could be adjusted, depending on 
    // scalability concerns and/or auth provider implementations
    const session = authResponse.data.session
    const user = authResponse.data?.user
    if (!session) return {
      claims: undefined,
      user: undefined
    }
    if (!user || !user.email)  return {
      claims: undefined,
      user: undefined
    }

    const client = useFnbPgClient()
    const claims = (await client.doQuery(`
      with p as (select * from app.profile where email = $1) 
      select to_jsonb(c.*) from p, app_fn.current_profile_claims(p.id) c
    ;`, [user.email])).rows[0].to_jsonb

    return {
      user,
      claims
    }
  } catch(e: any) {
    console.log('AUTH ERROR', e)
    throw e
  }
}

export { getWsMessageClaims }