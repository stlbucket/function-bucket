DROP SCHEMA IF EXISTS test_helpers cascade;

BEGIN;

  select plan(1);
  select ok(true);
  select * from finish();

ROLLBACK;