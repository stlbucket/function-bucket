begin;
drop schema if exists werdz cascade;
drop schema if exists werdz_fn cascade;
drop schema if exists werdz_fn_api cascade;
-----------------------------------------------
-- script  werdz schema
-----------------------------------------------
create schema if not exists werdz;
create schema if not exists werdz_fn;
create schema if not exists werdz_fn_api;
------------------------------------------------------------------------ werdz_tenant
-- create table app.tenant (
--   tenant_id uuid not null references app.tenant(id) primary key
--   ,name citext not null
-- );
------------------------------------------------------------------------ werdz_resident
create table werdz.werdz_resident (
  resident_id uuid not null references werdz.werdz_resident(resident_id) primary key
  ,tenant_id uuid not null references app.tenant(id)
  ,display_name citext not null
);
------------------------------------------------------------------------ wb_game
create type werdz.wb_player_status as enum (
  'none'
  ,'invited'
  ,'joined'
  ,'ghosted'
  ,'declined'
);
create type werdz.wb_match_status as enum (
  'waiting'
  ,'playing'
  ,'complete'
  ,'abandoned'
);
create type werdz.wb_set_status as enum (
  'planned'
  ,'playing'
  ,'complete'
  ,'abandoned'
);
create type werdz.wb_game_status as enum (
  'planned'
  ,'playing'
  ,'complete'
  ,'abandoned'
);
create type werdz.wb_round_status as enum (
  'planned'
  ,'open'
  ,'closed'
  ,'settled'
  ,'surplus'
);
create type werdz.wb_letter_status as enum (
  'planned'
  ,'prepared'
  ,'absent'
  ,'correct'
  ,'blocked'
  ,'misplaced'
  ,'surplus'
);
create type werdz.wb_block_status as enum (
  'planned'
  ,'prepared'
  ,'disabled'
  ,'used'
  ,'passed'
  ,'blocked'
  ,'missed'
  ,'surplus'
);
-----------------------------------------------
create table if not exists werdz.word(
  word citext NOT NULL primary key
  ,length integer GENERATED ALWAYS AS (length(word)) STORED
);
-----------------------------------------------
create table if not exists werdz.wb_match (
  id uuid NOT NULL DEFAULT gen_random_uuid() primary key
  ,tenant_id uuid not null references app.tenant(id)
  ,topic_id uuid null references msg.topic(id)
  ,status werdz.wb_match_status not null default 'waiting'
  ,created_at timestamptz not null default current_timestamp
  ,updated_at timestamptz not null default current_timestamp
  ,word_length integer not null default 5
  ,sets_per_match integer not null default 3
  ,rounds_per_game integer not null default 6
  ,player_1_resident_id uuid null references werdz.werdz_resident(resident_id)
  ,player_1_status werdz.wb_player_status not null default 'none'
  ,player_1_set_score integer not null default 0
  ,player_1_total_score integer not null default 0
  ,player_2_resident_id uuid null references werdz.werdz_resident(resident_id)
  ,player_2_status werdz.wb_player_status not null default 'none'
  ,player_2_set_score integer not null default 0
  ,player_2_total_score integer not null default 0
);
-----------------------------------------------
create table if not exists werdz.wb_game (
  id uuid NOT NULL DEFAULT gen_random_uuid() primary key
  ,tenant_id uuid not null references app.tenant(id)
  -- ,wb_set_id uuid not null references werdz.wb_set(id)
  ,status werdz.wb_game_status not null default 'planned'
  ,created_at timestamptz not null default current_timestamp
  ,updated_at timestamptz not null default current_timestamp
  ,offense_player_resident_id uuid null references werdz.werdz_resident(resident_id)
  ,defense_player_resident_id uuid null references werdz.werdz_resident(resident_id)
  ,word text not null
  ,number_of_rounds integer not null default 6
  ,current_round_number integer not null default 0
  ,first_blocking_round integer not null default 2
  ,last_blocking_round integer GENERATED ALWAYS AS (number_of_rounds - 1) STORED
  ,word_length integer GENERATED ALWAYS AS (length(word)) STORED
  ,blocked_round integer null
  ,guessed_round integer null
  ,offense_score integer not null default 0
  ,defense_score integer not null default 0
);
-----------------------------------------------
create table if not exists werdz.wb_set (
  id uuid NOT NULL DEFAULT gen_random_uuid() primary key
  ,tenant_id uuid not null references app.tenant(id)
  ,wb_match_id uuid not null references werdz.wb_match(id)
  ,player_1_offense_game_id uuid null references werdz.wb_game(id)
  ,player_2_offense_game_id uuid null references werdz.wb_game(id)
  ,created_at timestamptz not null default current_timestamp
  ,updated_at timestamptz not null default current_timestamp
  ,status werdz.wb_set_status not null default 'planned'
  ,set_number integer not null
  ,player_1_score integer not null default 0
  ,player_2_score integer not null default 0
);
-----------------------------------------------
create table if not exists werdz.wb_round (
  id uuid NOT NULL DEFAULT gen_random_uuid() primary key
  ,tenant_id uuid not null references app.tenant(id)
  ,wb_game_id uuid not null references werdz.wb_game(id)
  ,status werdz.wb_round_status not null default 'planned'
  ,round_number integer not null
  ,guess text null
  ,blocking_letter text null
  ,check(round_number > 0)
);
-----------------------------------------------
create table if not exists werdz.letter_result (
  id uuid NOT NULL DEFAULT gen_random_uuid() primary key
  ,tenant_id uuid not null references app.tenant(id)
  ,wb_round_id uuid not null references werdz.wb_round(id)
  ,status werdz.wb_letter_status not null default 'planned'
  ,ordinal integer not null
  ,letter character(1) not null
);
-----------------------------------------------
create table if not exists werdz.block_result (
  id uuid NOT NULL primary key references werdz.wb_round(id) -- one and only one
  ,tenant_id uuid not null references app.tenant(id)
  ,status werdz.wb_block_status not null default 'planned'
  ,letter character(1) not null
);
-----------------------------------------------
-- create index idx_werdz_werdz_tenant_id on app.tenant(tenant_id);
-- create index idx_werdz_werdz_resident_id on app.resident(resident_id);
-- create index idx_werdz_werdz_resident_tenant_id on app.resident(tenant_id);
-----------------------------------------------
create index idx_werdz_wb_match_tenant_id on werdz.wb_match(tenant_id);
create index idx_werdz_wb_match_topic_id on werdz.wb_match(topic_id);
create index idx_werdz_wb_match_player_1_id on werdz.wb_match(player_1_resident_id);
create index idx_werdz_wb_match_player_2_id on werdz.wb_match(player_2_resident_id);
-----------------------------------------------
create index idx_werdz_wb_set_tenant_id on werdz.wb_set(tenant_id);
-----------------------------------------------
create index idx_werdz_wb_game_tenant_id on werdz.wb_game(tenant_id);
create index idx_werdz_wb_game_offense_player_id on werdz.wb_game(offense_player_resident_id);
create index idx_werdz_wb_game_defense_player_id on werdz.wb_game(defense_player_resident_id);
-----------------------------------------------
create index idx_werdz_wb_round_tenant_id on werdz.wb_round(tenant_id);
-----------------------------------------------
create index idx_werdz_letter_result_tenant_id on werdz.letter_result(tenant_id);
create index idx_werdz_letter_result_round_id on werdz.letter_result(wb_round_id);
create index idx_werdz_block_result_tenant_id on werdz.block_result(tenant_id);
----------------------------------------------- 
commit;