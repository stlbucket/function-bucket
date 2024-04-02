create schema wh;

create table wh.webhook_request (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY
  ,requested_at timestamptz not null default current_timestamp
  ,completed_at timestamptz
  ,url citext not null
  ,body jsonb not null default '{}'::jsonb
  ,result jsonb
  ,error jsonb
);