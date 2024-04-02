// THIS DOESN'T SEEM TO WORK
// LEAVING HERE FOR NOW IN CASE I COME BACK TO IT LATER
// WOULD BE NICE TO HAVE ALL INTERACTION WITH SUPABASE ON SERVER SIDE
// BUT FOR NOW IT'S NOT WORTH WASTING TIME

import { serverSupabaseServiceRole, serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
// import pg from 'pg'

export default defineEventHandler(async (event: any) => {
  const body = await readBody(event)

  // console.log('OTP', event)

  // return {
  //   ...body,
  // }
  const supabaseClient = await serverSupabaseClient(event)
  // const supabaseUser = await serverSupabaseUser(event)

  const loginResult  = await supabaseClient.auth.signInWithOtp({
    email: body.email,
    options: {
      emailRedirectTo: body.emailRedirectTo,
    }
  })

  // console.log('loginResult', loginResult, body.emailRedirectTo)

  return {
    loginResult
  }

  //   const { error } = await supabase.auth.signInWithOtp({
  //     email: resident.email,
  //     options: {
  //       emailRedirectTo: `${window.origin}/authenticated`,
  //     }
  //   })
  //   if (error) {
  //     alert(error.message)
  //   } else {
  //     alert('Check your email inbox for the magic link!')
  //     if (process.env.environment === 'development') {
  //       navigateTo('http://localhost:54324/monitor', {external: true})
  //     }
  //   }

  // const client = new pg.Client({
  //   connectionString: useRuntimeConfig().SUPABASE_URI
  // })
  // await client.connect()
  
  // const permissions = supabaseUser?.user_metadata.permissions.filter((p: string) => ['p:app-admin', 'p:app-admin-super'].indexOf(p) > -1)
  // let resident
  // let inviteResult

  // if (permissions.length > 0) {
  //   const res = await client.query(`SELECT (r.*) from app_fn.invite_user(
  //     _tenant_id => $1::uuid
  //     ,_email => $2::citext
  //     ,_assignment_scope => 'user'::app.license_type_assignment_scope
  //   ) r
  //   ;`, [
  //     supabaseUser?.user_metadata.tenant_id,
  //     body.email
  //   ])
  //   resident = res.rows[0]
  //   await client.end()  

  //  inviteResult = await supabaseClient.auth.admin.inviteUserByEmail(body.email)
   
  // } else {
  //   throw new Error('NONE SHALL PASS')
  // }

  // return {
  //   resident: resident,
  //   inviteResult: inviteResult
  // }
})
