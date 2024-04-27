# Getting Started
Clone the repository at **https://github.com/stlbucket/supanuxtbucket**
```
npm install
```
Create a [Supabase](https://www.supabase.com) account.

Install the [Supabase Cli](https://supabase.com/docs/guides/cli), create a new project and link to it.

Now deploy the Supabase migrations.
```
npx supabase projects list
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db init
```
After this, you will need to install the demo data - this is in addition to the seed sql:
```
psql postgresql://postgres:postgres@localhost:54322/postgres -f ./supabase/demo-data.sql
```
Create your .env file:
```
# /apps/ui-nuxt/.env.example
################################################################################################
#  local dev

# these two are for nuxt supabase module.  they do not follow the nuxt_VAR convention
SUPABASE_URL=http://localhost:54321
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
SUPABASE_JWT_SECRET=super-secret-jwt-token-with-at-least-32-characters-long

# this one is for postgraphile
SUPABASE_URI=postgresql://postgres:postgres@localhost:54322/postgres

# this is for keysely codegen
DATABASE_URL=postgres://postgres:postgres@localhost:54322
################################################################################################

################################
##  all environments
GRAPHQL_SCHEMAS=todo,todo_api,app,app_api,msg,msg_api,inc,inc_api
NUXT_GRAPHQL_SCHEMAS=todo,todo_api,app,app_api,msg,msg_api,inc,inc_api
################################

################################################################################################
##  staging, etc. - an instance deployed on the supabase platform
# SUPABASE_KEY=YOUR_SUPABASE_KEY
# SUPABASE_URL=YOUR_SUPABASE_URL
# SUPABASE_URI=YOUR_SUPABASE_URI
# SUPABASE_JWT_SECRET=YOUR_SUPABASE_JWT_SECRET

# RESEND_API_KEY=YOUR_RESEND_API_KEY
################################################################################################
```
The run the app
```
npm run dev
```
