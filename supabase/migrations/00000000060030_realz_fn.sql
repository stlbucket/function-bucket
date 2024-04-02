
-----------------------------------------------
-- script realz_fn and realz_api schema functions
-----------------------------------------------
----------------------------------- install_realz_application
CREATE OR REPLACE FUNCTION realz_fn.install_realz_application()
  RETURNS app.application
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $function$
  DECLARE
    _application app.application;
  BEGIN
    _application := app_fn.install_basic_application(
      _key => 'realz'
      ,_name => 'Realz'
      ,_description => 'Custom tools for real estate sales.'
      ,_auto_subscribe => false
    );
    return _application;
  end;
  $function$
  ;

