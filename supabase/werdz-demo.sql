select 
  id
  ,profile_id
  ,tenant_name
  ,display_name
  ,status
  ,type
from app.resident;


select 
  werdz_fn.get_random_word(2),
  werdz_fn.get_random_word(3),
  werdz_fn.get_random_word(4),
  werdz_fn.get_random_word(5),
  werdz_fn.get_random_word(6),
  werdz_fn.get_random_word(7),
  werdz_fn.get_random_word();

begin;
select werdz_fn.delete_game(id) from werdz.wb_game;

-- with defender as (
--   select * from app.resident where display_name = 'bucket'
-- )
-- select jsonb_pretty(to_jsonb(werdz_fn.create_wb_game(
--   _options => row(
--     null
--     ,d.id
--     ,null
--     ,null
--     ,null
--     ,null
--   )
--   ,_resident_id => r.id
-- )))
-- from app.resident r, defender d 
-- where r.display_name != 'bucket' 
-- limit 1
-- ;

with offender as (
  select * 
  from app.resident 
  where display_name = 'bucket' 
  and tenant_id = (select id from app.tenant where identifier = 'bucket-of-games')
)
select jsonb_pretty(to_jsonb(werdz_fn.create_wb_game(
  _tenant_id => (select id from app.tenant where identifier = 'bucket-of-games')
  ,_options => row(
    d.id
    -- ,d.id
    ,(select id from app.resident where display_name = 'bucket' and tenant_id = (select id from app.tenant where identifier = 'bucket-of-games'))
    ,null
    ,null
    ,null
    ,null
    ,null
  )
  ,_resident_id => r.id
)))
from app.resident r, offender d 
where r.display_name = 'bucket' 
and r.tenant_id = (select id from app.tenant where identifier = 'bucket-of-games')
;

commit;
