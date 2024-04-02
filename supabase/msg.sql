begin;

select count(*) from msg.subscriber;
select count(*) from msg.message;

select distinct tenant_id, count(*) from msg.topic group by tenant_id;
select distinct tenant_id, count(*) from msg.msg_resident group by tenant_id;

-- create table msg.quote (
--   content citext
--   ,used boolean not null default false
-- );

-- select count(*) from msg.quote;

    -- DO $$
    -- DECLARE
    --   _i integer;
    --   _j integer;
    --   _chunk_size integer := 50;
    --   _chunk_count integer := 11;
    --   _quote_json jsonb;
    --   _quote citext;
    -- BEGIN
    --   for _i in 0.._chunk_count loop
    --     select (to_json(http_get('https://api.quotable.io/quote/random?limit='||_chunk_size))) into _quote_json;
    --     raise notice 'chunk: %', _i;
    --     for _j in 0.._chunk_size - 1
    --     loop
    --       select ((_quote_json->>'content')::jsonb)->_j->>'content' into _quote;
    --       raise notice '%', _quote;
    --       insert into msg.quote (content) values (_quote);
    --     end loop;
    --   end loop;

    -- END $$;
-- select count(*) from msg.quote;


    DO $$
      BEGIN
        perform msg_fn.upsert_subscriber(
          row(
            t.id
            ,mu.resident_id
          )
        )
        from msg.topic t
        join msg.msg_resident mu on mu.tenant_id = t.tenant_id
        ;
    END $$;

    DO $$
      DECLARE
        _i integer := 0;
        _chunk_size integer := 30;
        _subscriber msg.subscriber;
        _quote citext;
        _quote_json jsonb;
      BEGIN
        select (to_json(http_get('https://api.quotable.io/quotes/random?limit='||_chunk_size))) into _quote_json;

        for _subscriber in
          select * from msg.subscriber
        loop
          raise notice 'i: %', _i;
          select (((_quote_json->>'content')::jsonb)->_i->>'content')::citext into _quote;
          raise notice 'quote: %', _quote;

          perform msg_fn.upsert_message(
            row(
              null
              ,_subscriber.topic_id
              ,_quote::citext
              ,null
            )
            ,_subscriber.msg_resident_id
          )
          ;

          _i := _i + 1;
          if _i = _chunk_size then _i = 0; end if;
        end loop;
      END $$;

select count(*) from msg.subscriber;
select count(*) from msg.message;

commit;