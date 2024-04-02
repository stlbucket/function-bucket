
-----------------------------------------------
-- script  werdz_fn schema
-----------------------------------------------

create schema if not exists werdz_fn_api;
create schema if not exists werdz_fn;
drop type if exists werdz_fn.create_wb_match_options cascade;
create type werdz_fn.create_wb_match_options as (
  player_1_resident_id uuid
  ,player_2_resident_id uuid
  ,word_length integer
  ,sets_per_match integer
  ,rounds_per_game integer
);
----------------------------------- install_werdz_application
CREATE OR REPLACE FUNCTION werdz_fn.install_werdz_application()
  RETURNS app.application
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $function$
  DECLARE
    _application app.application;
  BEGIN
    _application := app_fn.install_basic_application(
      _key => 'werdz'
      ,_name => 'Werdz'
      ,_description => 'A word game by bucket.'
      ,_auto_subscribe => false
    );
    return _application;
  end;
  $function$
  ;
----------------------------------- handle_update_profile ---  NO API
create or replace function werdz_fn.handle_update_profile()
  returns trigger
  language plpgsql
  security definer
  as $$
  DECLARE
    _claims jsonb;
  begin
    update werdz.werdz_resident set
      display_name = new.display_name
    where resident_id in (
      select id from app.resident where profile_id = new.id
    );

    return new;
  end;
  $$;
  -- trigger the function every time a user is created
create or replace trigger werdz_on_app_profile_updated
  after update on app.profile
  for each row execute procedure werdz_fn.handle_update_profile();

-------------------------------------- ensure_werdz_resident
CREATE OR REPLACE FUNCTION werdz_fn.ensure_werdz_resident(
    _resident_id uuid
  ) RETURNS werdz.werdz_resident
    LANGUAGE plpgsql VOLATILE SECURITY DEFINER
    AS $$
  DECLARE
    -- _werdz_tenant werdz.werdz_tenant;
    _werdz_resident werdz.werdz_resident;
  BEGIN
    -- -- ensure that the resident has a werdz_resident and werdz_tenant.  add them if not.
    -- select mt.* 
    -- into _werdz_tenant 
    -- from werdz.werdz_tenant mt 
    -- join app.resident aut on mt.tenant_id = aut.tenant_id and aut.id = _resident_id
    -- ;

    -- if _werdz_tenant.tenant_id is null then
    --   insert into werdz.werdz_tenant(tenant_id, name)
    --     select tenant_id, tenant_name
    --     from app.resident 
    --     where id = _resident_id
    --   returning * into _werdz_tenant;
    -- end if;

    select * into _werdz_resident from werdz.werdz_resident where resident_id = _resident_id;
    if _werdz_resident.resident_id is null then
      insert into werdz.werdz_resident(resident_id, display_name, tenant_id)
        select id, display_name, tenant_id
        from app.resident 
        where id = _resident_id 
      returning * into _werdz_resident;
    end if;
    return _werdz_resident;
  end;
  $$;
---------------------------------------------- create_wb_game
CREATE OR REPLACE FUNCTION werdz_fn_api.create_wb_match(
    _options werdz_fn.create_wb_match_options
  )
  RETURNS werdz.wb_match
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _wb_match werdz.wb_match;
  BEGIN
    -- raise exception 'WTF: %', auth.jwt();
    if auth_ext.has_permission('p:werdz-user') = false and auth_ext.has_permission('p:werdz-admin') = false then
      raise exception '30000: PERMISSION DENIED';
    end if;

    _wb_match := werdz_fn.create_wb_match(
      auth_ext.tenant_id()::uuid
      ,_options::werdz_fn.create_wb_match_options
    );
    return _wb_match;
  end;
  $$;

CREATE OR REPLACE FUNCTION werdz_fn.create_wb_match(
    _tenant_id uuid
    ,_options werdz_fn.create_wb_match_options
  )
  RETURNS werdz.wb_match
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _ordinal integer;
    _player_1_resident app.resident;
    _player_2_resident app.resident;
    _word citext;
    _number_of_rounds integer;
    _topic msg.topic;

    _word_length integer;
    _rounds_per_game integer;
    _sets_per_match integer;
    _wb_match werdz.wb_match;
    _set_number integer;
    _wb_set werdz.wb_set;
  BEGIN
    _word_length = coalesce(_options.word_length, 5);
    _sets_per_match = coalesce(_options.sets_per_match, 3);
    _rounds_per_game = coalesce(_options.rounds_per_game, 6);

    perform werdz_fn.ensure_werdz_resident(_options.player_1_resident_id);
    perform werdz_fn.ensure_werdz_resident(_options.player_2_resident_id);

    insert into werdz.wb_match(
      tenant_id
      ,word_length
      ,sets_per_match
      ,rounds_per_game
      ,player_1_resident_id
      ,player_1_status
      ,player_2_resident_id
      ,player_2_status
    )
    values(
      _tenant_id
      ,_word_length
      ,_sets_per_match
      ,_rounds_per_game
      ,_options.player_1_resident_id
      ,case when _options.player_1_resident_id is not null then 'invited'::werdz.wb_player_status else 'none'::werdz.wb_player_status end
      ,_options.player_2_resident_id
      ,case when _options.player_2_resident_id is not null then 'invited'::werdz.wb_player_status else 'none'::werdz.wb_player_status end
    )
    returning * into _wb_match
    ;

    for _set_number in 1.._sets_per_match loop
      insert into werdz.wb_set(
        tenant_id
        ,wb_match_id
        ,set_number
      )
      values (
        _tenant_id
        ,_wb_match.id
        ,_set_number
      )
      returning * into _wb_set
      ;
    end loop;

    -- raise exception 'wtf: %', _wb_match;
    return _wb_match;
  end;
  $$;

---------------------------------------------- join_match
CREATE OR REPLACE FUNCTION werdz_fn_api.join_match(
    _wb_match_id uuid
  )
  RETURNS werdz.wb_match
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _wb_match werdz.wb_match;
  BEGIN
    _wb_match := werdz_fn.join_match(
      _wb_match_id
      ,auth_ext.resident_id()::uuid
    );
    return _wb_match;
  end;
  $$;

CREATE OR REPLACE FUNCTION werdz_fn.join_match(
    _wb_match_id uuid
    ,_resident_id uuid
  )
  RETURNS werdz.wb_match
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _wb_match werdz.wb_match;
  BEGIN
    select * into _wb_match from werdz.wb_match where id = _wb_match_id;
    if _wb_match.id is null then
      raise exception 'no wb_match for id';
    end if;

    perform werdz_fn.ensure_werdz_resident(_resident_id);
    -- raise notice 'STUFF: % % % % '
    --   ,_wb_match.player_1_resident_id, _wb_match.player_1_status
    --   ,_wb_match.player_2_resident_id, _wb_match.player_2_status
    -- ;

    if _wb_match.player_1_resident_id = _resident_id and _wb_match.player_1_status = 'invited' then
      update werdz.wb_match set 
        player_1_status = 'joined'
      where id = _wb_match.id 
      returning * into _wb_match
      ;
    elsif _wb_match.player_2_resident_id = _resident_id and _wb_match.player_2_status = 'invited' then
      update werdz.wb_match set 
        player_2_status = 'joined'
      where id = _wb_match.id 
      returning * into _wb_match
      ;
    elsif _wb_match.player_1_resident_id is null then
      update werdz.wb_match set 
        player_1_resident_id = _resident_id
        ,player_1_status = 'joined'
      where id = _wb_match.id 
      returning * into _wb_match
      ;
    elsif _wb_match.player_2_resident_id is null then
      update werdz.wb_match set 
        player_2_resident_id = _resident_id
        ,player_2_status = 'joined'
      where id = _wb_match.id 
      returning * into _wb_match
      ;
    else
      raise exception 'Cannot join.  All seats for this game are taken.';
    end if;

    if _wb_match.player_1_status = 'joined' and _wb_match.player_2_status = 'joined' then
      _wb_match = werdz_fn.start_match(_wb_match.id);
    end if;

    -- raise notice 'MATCH: %', _wb_match;
    return _wb_match;
  end;
  $$;

CREATE OR REPLACE FUNCTION werdz_fn.start_match(
    _wb_match_id uuid
  )
  RETURNS werdz.wb_match
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _wb_match werdz.wb_match;
    _wb_set werdz.wb_set;
    _wb_game werdz.wb_game;
  BEGIN
    select * into _wb_match from werdz.wb_match where id = _wb_match_id;
    if _wb_match.id is null then
      raise exception 'No wb_match for id';
    end if;
    if _wb_match.player_1_status != 'joined' or _wb_match.player_2_status != 'joined' then
      raise exception 'All players must have joined in order to start match';
    end if;

    for _wb_set in
      select * from werdz.wb_set where wb_match_id = _wb_match_id
    loop

      _wb_game = werdz_fn.create_wb_game(
        _tenant_id => _wb_match.tenant_id
        ,_wb_set_id => _wb_set.id
        ,_offense_resident_id => _wb_match.player_1_resident_id
        ,_defense_resident_id => _wb_match.player_2_resident_id
      );

      update werdz.wb_set set
        player_1_offense_game_id = _wb_game.id
      where id = _wb_set.id
      returning * into _wb_set
      ;

      _wb_game = werdz_fn.create_wb_game(
        _tenant_id => _wb_match.tenant_id
        ,_wb_set_id => _wb_set.id
        ,_offense_resident_id => _wb_match.player_2_resident_id
        ,_defense_resident_id => _wb_match.player_1_resident_id
        -- ,_offense_resident_id => (select case when (_wb_set.set_number % 2 = 0) then _wb_match.player_2_resident_id else _wb_match.player_1_resident_id end)
        -- ,_defense_resident_id => (select case when (_wb_set.set_number % 2 = 0) then _wb_match.player_1_resident_id else _wb_match.player_2_resident_id end)
      );

      update werdz.wb_set set
        player_2_offense_game_id = _wb_game.id
      where id = _wb_set.id
      returning * into _wb_set
      ;

    end loop;
    update werdz.wb_match set
      status = 'playing'
    where id = _wb_match_id
    returning * into _wb_match
    ;

    update werdz.wb_set set
      status = 'playing'
    where wb_match_id = _wb_match.id
      and set_number = 1
    returning * into _wb_set
    ;

    update werdz.wb_game set
      status = 'playing'
    where id in (_wb_set.player_1_offense_game_id, _wb_set.player_2_offense_game_id)
    ;

    update werdz.wb_round set
      status = 'open'
    where wb_game_id in (_wb_set.player_1_offense_game_id, _wb_set.player_2_offense_game_id)
    and round_number = 1
    ;

    return _wb_match;
  end;
  $$;

CREATE OR REPLACE FUNCTION werdz_fn.create_wb_game(
    _tenant_id uuid
    ,_wb_set_id uuid
    ,_offense_resident_id uuid
    ,_defense_resident_id uuid
    ,_number_of_rounds integer default 6
    ,_word_length integer default 5
  )
  RETURNS werdz.wb_game
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _wb_game werdz.wb_game;
    _offense_resident app.resident;
    _defense_resident app.resident;
    _word citext;
  BEGIN
    _word = werdz_fn.get_random_word(_word_length);
    -- raise exception '% % %', _word_length, _word, _number_of_rounds;

    insert into werdz.wb_game(
      tenant_id
      -- ,wb_set_id
      ,offense_player_resident_id
      ,defense_player_resident_id
      ,status
      ,word
      ,current_round_number
    ) 
    values(
      _tenant_id
      -- ,_wb_set_id
      ,_offense_resident_id
      ,_defense_resident_id
      ,'planned'
      ,_word
      ,1
    )
    returning * into _wb_game;

    with round_numbers as (
      SELECT * FROM generate_series(1,_number_of_rounds) as rn
    )
    insert into werdz.wb_round(
      tenant_id
      ,wb_game_id
      ,round_number
      ,status
    )
    select
      _wb_game.tenant_id
      ,_wb_game.id
      ,rn
      ,'planned'
    from round_numbers
    ;

    -- add planned letter results
    with letters as (
      select letter, ordinality
      from unnest(string_to_array('     ', null)) with ordinality letter
    )
    ,rounds as (
      select * from werdz.wb_round where wb_game_id = _wb_game.id
    )
    insert into werdz.letter_result(
      tenant_id
      ,wb_round_id
      ,ordinal
      ,letter
      ,status
    )
    select
      _wb_game.tenant_id
      ,r.id
      ,l.ordinality
      ,l.letter
      ,'planned'
    from letters l
    join rounds r on 1 = 1
    ;

    with rounds as (
      select * from werdz.wb_round where wb_game_id = _wb_game.id
    )
    insert into werdz.block_result(
      id
      ,tenant_id
      ,letter
      ,status
    )
    select
      r.id
      ,_wb_game.tenant_id
      ,''
      ,case when r.round_number >= _wb_game.first_blocking_round and r.round_number <= _wb_game.last_blocking_round then
        'planned'::werdz.wb_block_status
      else
        'disabled'::werdz.wb_block_status
      end
    from rounds r
    ;    

    return _wb_game;
  end;
  $$;

---------------------------------------------- delete_wb_match
CREATE OR REPLACE FUNCTION werdz_fn_api.delete_wb_match(
    _wb_match_id uuid
  )
  RETURNS boolean
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _retval boolean;
  BEGIN
    _retval := werdz_fn.delete_wb_match(
      _wb_match_id
    );
    return _retval;
  end;
  $$;

CREATE OR REPLACE FUNCTION werdz_fn.delete_wb_match(
    _wb_match_id uuid
  )
  RETURNS boolean
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _wb_game werdz.wb_game;
  BEGIN
    delete from werdz.letter_result where wb_round_id in (select id from werdz.wb_round where wb_game_id in (
      (select player_1_offense_game_id from werdz.wb_set where wb_match_id = _wb_match_id)
      union
      (select player_1_offense_game_id from werdz.wb_set where wb_match_id = _wb_match_id)
    ));
    
    delete from werdz.block_result where id in (select id from werdz.wb_round where wb_game_id in (
      (select player_1_offense_game_id from werdz.wb_set where wb_match_id = _wb_match_id)
      union
      (select player_1_offense_game_id from werdz.wb_set where wb_match_id = _wb_match_id)
    ));
    
    delete from werdz.wb_round where wb_game_id in (
      (select player_1_offense_game_id from werdz.wb_set where wb_match_id = _wb_match_id)
      union
      (select player_1_offense_game_id from werdz.wb_set where wb_match_id = _wb_match_id)
    );

    delete from werdz.wb_set where wb_match_id = _wb_match_id;

    delete from werdz.wb_game where id in (
      (select player_1_offense_game_id from werdz.wb_set where wb_match_id = _wb_match_id)
      union
      (select player_1_offense_game_id from werdz.wb_set where wb_match_id = _wb_match_id)
    )
    ;

    delete from werdz.wb_match where id = _wb_match_id;

    return true;
  end;
  $$;

---------------------------------------------- set_current_guess
CREATE OR REPLACE FUNCTION werdz_fn_api.set_current_guess(
    _wb_game_id uuid
    ,_guess text
  )
  RETURNS werdz.wb_game
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _wb_game werdz.wb_game;
  BEGIN
    select * into _wb_game from werdz.wb_game where id = _wb_game_id;
    if auth_ext.resident_id()::uuid != _wb_game.offense_player_resident_id then
      raise exception 'Player is not offense for this game: % %', auth_ext.resident_id(), _wb_game.offense_player_resident_id;
    end if;

    _wb_game := werdz_fn.set_current_guess(
      _wb_game_id
      ,_guess
    );
    return _wb_game;
  end;
  $$;

CREATE OR REPLACE FUNCTION werdz_fn.set_current_guess(
    _wb_game_id uuid
    ,_guess text
  )
  RETURNS werdz.wb_game
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _wb_game werdz.wb_game;
    _wb_round werdz.wb_round;
    _block_result werdz.block_result;
    _letters text[];
  BEGIN    
    -- verify round status
    select * into _wb_round 
    from werdz.wb_round 
    where wb_game_id = _wb_game_id
    and status = 'open';

    if _wb_round.id is null then
      raise exception 'Game has no open round';
    end if;
    -- record guess on the round
    update werdz.wb_round set 
      guess = _guess 
    where id = _wb_round.id
    ;
    -- clear out existing guess results in case word is changing
    delete from werdz.letter_result
    where wb_round_id = _wb_round.id
    ;
    -- add prepared letter results
    with letters as (
      select letter, ordinality
      from unnest(string_to_array(_guess, null)) with ordinality letter
    )
    insert into werdz.letter_result(
      tenant_id
      ,wb_round_id
      ,ordinal
      ,letter
      ,status
    )
    select
      _wb_round.tenant_id
      ,_wb_round.id
      ,l.ordinality
      ,l.letter
      ,'prepared'
    from letters l
    ;    

    select * into _block_result from werdz.block_result where id = _wb_round.id;

    if _block_result.status in ('disabled', 'used', 'passed', 'prepared')
    then
      update werdz.wb_round set
        status = 'closed'
      where id = _wb_round.id
      returning * into _wb_round
      ;

      perform werdz_fn.settle_current_wb_round(_wb_round.id);
    end if;
    select * into _wb_game from werdz.wb_game where id = _wb_game_id;

    return _wb_game;
  end;
  $$;

---------------------------------------------- set_blocking_letter
CREATE OR REPLACE FUNCTION werdz_fn_api.set_blocking_letter(
    _wb_game_id uuid
    ,_blocking_letter character(1)
  )
  RETURNS werdz.wb_game
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _wb_game werdz.wb_game;
  BEGIN
    select * into _wb_game from werdz.wb_game where id = _wb_game_id;
    if auth_ext.resident_id()::uuid != _wb_game.defense_player_resident_id then
      raise exception 'Player is not defense for this game';
    end if;

    _wb_game := werdz_fn.set_blocking_letter(
      _wb_game_id
      ,_blocking_letter
    );
    return _wb_game;
  end;
  $$;

CREATE OR REPLACE FUNCTION werdz_fn.set_blocking_letter(
    _wb_game_id uuid
    ,_blocking_letter character(1)
  )
  RETURNS werdz.wb_game
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _wb_game werdz.wb_game;
    _wb_round werdz.wb_round;
  BEGIN
    -- verify round status
    select * into _wb_round 
    from werdz.wb_round 
    where wb_game_id = _wb_game_id
    and status = 'open';
    if _wb_round.id is null then
      raise exception 'Word Block Game has no open round';
    end if;

    -- record blocking letter on the round
    update werdz.wb_round set 
      blocking_letter = _blocking_letter 
    where id = _wb_round.id
    returning * into _wb_round
    ;
    update werdz.block_result set
      letter = _blocking_letter
      ,status = 'prepared'
    where id = _wb_round.id
    and status = 'planned'
    ;

    -- uncomment this to only allow one block
    -- update werdz.block_result set
    --   letter = _blocking_letter
    --   ,status = 'prepared'
    -- where id in (select id from werdz.wb_round where wb_game_id = _wb_game.id)
    -- and status = 'planned'
    -- ;

    if _wb_round.guess is not null and _wb_round.guess != '' then
      update werdz.wb_round set
        status = 'closed'
      where id = _wb_round.id
      returning * into _wb_round
      ;

      perform werdz_fn.settle_current_wb_round(_wb_round.id);
    end if;
    select * into _wb_game from werdz.wb_game where id = _wb_game_id;

    return _wb_game;
  end;
  $$;

---------------------------------------------- pass_blocking_letter
CREATE OR REPLACE FUNCTION werdz_fn_api.pass_blocking_letter(
    _wb_game_id uuid
  )
  RETURNS werdz.wb_game
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _wb_game werdz.wb_game;
  BEGIN
    select * into _wb_game from werdz.wb_game where id = _wb_game_id;
    if auth_ext.resident_id()::uuid != _wb_game.defense_player_resident_id then
      raise exception 'Player is not defense for this game';
    end if;

    _wb_game := werdz_fn.pass_blocking_letter(_wb_game_id);

    return _wb_game;
  end;
  $$;
CREATE OR REPLACE FUNCTION werdz_fn.pass_blocking_letter(
    _wb_game_id uuid
  )
  RETURNS werdz.wb_game
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _wb_game werdz.wb_game;
    _wb_round werdz.wb_round;
  BEGIN
    -- raise exception 'wtf';
    -- verify round status
    select * into _wb_round 
    from werdz.wb_round 
    where wb_game_id = _wb_game_id
    and status = 'open';
    if _wb_round.id is null then
      raise exception 'Word Block Game has no open round';
    end if;

    -- remove any existing blocking letter result
    delete from werdz.block_result where id = _wb_round.id;
    -- add passed block result
    insert into werdz.block_result(
      id
      ,tenant_id
      ,letter
      ,status
    )
    select
      _wb_round.id
      ,_wb_round.tenant_id
      ,''
      ,'passed'
    ;

    if _wb_round.guess is not null and _wb_round.guess != '' then
      update werdz.wb_round set
        status = 'closed'
      where id = _wb_round.id
      returning * into _wb_round
      ;

      perform werdz_fn.settle_current_wb_round(_wb_round.id);
    end if;

    select * into _wb_game from werdz.wb_game where id = _wb_game_id;
    return _wb_game;
  end;
  $$;

---------------------------------------------- get_random_word
CREATE OR REPLACE FUNCTION werdz_fn.get_random_word(_length integer default null)
  RETURNS text
  LANGUAGE plpgsql
  STABLE
  SECURITY INVOKER
  AS $$
  DECLARE
    _word text;
  BEGIN
    with words as (
      select * from werdz.word w where _length is null or w.length = _length
    )
    SELECT
      w.word into _word
    FROM
      words w 
      OFFSET floor(random() * (SELECT COUNT(*) FROM words))
    LIMIT 1;

    return _word;
  end;
  $$;

---------------------------------------------- wb_game_current_round
-- drop function werdz.wb_game_current_round;
CREATE OR REPLACE FUNCTION werdz.wb_game_current_round(
    _wb_game werdz.wb_game
  )
  RETURNS werdz.wb_round
  LANGUAGE plpgsql
  STABLE
  SECURITY INVOKER
  AS $$
  DECLARE
    _wb_round werdz.wb_round;
  BEGIN
    select *
    into _wb_round
    from werdz.wb_round
    where wb_game_id = _wb_game.id
    and status = 'open'
    ;
    if _wb_round.id is null then
      select *
      into _wb_round
      from werdz.wb_round
      where wb_game_id = _wb_game.id
      and status = 'planned'
      order by round_number
      limit 1
      ;
    end if;
    if _wb_round.id is null then
      select *
      into _wb_round
      from werdz.wb_round
      where wb_game_id = _wb_game.id
      and status = 'closed'
      order by round_number
      limit 1
      ;
    end if;
    if _wb_round.id is null then
      select *
      into _wb_round
      from werdz.wb_round
      where wb_game_id = _wb_game.id
      and status = 'settled'
      order by round_number
      limit 1
      ;
    end if;

    return _wb_round;
  end;
  $$;

-- drop function werdz.wb_game_current_round;
CREATE OR REPLACE FUNCTION werdz.wb_game_used_letters(
    _wb_game werdz.wb_game
  )
  RETURNS setof character(1)
  LANGUAGE plpgsql
  STABLE
  SECURITY INVOKER
  AS $$
  DECLARE
    _wb_round werdz.wb_round;
  BEGIN
    return query
    select distinct l.letter
    from werdz.letter_result l
    join werdz.wb_round r on r.id = l.wb_round_id
    where r.wb_game_id = _wb_game.id
    and l.letter != ' '
    and r.status = 'settled'
    group by l.letter
    order by l.letter
    ;
  end;
  $$;

-- drop function werdz.wb_game_current_round;
CREATE OR REPLACE FUNCTION werdz.wb_game_used_blocking_letters(
    _wb_game werdz.wb_game
  )
  RETURNS setof character(1)
  LANGUAGE plpgsql
  STABLE
  SECURITY INVOKER
  AS $$
  DECLARE
    _wb_round werdz.wb_round;
  BEGIN
    return query
    select distinct l.letter
    from werdz.block_result l
    join werdz.wb_round r on r.id = l.id
    where r.wb_game_id = _wb_game.id
    and l.letter != ' '
    and r.status = 'settled'
    group by l.letter
    order by l.letter
    ;
  end;
  $$;

---------------------------------------------- settle_current_wb_round
CREATE OR REPLACE FUNCTION werdz_fn.settle_current_wb_round(
    _wb_round_id uuid
  )
  RETURNS werdz.wb_round
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _wb_match werdz.wb_match;
    _wb_set werdz.wb_set;
    _wb_set_next werdz.wb_set;
    _wb_game werdz.wb_game;
    _player_1_offense_game werdz.wb_game;
    _player_2_offense_game werdz.wb_game;
    _wb_round werdz.wb_round;
    _block_result werdz.block_result;
    _player_1_score integer;
    _player_2_score integer;
  BEGIN
    -- only closed rounds can be settled
    select * into _wb_round
    from werdz.wb_round 
    where id = _wb_round_id
    ;
    -- raise notice 'SETTLING ROUND: %, %', _wb_round.round_number, _wb_round.status;
    if _wb_round.id is null then
      raise exception 'Game has no closed round';
    end if;

    select * into _block_result from werdz.block_result where id = _wb_round.id;

    select * into _wb_game from werdz.wb_game where id = _wb_round.wb_game_id;
    select * into _wb_set from werdz.wb_set 
      where player_1_offense_game_id = _wb_game.id
      or player_2_offense_game_id = _wb_game.id
    ;
    select * into _wb_match from werdz.wb_match where id = _wb_set.wb_match_id;

    if _wb_round.guess = _wb_game.word then
    -- settle a round with a correct guess
      perform werdz_fn.settle_correct_round(
        _wb_game => _wb_game
        ,_wb_round => _wb_round
        ,_block_result => _block_result
      );
    else
    -- settle a round with an incorrect guess
      perform werdz_fn.settle_incorrect_round(
        _wb_game => _wb_game
        ,_wb_round => _wb_round
        ,_block_result => _block_result
      );
    end if;

    -- move the game forward to the next round, if there is one
    select * into _wb_game from werdz.wb_game where id = _wb_round.wb_game_id;
    if _wb_game.status != 'complete' then
    -- find the next round
      select * into _wb_round
      from werdz.wb_round
      where wb_game_id = _wb_game.id
      and round_number = _wb_round.round_number + 1
      ;

      if _wb_round.id is null then
      -- if there are no more rounds the game is complete
        update werdz.wb_game set 
          status = 'complete' 
        where id = _wb_game.id
        returning * into _wb_game
        ;
      else
      -- update game and round status
        update werdz.wb_game set 
          current_round_number = _wb_round.round_number 
        where id = _wb_game.id
        returning * into _wb_game
        ;
        update werdz.wb_round set
          status = 'open'
        where id = _wb_round.id;
      end if;

    end if;

    ------------------------ set statuses for sets and match
    if 
      'complete' = (select status from werdz.wb_game where id = _wb_set.player_1_offense_game_id)
      and
      'complete' = (select status from werdz.wb_game where id = _wb_set.player_2_offense_game_id)
    then
      -- if all the games for this set are complete, the set is complete
      update werdz.wb_set set status = 'complete' where id = _wb_set.id returning * into _wb_set;

      if 0 = (select count(*) from werdz.wb_set where wb_match_id = _wb_set.wb_match_id and status != 'complete') then
        -- if all sets for this match are complete, the match is complete
        update werdz.wb_match set status = 'complete' where id = _wb_set.wb_match_id returning * into _wb_match;
      else
        -- start the next set
        update werdz.wb_set set status = 'playing' where wb_match_id = _wb_set.wb_match_id and set_number = _wb_set.set_number + 1 returning * into _wb_set_next;
        update werdz.wb_game set status = 'playing' where id in (_wb_set_next.player_1_offense_game_id, _wb_set_next.player_2_offense_game_id);
        update werdz.wb_round set status = 'open' where wb_game_id in (_wb_set_next.player_1_offense_game_id, _wb_set_next.player_2_offense_game_id) and round_number = 1;
      end if;      
    end if;

    -------------------------  compute game, set and match scores
    select * into _player_1_offense_game from werdz.wb_game where id = _wb_set.player_1_offense_game_id;
    select * into _player_2_offense_game from werdz.wb_game where id = _wb_set.player_2_offense_game_id;

    update werdz.wb_game set
      offense_score = (
        select 
        case
          when guessed_round is null then 0
          else 7 - guessed_round
        end 
      )
      ,defense_score = (
        select 
        case
          when blocked_round is null then 0
          else 5 - blocked_round
        end 
      )
    where id = _wb_set.player_1_offense_game_id
    returning * into _player_1_offense_game
    ;

    update werdz.wb_game set
      offense_score = (
        select 
        case
          when guessed_round is null then 0
          else 7 - guessed_round
        end 
      )
      ,defense_score = (
        select 
        case
          when blocked_round is null then 0
          else 5 - blocked_round
        end 
      )
    where id = _wb_set.player_2_offense_game_id
    returning * into _player_2_offense_game
    ;

    -- raise notice '_player_1_offense_game: %  --  %  --  %  --  %  --  %  --  %'
    --   ,_player_1_offense_game.word, _player_1_offense_game.status, _player_1_offense_game.guessed_round, _player_1_offense_game.blocked_round, _player_1_offense_game.offense_score, _player_1_offense_game.defense_score;
    -- raise notice '_player_1_offense_game: %  --  %  --  %  --  %  --  %  --  %'
    --   ,_player_2_offense_game.word, _player_2_offense_game.status, _player_2_offense_game.guessed_round, _player_2_offense_game.blocked_round, _player_2_offense_game.offense_score, _player_2_offense_game.defense_score;
    

    -- raise notice 'p1 score: %, %, %', _player_1_offense_game.word, _player_1_offense_game.offense_score, _player_2_offense_game.defense_score;
    -- raise notice 'p2 score: %, %, %', _player_2_offense_game.word, _player_2_offense_game.offense_score, _player_1_offense_game.defense_score;
    update werdz.wb_set set
      player_1_score = (_player_1_offense_game.offense_score + _player_2_offense_game.defense_score)
      ,player_2_score =  (_player_2_offense_game.offense_score + _player_1_offense_game.defense_score)
    where id = _wb_set.id
    returning * into _wb_set
    ;

    -- match
    if _player_1_offense_game.status = 'complete' and _player_2_offense_game.status = 'complete' then
      update werdz.wb_match set
        player_1_set_score = (
          select coalesce(count(*),0) from werdz.wb_set where wb_match_id = _wb_match.id and player_1_score > player_2_score
        )      
        ,player_1_total_score = (
          select coalesce(sum(player_1_score),0) from werdz.wb_set where wb_match_id = _wb_match.id
        )      
        ,player_2_set_score = (
          select coalesce(count(*),0) from werdz.wb_set where wb_match_id = _wb_match.id and player_2_score > player_1_score
        )      
        ,player_2_total_score = (
          select coalesce(sum(player_2_score),0) from werdz.wb_set where wb_match_id = _wb_match.id
        )      
      where id = _wb_match.id
      ;
    end if;

    select * into _wb_round from werdz.wb_round where id = _wb_round_id;
    return _wb_round;
  end;
  $$;


CREATE OR REPLACE FUNCTION werdz_fn.settle_correct_round(
    _wb_game werdz.wb_game,
    _wb_round werdz.wb_round,
    _block_result werdz.block_result
  )
    RETURNS werdz.wb_game
    LANGUAGE plpgsql
    VOLATILE
    SECURITY INVOKER
    AS $$
    DECLARE
      _letter_result werdz.letter_result;
      _letter_status werdz.wb_letter_status;
      _block_status werdz.wb_block_status;
      _is_blocked boolean;
    BEGIN

        -- start by setting all letter results to correct
        -- if one is blocked, it will be changed back later
        update werdz.letter_result set
          status = 'correct'
        where wb_round_id = _wb_round.id
        ;

        _is_blocked = (_block_result.status = 'prepared') and (position(_block_result.letter in _wb_round.guess) > 0);

        if _is_blocked then
          -- correct word but it was blocked.  we set:
          -- the letter result to 'blocked'
          -- the block result to 'blocked
          -- all subsequent block results to 'used'
          -- current round to 'settled'

          update werdz.letter_result set
            status = 'blocked'
          where wb_round_id = _wb_round.id
          and letter = _block_result.letter
          ;

          update werdz.block_result set
            status = 'blocked'
          where id = _block_result.id
          ;

          -- update werdz.block_result set
          --   status = 'used'
          -- where id in (
          --   select id from werdz.wb_round 
          --   where wb_game_id = _wb_game.id 
          --   and round_number > _wb_round.round_number
          -- )
          -- and status != 'disabled'
          -- ;

          update werdz.wb_round set
            status = 'settled'
          where id = _wb_round.id
          ;

          update werdz.wb_game set
            blocked_round = _wb_round.round_number
          where id = _wb_round.wb_game_id
          ;

        else
          -- correct word, no blockers set:
          -- current block result to 'missed'
          -- subsequent letter results to 'surplus'
          -- subsequent block results to 'surplus'
          -- current round to 'settled'
          -- current game to 'complete'

          update werdz.block_result set
            status = case 
              when _block_result.status = 'prepared' then
                'missed'
              else
                _block_result.status
            end
          where id = _block_result.id
          ;

          update werdz.letter_result set
            status = 'surplus'
          where wb_round_id in (
            select id from werdz.wb_round 
            where wb_game_id = _wb_round.wb_game_id
            and round_number > _wb_round.round_number
            and status = 'planned'      
          )
          ;          
          update werdz.block_result set
            status = 'surplus'
          where id in (
            select id from werdz.wb_round 
            where wb_game_id = _wb_round.wb_game_id
            and round_number > _wb_round.round_number
            and status = 'planned'      
          )
          and status != 'disabled'
          ;          
          update werdz.wb_round set
            status = 'surplus'
          where wb_game_id = _wb_game.id
          and round_number > _wb_round.round_number
          and status = 'planned'
          ;

          update werdz.wb_round set
            status = 'settled'
          where id = _wb_round.id
          ;

          update werdz.wb_game set
            status = 'complete'
            ,guessed_round = _wb_round.round_number
          where id = _wb_game.id
          returning * into _wb_game
          ;
        end if;


      return _wb_game;
    end;
    $$;


CREATE OR REPLACE FUNCTION werdz_fn.settle_incorrect_round(
    _wb_game werdz.wb_game,
    _wb_round werdz.wb_round,
    _block_result werdz.block_result
  )
  RETURNS werdz.wb_game
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _letter_result werdz.letter_result;
    _letter_status werdz.wb_letter_status;
    _block_status werdz.wb_block_status;
    _is_correct boolean;
    _is_misplaced boolean;
    _is_absent boolean;
    _is_blocked boolean;
  BEGIN
    if _block_result.status in ('prepared') then 
      _block_status = 'missed';
    else 
      _block_status = _block_result.status;
    end if;
    -- check every letter for it's state
    for _letter_result in
      select * from werdz.letter_result where wb_round_id = _wb_round.id order by ordinal asc
    loop
      _is_correct = (select substring(_wb_game.word from _letter_result.ordinal for 1) = _letter_result.letter);
      _is_misplaced = (select position(_letter_result.letter in _wb_game.word) > 0 and _is_correct = false);
      _is_absent = (select position(_letter_result.letter in _wb_game.word) = 0);
      -- _is_blocked = (_is_correct or _is_misplaced) and (_block_result.letter = _letter_result.letter) and (_block_status = 'missed');
      _is_blocked = (_is_correct) and (_block_result.letter = _letter_result.letter) and (_block_status = 'missed');

      -- do it here
      -- if (_letter_result.letter = 'u') then
      --   raise exception '% % % % % % % %: ', _wb_game.word, _wb_round.guess, _letter_result.letter, _block_result.letter, _is_correct, _is_misplaced, _is_absent, _is_blocked;
      -- end if;

      if _is_absent then
        _letter_status = 'absent';
      elsif _is_blocked then
        _letter_status = 'blocked';
        _block_status = 'blocked';
      elsif _is_misplaced then
        _letter_status = 'misplaced';
      elsif _is_correct then
        _letter_status = 'correct';
      else
        raise exception 'INVALID STATE -- game_id: %', _wb_game.id;
      end if;

      update werdz.letter_result set
        status = _letter_status
      where id = _letter_result.id
      ;
    end loop;
    -- raise exception 'blah: %', _block_status;
    -- update the current block result 
    update werdz.block_result set
      status = _block_status
    where id = _block_result.id
    returning * into _block_result
    ;

    -- subsequent block results will now be marked as used if the current block was successful
    if _block_result.status = 'blocked' then
      -- update werdz.block_result set
      --   status = 'used'
      -- where id in (
      --   select id from werdz.wb_round 
      --   where wb_game_id = _wb_game.id 
      --   and round_number > _wb_round.round_number
      -- )
      -- and status != 'disabled'
      -- ;
    end if;

    -- mark the current round as settled
    update werdz.wb_round set
      status = 'settled'
    where id = _wb_round.id
    ;

    return _wb_game;
  end;
  $$;
















  -------------------------------------------------------------------------------- werdz-functions



----------------------------------- handle_update_profile ---  NO API
-- create or replace function werdz_fn.handle_update_profile()
--   returns trigger
--   language plpgsql
--   security definer
--   as $$
--   DECLARE
--     _claims jsonb;
--   begin
--     update werdz.werdz_resident set
--       display_name = new.display_name
--     where resident_id in (
--       select id from app.resident where profile_id = new.id
--     );

--     return new;
--   end;
--   $$;
--   -- trigger the function every time a user is created
-- create or replace trigger werdz_on_app_profile_updated
--   after update on app.profile
--   for each row execute procedure werdz_fn.handle_update_profile();

-------------------------------------- ensure_werdz_resident
-- CREATE OR REPLACE FUNCTION werdz_fn.ensure_werdz_resident(
--     _resident_id uuid
--   ) RETURNS werdz.werdz_resident
--     LANGUAGE plpgsql VOLATILE SECURITY DEFINER
--     AS $$
--   DECLARE
--     _werdz_tenant werdz.werdz_tenant;
--     _werdz_resident werdz.werdz_resident;
--   BEGIN
--     -- ensure that the resident has a werdz_resident and werdz_tenant.  add them if not.
--     select mt.* 
--     into _werdz_tenant 
--     from werdz.werdz_tenant mt 
--     join app.resident aut on mt.tenant_id = aut.tenant_id and aut.id = _resident_id
--     ;

--     if _werdz_tenant.tenant_id is null then
--       insert into werdz.werdz_tenant(tenant_id, name)
--         select tenant_id, tenant_name
--         from app.resident 
--         where id = _resident_id
--       returning * into _werdz_tenant;
--     end if;

--     select * into _werdz_resident from werdz.werdz_resident where resident_id = _resident_id;
--     if _werdz_resident.resident_id is null then
--       insert into werdz.werdz_resident(resident_id, display_name, tenant_id)
--         select id, display_name, tenant_id
--         from app.resident 
--         where id = _resident_id 
--       returning * into _werdz_resident;
--     end if;
--     return _werdz_resident;
--   end;
--   $$;