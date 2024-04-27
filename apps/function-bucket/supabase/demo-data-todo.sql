\x on
\pset pager off

------------------------------- TODO DEMO DATA
      select todo_fn.create_todo(
        _resident_id => (select id from app.resident where tenant_id = l.tenant_id order by random() limit 1)
        ,_name => ('Trash Pickup '||l.name)::citext
        ,_options => row(
          'picking up trash'::citext
          ,null
          ,'{}'::citext[]
          ,false
          ,row(
            l.id,
            '',
            '',
            null,
            null,
            null,
            null,
            null,
            null,
            null
          )::loc_fn.location_info
        )::todo_fn.create_todo_options
      ) 
      from loc.location l
      ;

      select todo_fn.create_todo(
        _resident_id => resident_id::uuid
        ,_name => 'Get Supplies'::citext
        ,_options => row(
          'get-supplies'::citext
          ,id::uuid
          ,'{}'::citext[]
          ,false
          ,null
        )::todo_fn.create_todo_options
      ) from todo.todo
      where description = 'picking up trash'::citext
      ;
        select todo_fn.create_todo(
          _resident_id => resident_id::uuid
          ,_name => 'Trash Bags'::citext
          ,_options => row(
            ''::citext
            ,id::uuid
            ,'{}'::citext[]
            ,false
            ,null
          )::todo_fn.create_todo_options
        ) from todo.todo
        where description = 'get-supplies'::citext
        ;
        select todo_fn.create_todo(
          _resident_id => resident_id::uuid
          ,_name => 'Gloves'::citext
          ,_options => row(
            ''::citext
            ,id::uuid
            ,'{}'::citext[]
            ,false
            ,null
          )::todo_fn.create_todo_options
        ) from todo.todo
        where description = 'get-supplies'::citext
        ;
        select todo_fn.create_todo(
          _resident_id => resident_id::uuid
          ,_name => 'Beer'::citext
          ,_options => row(
            'get-beer'::citext
            ,id::uuid
            ,'{}'::citext[]
            ,false
            ,null
          )::todo_fn.create_todo_options
        ) from todo.todo
        where description = 'get-supplies'::citext
        ;
          select todo_fn.create_todo(
            _resident_id => resident_id::uuid
            ,_name => 'Ranier'::citext
            ,_options => row(
              'good beer'::citext
              ,id::uuid
              ,'{}'::citext[]
              ,false
              ,null
            )::todo_fn.create_todo_options
          ) from todo.todo
          where description = 'get-beer'::citext
          ;
          select todo_fn.create_todo(
            _resident_id => resident_id::uuid
            ,_name => 'Coors'::citext
            ,_options => row(
              'bad beer'::citext
              ,id::uuid
              ,'{}'::citext[]
              ,false
              ,null
            )::todo_fn.create_todo_options
          ) from todo.todo
          where description = 'get-beer'::citext
          ;

      select todo_fn.create_todo(
        _resident_id => resident_id::uuid
        ,_name => 'Schedule dumpster'::citext
        ,_options => row(
          'dumpster'::citext
          ,id::uuid
          ,'{}'::citext[]
          ,false
          ,null
        )::todo_fn.create_todo_options
      ) from todo.todo
      where description = 'picking up trash'::citext
      ;
        select todo_fn.create_todo(
          _resident_id => resident_id::uuid
          ,_name => 'Call trash company'::citext
          ,_options => row(
            '555.555.5555'::citext
            ,id::uuid
            ,'{}'::citext[]
            ,false
            ,null
          )::todo_fn.create_todo_options
        ) from todo.todo
        where description = 'dumpster'::citext
        ;
        select todo_fn.create_todo(
          _resident_id => resident_id::uuid
          ,_name => 'Call city for permission'::citext
          ,_options => row(
            '555.555.5555'::citext
            ,id::uuid
            ,'{}'::citext[]
            ,false
            ,null
          )::todo_fn.create_todo_options
        ) from todo.todo
        where description = 'dumpster'::citext
        ;

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
