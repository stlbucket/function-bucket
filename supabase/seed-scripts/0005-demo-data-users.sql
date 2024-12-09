begin;
 with usrs(email,first_name,last_name,phone) as (
  values
  ('stlbucket@gmail.com', 'Kevin', 'Burkett', '206.660.6219')
)
  INSERT INTO
    auth.users (
      email
      ,phone
      ,encrypted_password
      ,instance_id
      ,id
      ,aud
      ,role
      ,email_confirmed_at
      ,recovery_sent_at
      ,last_sign_in_at
      ,raw_app_meta_data
      ,raw_user_meta_data
      ,created_at
      ,updated_at
      ,confirmation_token
      ,email_change
      ,email_change_token_new
      ,recovery_token
    )
    select
      email, phone, crypt ('poiuytre', gen_salt ('bf'))
      ,'00000000-0000-0000-0000-000000000000', uuid_generate_v4 (), 'authenticated', 'authenticated'
      ,current_timestamp, current_timestamp, current_timestamp
      ,'{"provider":"email","providers":["email"]}'
      ,'{}'
      , current_timestamp, current_timestamp, '', '', '', ''
    from usrs
    ;

    INSERT INTO
    auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at) (
      select uuid_generate_v4(), id, id, format('{"sub":"%s","email":"%s"}', id::text, email)::jsonb, 'email', current_timestamp, current_timestamp, current_timestamp
      from auth.users
      where email in (
        select email from auth.users where id not in (select user_id from auth.identities)
      )
    );

 with usrs(email,first_name,last_name,phone) as (
  values
  ('stlbucket@gmail.com', 'Kevin', 'Burkett', '206.660.6219')
)
update app.profile p set
  first_name = u.first_name
  ,last_name = u.last_name
  ,phone = u.phone
from usrs u
where u.email = p.email
;
commit;