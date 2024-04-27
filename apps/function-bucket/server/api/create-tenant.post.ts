import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'
import pg from 'pg'

export default defineEventHandler(async (event) => {
  const supabaseClient = await serverSupabaseServiceRole(event)
  const supabaseUser = await serverSupabaseUser(event)

  // console.log('CLAIMS', event.context.claims)

  const body = await readBody(event)

  const client = new pg.Client({
    connectionString: useRuntimeConfig().SUPABASE_URI
  })
  await client.connect()
  
  const claims = event.context.claims
  const permissions = claims ? 
    claims.permissions.filter((p: string) => ['p:app-admin-super'].indexOf(p) > -1) :
    []
  let tenant
  let resident
  let inviteResult    
if (permissions.length > 0) {
    // make the tenant
    console.log('wtf', body)
    const tenantRes = await client.query(`
      select (t.*) from app_fn.create_tenant(
        _name => $1::citext
        ,_identifier => $2::citext
        ,_email => $3::citext
        ,_type => 'customer'::app.tenant_type
      ) t
    ;`, [
      // this parameter needs to be changed to use event.context.claims.tenantId
      body.name,
      null,
      body.email
    ])
    tenant = tenantRes.rows[0]

    // invite the admin user
    const inviteRes = await client.query(`SELECT (r.*) from app_fn.invite_user(
      _tenant_id => $1::uuid
      ,_email => $2::citext
      ,_assignment_scope => 'admin'::app.license_type_assignment_scope
    ) r
    ;`, [
      tenant.id,
      body.email
    ])
    resident = inviteRes.rows[0]
    await client.end()  

    inviteResult = await supabaseClient.auth.admin.inviteUserByEmail(body.email)
  } else {
    throw new Error('NONE SHALL PASS')
  }

  return {
    tenant: tenant,
    resident: resident,
    inviteResult: inviteResult
  }
})
