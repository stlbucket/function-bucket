import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'
import pg from 'pg'

export default defineEventHandler(async (event) => {
  const supabaseClient = await serverSupabaseServiceRole(event)
  const supabaseUser = await serverSupabaseUser(event)

  const body = await readBody(event)

  const client = new pg.Client({
    connectionString: useRuntimeConfig().SUPABASE_URI
  })
  await client.connect()
  
  const claims = event.context.claims
  const permissions = claims ? 
    claims.permissions.filter((p: string) => ['p:app-admin', 'p:app-admin-super'].indexOf(p) > -1) :
    []
  let resident
  let inviteResult

  if (permissions.length > 0) {
    const res = await client.query(`SELECT (r.*) from app_fn.invite_user(
      _tenant_id => $1::uuid
      ,_email => $2::citext
      ,_assignment_scope => 'user'::app.license_type_assignment_scope
    ) r
    ;`, [
      claims.tenant_id,
      body.email
    ])
    resident = res.rows[0]
    await client.end()

   inviteResult = await supabaseClient.auth.admin.inviteUserByEmail(body.email, {
      redirectTo: body.redirectTo,
   })
   
  } else {
    throw new Error('NONE SHALL PASS')
  }

  return {
    resident: resident
  }
})
