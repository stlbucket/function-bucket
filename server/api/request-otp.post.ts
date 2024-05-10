// THIS DOESN'T SEEM TO WORK
// LEAVING HERE FOR NOW IN CASE I COME BACK TO IT LATER
// WOULD BE NICE TO HAVE ALL INTERACTION WITH SUPABASE ON SERVER SIDE
// BUT FOR NOW IT'S NOT WORTH WASTING TIME

import { serverSupabaseServiceRole, serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
// import pg from 'pg'

export default defineEventHandler(async (event: any) => {
  const body = await readBody(event)
  const supabaseClient = await serverSupabaseClient(event)

  const loginResult  = await supabaseClient.auth.signInWithOtp({
    email: body.email,
    options: {
      emailRedirectTo: body.emailRedirectTo,
    }
  })

  return {
    loginResult
  }
})
