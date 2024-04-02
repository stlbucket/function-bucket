#!/bin/sh -

npx supabase db reset

psql postgresql://postgres:postgres@localhost:54322/postgres -f ./supabase/0020-demo-data-werdz.sql
psql postgresql://postgres:postgres@localhost:54322/postgres -f supabase/werdz-seed.sql
# psql postgresql://postgres:postgres@localhost:54322/postgres -f supabase/werdz-demo.sql

psql postgresql://postgres:postgres@localhost:54322/postgres -f ./supabase/0030-demo-data-bandz.sql
psql postgresql://postgres:postgres@localhost:54322/postgres -f ./supabase/0040-demo-data-gearz.sql
psql postgresql://postgres:postgres@localhost:54322/postgres -f ./supabase/0050-demo-data-realz.sql

