#!/bin/sh -

npx supabase db reset

psql postgresql://postgres:postgres@localhost:54322/postgres -f ./supabase/0030-demo-data-bandz.sql
psql postgresql://postgres:postgres@localhost:54322/postgres -f ./supabase/0031-demo-data-bandz.sql
psql postgresql://postgres:postgres@localhost:54322/postgres -f ./supabase/0040-demo-data-gearz.sql
psql postgresql://postgres:postgres@localhost:54322/postgres -f ./supabase/0050-demo-data-realz.sql

