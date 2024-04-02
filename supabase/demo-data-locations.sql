\x on
\pset pager off

-- -------------------------------  DEMO LOCATIONS
    DO $$
    DECLARE
      _i integer;
      _j integer;
      _tenant_name citext;
      _tenant_identifier citext;
      _users jsonb;
      _user_info jsonb;
      _address jsonb;
      _tenant app.tenant;
      _min_lat numeric(20,14);
      _max_lat numeric(20,14);
      _min_lon numeric(20,14);
      _max_lon numeric(20,14);
      _lat numeric(20,14);
      _lon numeric(20,14);
      _location loc.location;
      -- _incident inc.incident;
      _todo todo.todo;
    BEGIN
      -- roughly the seattle area --
      _max_lat := 47.66538735632654;
      _min_lat := 47.523692641902485;
      _max_lon := -122.38632202148439;
      _min_lon := -122.27920532226564;

      for _tenant in select * from app.tenant loop
        _users := (to_json(http_get('https://random-data-api.com/api/v2/users?size=50&response_type=json'))->>'content')::jsonb;
        for _i in 0..4 loop
            _address := _users->_i->'address';
  
            _lat = ((random()+_i/1e39)*(_max_lat-_min_lat))+_min_lat;
            _lon = ((random()+_i/1e39)*(_max_lon-_min_lon))+_min_lon;

            _location := loc_fn.create_location(
              _resident_id => (select id from app.resident where tenant_id = _tenant.id order by random() limit 1)
              ,_location_info => row(
                null,
                _address->>'street_name',
                _address->>'street_address',
                null,
                _address->>'city',
                _address->>'state',
                _address->>'zip_code',
                _address->>'country',
                _lat::citext,
                _lon::citext
              )::loc_fn.location_info
            );

        end loop;
      end loop;
    END $$;
