BEGIN;
-- SELECT plan(7);
SELECT * FROM no_plan();

------------------------------------------------------------------------
-- HELPER FUNCTONS
------------------------------------------------------------------------ 
create or replace function test_helpers.setup_wb_match (
    _tenant_identifier citext
    ,_player_1_display_name citext default null
    ,_player_2_display_name citext default null
    ,_word_length integer default 5
    ,_sets_per_match integer default 3
    ,_rounds_per_game integer default 6
  ) returns werdz.wb_match
    language plpgsql
    as $$
declare
    _auth_user auth.users;
    _profile_claims app_fn.profile_claims;
    _tenant app.tenant;
    _player_1 app.resident;
    _player_2 app.resident;
    _wb_match werdz.wb_match;
begin
  select * into _tenant from app.tenant where identifier = _tenant_identifier;
  select * into _player_1 from app.resident where display_name = _player_1_display_name;
  select * into _player_2 from app.resident where display_name = _player_2_display_name;

  _wb_match = werdz_fn.create_wb_match(
    _tenant_id => _tenant.id
    ,_options => row(
      _player_1.id
      ,_player_2.id
      ,_word_length
      ,_sets_per_match
      ,_rounds_per_game
    )
  );

  return _wb_match;
end;
$$;
-- create or replace function test_helpers.setup_wb_game (
--     _tenant_id uuid
--     ,_word citext
--     ,_email citext default null
--   ) returns void
--     language plpgsql
--     as $$
-- declare
--     _auth_user auth.users;
--     _profile_claims app_fn.profile_claims;
-- begin
--   perform werdz_fn.create_wb_game(
--     row(
--       null::uuid -- offense_player_resident_id uuid
--       ,null::uuid -- ,defense_player_resident_id uuid
--       ,_tenant_id::uuid -- ,tenant_id uuid
--       ,null::integer -- ,word_length integer
--       ,_word::citext -- ,word text
--       ,null::werdz.wb_game_status -- ,status werdz.wb_game_status
--       ,null::integer -- ,number_of_rounds integer
--       -- ,'{"TEST"}'::citext[]
--     )::werdz_fn.create_wb_game_options
--   );
--   if _email is not null then
--     update werdz.wb_game set offense_player_resident_id = (select id from app.resident where email = _email);
--     update werdz.wb_game set defense_player_resident_id = (select id from app.resident where email = _email);
--     perform werdz_fn.join_game(
--       (select id from werdz.wb_game where word = _word::citext)::uuid
--       ,(select id from app.resident where email = _email::citext)
--     );
--   end if;
-- end;
-- $$;

create type test_helpers.expected_letter_result as (
  letter citext
  ,status werdz.wb_letter_status
);

create or replace function test_helpers.verify_letter_results (
    _wb_round_id uuid
    ,_expected_letter_results test_helpers.expected_letter_result[]
    ,_expected_block_result werdz.wb_block_status
    ,_verbose boolean default false
  ) returns boolean
    language plpgsql
    as $$
  declare
    _ordinal integer;
    _round werdz.wb_round;
    _expected_letter_result werdz.letter_result;
  begin
    select r.* 
    into _round 
    from werdz.wb_round r
    where r.id = _wb_round_id
    ;
    if _verbose = true then raise notice 'VERIFYING LETTER RESULTS: %, %', _round.round_number, _round.status; end if;
    if _round.id is null then
      raise notice 'NO SETTLED ROUND';
      return false;
    end if;
    for _ordinal in 1..array_length(_expected_letter_results,1)
    loop
      select lr.* 
        into _expected_letter_result
      from werdz.letter_result lr
      where wb_round_id = _round.id
      and ordinal = _ordinal
      ;

      if _expected_letter_result.letter != _expected_letter_results[_ordinal].letter then
        raise notice 'expected letter mismatch! have: %   want: %', _expected_letter_result.letter, _expected_letter_results[_ordinal].letter;
        return false;
      end if;
      if _expected_letter_result.status != _expected_letter_results[_ordinal].status then
        raise notice 'expected status mismatch for letter: %! have: %   want: %', _expected_letter_result.letter, _expected_letter_result.status, _expected_letter_results[_ordinal].status;
        return false;
      end if;

      if _verbose = true then 
        raise notice 'ELR: %, %, %, %, %'
          ,_ordinal
          ,(_expected_letter_results[_ordinal]::test_helpers.expected_letter_result).letter
          ,(_expected_letter_results[_ordinal]::test_helpers.expected_letter_result).status
          ,_expected_letter_result.letter
          ,_expected_letter_result.status
        ;
      end if;
    end loop;
    return true;
  end;
  $$;

create or replace function test_helpers.test_a_round (
    _wb_game_id uuid
    ,_guess citext
    ,_expected_letter_results test_helpers.expected_letter_result[]
    ,_expected_block_result werdz.wb_block_status
    ,_blocking_letter char(1) default null
    ,_expected_game_status werdz.wb_game_status default 'playing'
    ,_verbose boolean default false
  ) returns boolean
    language plpgsql
    as $$
  declare
    _ordinal integer;
    _game werdz.wb_game;
    _number_of_rounds integer;
    _last_round werdz.wb_round;
    _current_round werdz.wb_round;
    _expected_letter_result werdz.letter_result;
  begin
    -- verify game
    select * into _game from werdz.wb_game where id = _wb_game_id;
    assert _game.id is not null, 'NO GAME FOR THIS ID';
    -- count rounds:  this will currently always be 6, but we could make configurable games maybe
    select count(*) into _number_of_rounds from werdz.wb_round where wb_game_id = _game.id;
    -- verify current round
    select * into _current_round from werdz.wb_round where wb_game_id = _wb_game_id and round_number = _game.current_round_number;
    assert _current_round.status = 'open', 'Current round must be open';
    if _verbose = true then raise notice 'CURRENT ROUND: %', _current_round.round_number; end if;

    if _current_round.round_number = 1 then
      assert _blocking_letter is null, 'poorly defined test: first round blocking letter must be null';
      -- first round
      _game = werdz_fn.set_current_guess(
        _wb_game_id::uuid
        ,_guess
      );
      assert _game.current_round_number = 2, 'Current round number should be 2 for game';
      select * into _last_round from werdz.wb_round where id = _current_round.id;
      assert _last_round.status = 'settled', 'First round should settle after set_current_guess';
      select * into _current_round from werdz.wb_round where wb_game_id = _wb_game_id and round_number = _game.current_round_number;
      assert _current_round.round_number = 2, 'Current round number should be 2 for round';
      assert _current_round.status = 'open', 'Second round should be open after set_current_guess';    
    elsif _current_round.round_number = _number_of_rounds then
      -- last round
      assert _blocking_letter is null, 'poorly defined test: last round blocking letter must be null';
      assert _expected_game_status = 'complete', 'poorly defined test: last round should expect a complete game';
      _game = werdz_fn.set_current_guess(
        _wb_game_id::uuid
        ,_guess
      );
      select * into _last_round from werdz.wb_round where wb_game_id = _wb_game_id and round_number = _game.current_round_number;
      assert _last_round.round_number = _number_of_rounds, 'Current round number should be _number_of_rounds';
      assert _last_round.status = 'settled', 'final round should be settled';
      assert _game.status = 'complete', 'game status should be complete';
    else
      -- middle round
      assert _blocking_letter is not null, 'poorly defined test: middle round blocking letter must not be null unless status is used';
      _game := (select werdz_fn.set_current_guess(
        _wb_game_id::uuid
        ,_guess
      ));
      -- raise notice 'GAME WTF: %', _game; --.current_round_number, _game.status;
      select * into _game from werdz.wb_game where id = _wb_game_id;
      -- raise exception 'GAME: % %', _game.current_round_number, _game.status;
      _game = werdz_fn.set_blocking_letter(
        _wb_game_id::uuid
        ,_blocking_letter
      );

      select * into _last_round from werdz.wb_round where id = _current_round.id;
      select * into _current_round from werdz.wb_round where wb_game_id = _wb_game_id and round_number = _game.current_round_number;
      if _expected_game_status = 'playing' then
        assert _game.current_round_number = _last_round.round_number + 1, 'Current round number should be last+1 for game';
        assert _current_round.round_number = _last_round.round_number+1, 'Current round number should be last+1 for round';
        assert _last_round.status = 'settled', 'Last round should settle after set_current_guess';
        assert _current_round.status = 'open', 'Current round should be open after set_current_guess and set blocking letter';    
      elsif _expected_game_status = 'complete' then
        assert _game.status = 'complete', 'game should be complete';
      else
        raise exception 'unxpected _expected_game_status: %', _expected_game_status;
      end if;

    end if;

    assert test_helpers.verify_letter_results(
      _last_round.id
      ,_expected_letter_results
      ,_expected_block_result
      ,_verbose
    ) = true, 'failed verify_letter_results';

    return true;
  end;
  $$;

-- create or replace function test_helpers.test_a_game (
--     _wb_game_id uuid
--     ,_guess citext
--     ,_expected_letter_results test_helpers.expected_letter_result[]
--     ,_expected_block_result werdz.wb_block_status
--     ,_blocking_letter char(1) default null
--     ,_expected_game_status werdz.wb_game_status default 'playing'
--     ,_verbose boolean default false
--   ) returns boolean
--     language plpgsql
--     as $$
-- declare
--   _ordinal integer;
--   _game werdz.wb_game;
--   _number_of_rounds integer;
--   _last_round werdz.wb_round;
--   _current_round werdz.wb_round;
--   _expected_letter_result werdz.letter_result;
-- begin
--     select test_helpers.setup_wb_game(
--       (select id from app.tenant where identifier = :'_identifier'::citext)::uuid
--       ,:'_test_word'::citext
--       ,:'_tenant_admin_email'
--     );
--     select is(
--       (select status from werdz.wb_game where word = :'_test_word'::citext)
--       ,'playing'
--     );

--       (select test_helpers.test_a_round(
--         _wb_game_id => (select id from werdz.wb_game where word = :'_test_word'::citext)::uuid
--         ,_guess => 'sound'::citext
--         ,_expected_letter_results => array[
--             row('s','absent')
--             ,row('o','correct')
--             ,row('u','correct')
--             ,row('n','correct')
--             ,row('d','correct')
--           ]::test_helpers.expected_letter_result[]
--         ,_expected_block_result => 'missed'::werdz.wb_block_status
--         ,_blocking_letter => 'x'::char(1)
--         ,_verbose => false
--       ))

--   return true;
-- end;
-- $$;
------------------------------------------------------------------------
-- END HELPER FUNCTONS
------------------------------------------------------------------------ 

-- Examples: https://pgtap.org/documentation.html
\set _tenant_name 'werdz-test-tenant'
\set _tenant_admin_email 'werdz-test-tenant1-admin@example.com'
-- \set _license_pack_key 'werdz'
\set _identifier 'werdz-test-tenant'
-- add new sets to test specific game scenarios
\set _sets_per_match 10 
------------------------------------------------------------------------
-- SETUP TEST TENANT
------------------------------------------------------------------------ 
  select isa_ok(
    (select app_fn.create_tenant(
      :'_tenant_name'::citext
      ,:'_identifier'::citext
      ,:'_tenant_admin_email'::citext
    ))
    ,'app.tenant'
    ,'should create an tenant'
  );
------------------------------------------------------------------------
-- END SETUP TEST TENANT
------------------------------------------------------------------------ 

------------------------------------------------------------------------ 
-- EXERCISE WERDZ FUNCTIONS
------------------------------------------------------------------------
-------------- create a wb_match with no players --------------------------------------------------------------------------------------------------------
select isa_ok(
  (
    select test_helpers.setup_wb_match(
      _tenant_identifier => :'_identifier'::citext
      ,_sets_per_match => :'_sets_per_match'::integer
    )
  )
  ,'werdz.wb_match'
  ,'should create a wb_match'
);
select isa_ok(
  (select werdz_fn.join_match(
    (select id from werdz.wb_match)
    ,(select id from app.resident where email = :'_tenant_admin_email'::citext)
  ))
  ,'werdz.wb_match'
  ,'should join first time'
);
select is(
  (select player_1_status from werdz.wb_match)::werdz.wb_player_status
  ,'joined'::werdz.wb_player_status
  ,'player_1 should be joined'
);
select is(
  (select player_2_status from werdz.wb_match)::werdz.wb_player_status
  ,'none'::werdz.wb_player_status
  ,'player_2 should be none'
);
select isa_ok(
  (select werdz_fn.join_match(
    (select id from werdz.wb_match)
    ,(select id from app.resident where email = :'_tenant_admin_email'::citext)
  ))
  ,'werdz.wb_match'
  ,'should join second time'
);
select is(
  (select player_2_status from werdz.wb_match)::werdz.wb_player_status
  ,'joined'::werdz.wb_player_status
  ,'player_2 should be joined'
);
select is(
  (select status from werdz.wb_match)::werdz.wb_match_status
  ,'playing'::werdz.wb_match_status
  ,'match should be playing'
);
select is(
  (select count(*) from werdz.wb_game)::integer
  ,(select 2 * :'_sets_per_match'::integer)::integer
  ,'should be 6 games'
);
select is(
  (select count(*) from werdz.wb_round where status = 'open')::integer
  ,2::integer
  ,'should be 2 open rounds'
);

----------------------------- SET 1 -------------------------------------------------------------
----------------------------- GAME 1 -------------------------------------------------------------
-- first round correct guess
\set _test_word 'bbbbb'
\set _set_number 1
\set _expected_offense_score 6
\set _expected_defense_score 0
\set _expected_player_1_score 6
\set _expected_player_2_score 0
\set _expected_player_1_set_score 0
\set _expected_player_1_total_score 0
\set _expected_player_2_set_score 0
\set _expected_player_2_total_score 0
  with  _wb_set as (select * from werdz.wb_set where set_number = :'_set_number'::integer)
        ,_game as (select * from werdz.wb_game where id = (select player_1_offense_game_id from _wb_set))
  update werdz.wb_game g set word = :'_test_word'::citext
    where g.id = (select id from _game);
  select is(
    (select count(*) from werdz.wb_game where word = :'_test_word')::integer
    ,1::integer
    ,'should be one game with test word'
  );
  select isa_ok(
    werdz_fn.set_current_guess(
      (select id from werdz.wb_game where word = :'_test_word'::citext)::uuid
      ,:'_test_word'::citext
    )
    ,'werdz.wb_game'
    ,'should set current guess'
  );
  select is(
    (select status from werdz.wb_game where word = :'_test_word'::citext)
    ,'complete'
  );
  select is(
    (select offense_score from werdz.wb_game where word = :'_test_word'::citext)
    ,:'_expected_offense_score'::integer
    ,'_expected_offense_score'
  );
  select is(
    (select defense_score from werdz.wb_game where word = :'_test_word'::citext)
    ,:'_expected_defense_score'::integer
    ,'_expected_defense_score'
  );
  select is(
    (select player_1_score from werdz.wb_set where set_number = 1)
    ,:'_expected_player_1_score'::integer
    ,'_expected_player_1_score'
  );
  select is(
    (select player_2_score from werdz.wb_set where set_number = 1)
    ,:'_expected_player_2_score'::integer
    ,'_expected_player_2_score'
  );
  select is(
    (select player_1_total_score from werdz.wb_match)
    ,:'_expected_player_1_total_score'::integer
    ,'_expected_player_1_total_score'
  );
  select is(
    (select player_1_set_score from werdz.wb_match)
    ,:'_expected_player_1_set_score'::integer
    ,'_expected_player_1_set_score'
  );
  select is(
    (select player_2_total_score from werdz.wb_match)
    ,:'_expected_player_2_total_score'::integer
    ,'_expected_player_2_total_score'
  );
  select is(
    (select player_2_set_score from werdz.wb_match)
    ,:'_expected_player_2_set_score'::integer
    ,'_expected_player_2_set_score'
  );
----------------------------- END GAME 1 -------------------------------------------------------------

----------------------------- GAME 2 -------------------------------------------------------------
-- first round correct guess
\set _test_word 'ccccc'
\set _set_number 1
\set _expected_offense_score 6
\set _expected_defense_score 0
\set _expected_player_1_score 6
\set _expected_player_2_score 6
\set _expected_player_1_set_score 0
\set _expected_player_1_total_score 6
\set _expected_player_2_set_score 0
\set _expected_player_2_total_score 6
  with  _wb_set as (select * from werdz.wb_set where set_number = :'_set_number'::integer)
        ,_game as (select * from werdz.wb_game where id = (select player_2_offense_game_id from _wb_set))
  update werdz.wb_game g set word = :'_test_word'::citext
    where g.id = (select id from _game);
  select is(
    (select count(*) from werdz.wb_game where word = :'_test_word')::integer
    ,1::integer
    ,'should be one game with test word'
  );
  select isa_ok(
    werdz_fn.set_current_guess(
      (select id from werdz.wb_game where word = :'_test_word'::citext)::uuid
      ,:'_test_word'::citext
    )
    ,'werdz.wb_game'
    ,'should set current guess'
  );
  select is(
    (select status from werdz.wb_game where word = :'_test_word'::citext)
    ,'complete'
  );
  select is(
    (select status from werdz.wb_set where set_number = :'_set_number'::integer)::werdz.wb_set_status
    ,'complete'::werdz.wb_set_status
    ,'first set should be complete'
  );
  select is(
    (select player_2_score from werdz.wb_set where set_number = :'_set_number'::integer)
    ,6
    ,'score should for player 2 should be 6'
  );
  select is(
    (select status from werdz.wb_match)::werdz.wb_match_status
    ,'playing'::werdz.wb_match_status
    ,'match should be playing'
  );
  select is(
    (select status from werdz.wb_set where set_number = 1 + :'_set_number'::integer)::werdz.wb_set_status
    ,'playing'::werdz.wb_set_status
    ,'second set should be playing'
  );
  select is(
    (select status from werdz.wb_set where set_number = 2 + :'_set_number'::integer)::werdz.wb_set_status
    ,'planned'::werdz.wb_set_status
    ,'third set should be planned'
  );
  select is(
    (select offense_score from werdz.wb_game where word = :'_test_word'::citext)
    ,:'_expected_offense_score'::integer
    ,'_expected_offense_score'
  );
  select is(
    (select defense_score from werdz.wb_game where word = :'_test_word'::citext)
    ,:'_expected_defense_score'::integer
    ,'_expected_defense_score'
  );
  select is(
    (select player_1_score from werdz.wb_set where set_number = :'_set_number'::integer)
    ,:'_expected_player_1_score'::integer
    ,'_expected_player_1_score'
  );
  select is(
    (select player_2_score from werdz.wb_set where set_number = :'_set_number'::integer)
    ,:'_expected_player_2_score'::integer
    ,'_expected_player_2_score'
  );
  select is(
    (select player_1_total_score from werdz.wb_match)
    ,:'_expected_player_1_total_score'::integer
    ,'_expected_player_1_total_score'
  );
  select is(
    (select player_1_set_score from werdz.wb_match)
    ,:'_expected_player_1_set_score'::integer
    ,'_expected_player_1_set_score'
  );
  select is(
    (select player_2_total_score from werdz.wb_match)
    ,:'_expected_player_2_total_score'::integer
    ,'_expected_player_2_total_score'
  );
  select is(
    (select player_2_set_score from werdz.wb_match)
    ,:'_expected_player_2_set_score'::integer
    ,'_expected_player_2_set_score'
  );
----------------------------- END GAME 2 -------------------------------------------------------------
----------------------------- END SET 1 -------------------------------------------------------------

----------------------------- SET 2 -------------------------------------------------------------
----------------------------- GAME 1 -------------------------------------------------------------
-- first round correct guess
\set _test_word 'ddddd'
\set _set_number 2
\set _expected_offense_score 6
\set _expected_defense_score 0
\set _expected_player_1_score 6
\set _expected_player_2_score 0
\set _expected_player_1_set_score 0
\set _expected_player_1_total_score 6
\set _expected_player_2_set_score 0
\set _expected_player_2_total_score 6
  with  _wb_set as (select * from werdz.wb_set where set_number = :'_set_number'::integer)
        ,_game as (select * from werdz.wb_game where id = (select player_1_offense_game_id from _wb_set))
  update werdz.wb_game g set word = :'_test_word'::citext
    where g.id = (select id from _game);
  select is(
    (select count(*) from werdz.wb_game where word = :'_test_word')::integer
    ,1::integer
    ,'should be one game with test word'
  );
  select isa_ok(
    werdz_fn.set_current_guess(
      (select id from werdz.wb_game where word = :'_test_word'::citext)::uuid
      ,:'_test_word'::citext
    )
    ,'werdz.wb_game'
    ,'should set current guess'
  );
  select is(
    (select status from werdz.wb_game where word = :'_test_word'::citext)
    ,'complete'
  );
  select is(
    (select offense_score from werdz.wb_game where word = :'_test_word'::citext)
    ,:'_expected_offense_score'::integer
    ,'_expected_offense_score'
  );
  select is(
    (select defense_score from werdz.wb_game where word = :'_test_word'::citext)
    ,:'_expected_defense_score'::integer
    ,'_expected_defense_score'
  );
  select is(
    (select player_1_score from werdz.wb_set where set_number = :'_set_number'::integer)
    ,:'_expected_player_1_score'::integer
    ,'_expected_player_1_score'
  );
  select is(
    (select player_2_score from werdz.wb_set where set_number = :'_set_number'::integer)
    ,:'_expected_player_2_score'::integer
    ,'_expected_player_2_score'
  );
  select is(
    (select player_1_total_score from werdz.wb_match)
    ,:'_expected_player_1_total_score'::integer
    ,'_expected_player_1_total_score'
  );
  select is(
    (select player_1_set_score from werdz.wb_match)
    ,:'_expected_player_1_set_score'::integer
    ,'_expected_player_1_set_score'
  );
  select is(
    (select player_2_total_score from werdz.wb_match)
    ,:'_expected_player_2_total_score'::integer
    ,'_expected_player_2_total_score'
  );
  select is(
    (select player_2_set_score from werdz.wb_match)
    ,:'_expected_player_2_set_score'::integer
    ,'_expected_player_2_set_score'
  );
----------------------------- END GAME 1 -------------------------------------------------------------

----------------------------- GAME 2 -------------------------------------------------------------
-- first round correct guess
\set _test_word 'eeeee'
\set _set_number 2
\set _expected_offense_score 6
\set _expected_defense_score 0
\set _expected_player_1_score 6
\set _expected_player_2_score 6
\set _expected_player_1_set_score 0
\set _expected_player_1_total_score 12
\set _expected_player_2_set_score 0
\set _expected_player_2_total_score 12
  with  _wb_set as (select * from werdz.wb_set where set_number = :'_set_number'::integer)
        ,_game as (select * from werdz.wb_game where id = (select player_2_offense_game_id from _wb_set))
  update werdz.wb_game g set word = :'_test_word'::citext
    where g.id = (select id from _game);
  select is(
    (select count(*) from werdz.wb_game where word = :'_test_word')::integer
    ,1::integer
    ,'should be one game with test word'
  );
  select isa_ok(
    werdz_fn.set_current_guess(
      (select id from werdz.wb_game where word = :'_test_word'::citext)::uuid
      ,:'_test_word'::citext
    )
    ,'werdz.wb_game'
    ,'should set current guess'
  );
  select is(
    (select status from werdz.wb_game where word = :'_test_word'::citext)
    ,'complete'
  );
  select is(
    (select status from werdz.wb_set where set_number = :'_set_number'::integer)::werdz.wb_set_status
    ,'complete'::werdz.wb_set_status
    ,'first set should be complete'
  );
  select is(
    (select player_2_score from werdz.wb_set where set_number = :'_set_number'::integer)
    ,6
    ,'score should for player 2 should be 6'
  );
  select is(
    (select status from werdz.wb_match)::werdz.wb_match_status
    ,'playing'::werdz.wb_match_status
    ,'match should be playing'
  );
  select is(
    (select status from werdz.wb_set where set_number = 1 + :'_set_number'::integer)::werdz.wb_set_status
    ,'playing'::werdz.wb_set_status
    ,'second set should be playing'
  );
  select is(
    (select status from werdz.wb_set where set_number = 2 + :'_set_number'::integer)::werdz.wb_set_status
    ,'planned'::werdz.wb_set_status
    ,'third set should be planned'
  );
  select is(
    (select offense_score from werdz.wb_game where word = :'_test_word'::citext)
    ,:'_expected_offense_score'::integer
    ,'_expected_offense_score'
  );
  select is(
    (select defense_score from werdz.wb_game where word = :'_test_word'::citext)
    ,:'_expected_defense_score'::integer
    ,'_expected_defense_score'
  );
  select is(
    (select player_1_score from werdz.wb_set where set_number = :'_set_number'::integer)
    ,:'_expected_player_1_score'::integer
    ,'_expected_player_1_score'
  );
  select is(
    (select player_2_score from werdz.wb_set where set_number = :'_set_number'::integer)
    ,:'_expected_player_2_score'::integer
    ,'_expected_player_2_score'
  );
  select is(
    (select player_1_total_score from werdz.wb_match)
    ,:'_expected_player_1_total_score'::integer
    ,'_expected_player_1_total_score'
  );
  select is(
    (select player_1_set_score from werdz.wb_match)
    ,:'_expected_player_1_set_score'::integer
    ,'_expected_player_1_set_score'
  );
  select is(
    (select player_2_total_score from werdz.wb_match)
    ,:'_expected_player_2_total_score'::integer
    ,'_expected_player_2_total_score'
  );
  select is(
    (select player_2_set_score from werdz.wb_match)
    ,:'_expected_player_2_set_score'::integer
    ,'_expected_player_2_set_score'
  );
----------------------------- END GAME 2 -------------------------------------------------------------
----------------------------- END SET 2 -------------------------------------------------------------

------------------------------------------------------------------------ 
-- END EXERCISE WERDZ FUNCTIONS
------------------------------------------------------------------------ 

SELECT * FROM finish();
ROLLBACK;
