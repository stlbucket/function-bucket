----------------------------------- handle_update_profile ---  NO API
create or replace function msg_fn.handle_update_profile()
  returns trigger
  language plpgsql
  security definer
  as $$
  DECLARE
    _claims jsonb;
  begin
    update msg.msg_resident set
      display_name = new.display_name
    where resident_id in (
      select id from app.resident where profile_id = new.id
    );

    return new;
  end;
  $$;
  -- trigger the function every time a user is created
create or replace trigger msg_on_app_profile_updated
  after update on app.profile
  for each row execute procedure msg_fn.handle_update_profile();
-------------------------------------- ensure_msg_resident
CREATE OR REPLACE FUNCTION msg_fn.ensure_msg_resident(
    _resident_id uuid
  ) RETURNS msg.msg_resident
    LANGUAGE plpgsql VOLATILE SECURITY DEFINER
    AS $$
  DECLARE
    _msg_tenant msg.msg_tenant;
    _msg_resident msg.msg_resident;
  BEGIN
    -- ensure that the resident has a msg_resident and msg_tenant.  add them if not.
    select mt.* 
    into _msg_tenant 
    from msg.msg_tenant mt 
    join app.resident aut on mt.tenant_id = aut.tenant_id and aut.id = _resident_id
    ;

    if _msg_tenant.tenant_id is null then
      insert into msg.msg_tenant(tenant_id, name)
        select tenant_id, tenant_name
        from app.resident 
        where id = _resident_id
      returning * into _msg_tenant;
    end if;
-- raise exception '_msg_tenant: %', _msg_tenant;

    select * into _msg_resident from msg.msg_resident where resident_id = _resident_id;
    if _msg_resident.resident_id is null then
-- raise exception '_msg_resident: %', _msg_resident;

      insert into msg.msg_resident(resident_id, display_name, tenant_id)
        select id, display_name, tenant_id
        from app.resident 
        where id = _resident_id 
      returning * into _msg_resident;
    end if;
    return _msg_resident;
  end;
  $$;

-------------------------------------- upsert_topic
CREATE OR REPLACE FUNCTION msg_api.upsert_topic(
    _topic_info msg_fn.topic_info
  ) RETURNS msg.topic
    LANGUAGE plpgsql VOLATILE
    AS $$
  DECLARE
    _topic msg.topic;
  BEGIN
    perform auth_ext.enforce_permission('p:discussions');

    _topic := msg_fn.upsert_topic(
      _topic_info
      ,auth_ext.resident_id()
    );
    return _topic;
  end;
  $$;

CREATE OR REPLACE FUNCTION msg_fn.upsert_topic(
    _topic_info msg_fn.topic_info
    ,_resident_id uuid
  ) RETURNS msg.topic
    LANGUAGE plpgsql VOLATILE
    AS $$
  DECLARE
    _msg_resident msg.msg_resident;
    _topic msg.topic;
    _topic_id uuid;
  BEGIN
    _msg_resident := msg_fn.ensure_msg_resident(_resident_id);

    _topic_id = coalesce(_topic_info.id, gen_random_uuid());
    select *
      into _topic
    from msg.topic
    where (id = _topic_id or identifier = _topic_info.identifier)
    and tenant_id = _msg_resident.tenant_id
    ;

    if _topic.id is not null then
      update msg.topic set
        name = _topic_info.name
      where id = _topic_id
      ;
    else
      insert into msg.topic(
        id
        ,tenant_id
        ,name
        ,identifier
        ,status
      )
      select
        _topic_id
        ,_msg_resident.tenant_id
        ,_topic_info.name
        ,_topic_info.identifier
        ,coalesce(_topic_info.status, 'open')
      returning *
      into _topic
      ;
    end if;

    return _topic;
  end;
  $$;
-------------------------------------- upsert_message
CREATE OR REPLACE FUNCTION msg_api.upsert_message(
    _message_info msg_fn.message_info
  ) RETURNS msg.message
    LANGUAGE plpgsql VOLATILE
    AS $$
  DECLARE
    _message msg.message;
  BEGIN
    perform auth_ext.enforce_permission('p:discussions');
    _message := msg_fn.upsert_message(
      _message_info
      ,auth_ext.resident_id()
    );
    return _message;
  end;
  $$;

CREATE OR REPLACE FUNCTION msg_fn.upsert_message(
    _message_info msg_fn.message_info
    ,_resident_id uuid
  ) RETURNS msg.message
    LANGUAGE plpgsql VOLATILE
    AS $$
  DECLARE
    _msg_resident msg.msg_resident;
    _topic msg.topic;
    _message msg.message;
    _subscriber msg.subscriber;
  BEGIN
    _msg_resident := msg_fn.ensure_msg_resident(_resident_id);

    select * 
    into _topic 
    from msg.topic 
    where _message_info.topic_id is not null 
    and id = _message_info.topic_id;

    _subscriber := msg_fn.upsert_subscriber(row(
      _topic.id
      ,_msg_resident.resident_id
    ));

    if _topic.id is null then
      _topic := msg_fn.upsert_topic(
        row(
          null::uuid
          ,case
            when length(_message_info.content > 100) then substring(_message_info.content from 0 for 100)::citext
            else _message_info.content
          end 
          ,null::citext
          ,'open'::msg.topic_status
        )
        ,_msg_resident.resident_id
      );
    end if;

    select * into _message from msg.message where id = _message_info.id;

    if _message.id is not null then
      update msg.message set
        content = _message_info.content
        ,tags = coalesce(_message_info.tags, '{}')
      where id = _message.id
      ;
    else
      insert into msg.message(
        tenant_id
        ,topic_id
        ,posted_by_msg_resident_id
        ,content
        ,tags
      )
      select
        _topic.tenant_id
        ,_message_info.topic_id
        ,_msg_resident.resident_id
        ,_message_info.content
        ,coalesce(_message_info.tags, '{}')
      returning *
      into _message
      ;
    end if;

    -- NOTIFY 'topic:'||_topic.id||':message', '{"event": "upsert", "sub": '||_topic.id||', "id": '||_message.id||'}';
    
    return _message;
  end;
  $$;
-------------------------------------- upsert_subscriber
CREATE OR REPLACE FUNCTION msg_api.upsert_subscriber(
    _subscriber_info msg_fn.subscriber_info
  ) RETURNS msg.subscriber
    LANGUAGE plpgsql VOLATILE
    AS $$
  DECLARE
    _subscriber msg.subscriber;
  BEGIN
    perform auth_ext.enforce_permission('p:discussions');

    _subscriber := msg_fn.upsert_subscriber(
      _subscriber_info
    );
    return _subscriber;
  end;
  $$;

CREATE OR REPLACE FUNCTION msg_fn.upsert_subscriber(
    _subscriber_info msg_fn.subscriber_info
  ) RETURNS msg.subscriber
    LANGUAGE plpgsql VOLATILE
    AS $$
  DECLARE
    _topic msg.topic;
    _subscriber msg.subscriber;
    _msg_resident msg.msg_resident;
  BEGIN
    _msg_resident := msg_fn.ensure_msg_resident(_subscriber_info.msg_resident_id);

    select *
    into _topic
    from msg.topic
    where id = _subscriber_info.topic_id
    ;
    if _topic.id is null then
      raise exception 'no topic for id: %', _subscriber_info.topic_id;
    end if;

    select * into _subscriber
    from msg.subscriber
    where topic_id = _subscriber_info.topic_id
    and msg_resident_id = _subscriber_info.msg_resident_id
    ;

    if _subscriber.id is not null then
      update msg.subscriber set
        status = 'active'
      where id = _subscriber.id
      ;
    else
      insert into msg.subscriber(
        tenant_id
        ,topic_id
        ,msg_resident_id
      )
      select
        _topic.tenant_id
        ,_topic.id
        ,_subscriber_info.msg_resident_id
      returning *
      into _subscriber
      ;
    end if;

    return _subscriber;
  end;
  $$;
-------------------------------------- upsert_subscriber
CREATE OR REPLACE FUNCTION msg_api.deactivate_subscriber(
    _subscriber_id uuid
  ) RETURNS msg.subscriber
    LANGUAGE plpgsql VOLATILE
    AS $$
  DECLARE
    _subscriber msg.subscriber;
  BEGIN
    perform auth_ext.enforce_permission('p:discussions');

    _subscriber := msg_fn.deactivate_subscriber(
      _subscriber_id
    );
    return _subscriber;
  end;
  $$;

CREATE OR REPLACE FUNCTION msg_fn.deactivate_subscriber(
    _subscriber_id uuid
  ) RETURNS msg.subscriber
    LANGUAGE plpgsql VOLATILE
    AS $$
  DECLARE
    _subscriber msg.subscriber;
  BEGIN
    update msg.subscriber set
      status = 'inactive'
    where id = _subscriber_id
    returning *
    into _subscriber
    ;

    return _subscriber;
  end;
  $$;
---------------------------------------------- delete_topic
CREATE OR REPLACE FUNCTION msg_api.delete_topic(_topic_id uuid)
  RETURNS boolean
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
    _retval boolean;
  BEGIN
    _retval := msg_fn.delete_topic(_topic_id);
    return _retval;
  end;
  $$;

CREATE OR REPLACE FUNCTION msg_fn.delete_topic(_topic_id uuid)
  RETURNS boolean
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $$
  DECLARE
  BEGIN
    delete from msg.message where _topic_id = _topic_id;
    delete from msg.subscriber where topic_id = _topic_id;
    delete from msg.topic where id = _topic_id;
    return true;
  end;
  $$;


CREATE OR REPLACE FUNCTION app_fn.tg__graphql_subscription() RETURNS trigger
    LANGUAGE plpgsql
    AS $_$
declare
  v_process_new bool = (TG_OP = 'INSERT' OR TG_OP = 'UPDATE');
  v_process_old bool = (TG_OP = 'UPDATE' OR TG_OP = 'DELETE');
  v_event text = TG_ARGV[0];
  v_topic_template text = TG_ARGV[1];
  v_attribute text = TG_ARGV[2];
  v_record record;
  v_sub text;
  v_topic text;
  v_i int = 0;
  v_last_topic text;
begin
  for v_i in 0..1 loop
    if (v_i = 0) and v_process_new is true then
      v_record = new;
    elsif (v_i = 1) and v_process_old is true then
      v_record = old;
    else
      continue;
    end if;
     if v_attribute is not null then
      execute 'select $1.' || quote_ident(v_attribute)
        using v_record
        into v_sub;
    end if;
    if v_sub is not null then
      v_topic = replace(v_topic_template, '$1', v_sub);
    else
      v_topic = v_topic_template;
    end if;
    if v_topic is distinct from v_last_topic then
      -- This if statement prevents us from triggering the same notification twice
      v_last_topic = v_topic;

      perform pg_notify(v_topic, json_build_object(
        'event', v_event,
        'subject', v_sub,
        'id', v_record.id
      )::text);
    end if;
  end loop;
  return v_record;
end;
$_$;

CREATE OR REPLACE TRIGGER _500_gql_insert
  AFTER INSERT ON msg.message
  FOR EACH ROW
  EXECUTE FUNCTION app_fn.tg__graphql_subscription(
    'create', -- the "event" string, useful for the client to know what happened
    'topic:$1:message', -- the "topic" the event will be published to, as a template
    'topic_id' -- If specified, `$1` above will be replaced with NEW.topic_id or OLD.topic_id from the trigger.
  );
