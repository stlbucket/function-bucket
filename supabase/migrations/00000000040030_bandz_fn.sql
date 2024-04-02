
-----------------------------------------------
-- script bandz_fn and bandz_api schema functions
-----------------------------------------------
----------------------------------- install_bandz_application
CREATE OR REPLACE FUNCTION bandz_fn.install_bandz_application()
  RETURNS app.application
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $function$
  DECLARE
    _application app.application;
  BEGIN
    _application := app_fn.install_basic_application(
      _key => 'bandz'
      ,_name => 'Bandz'
      ,_description => 'A custom app for managing bands.'
      ,_auto_subscribe => false
    );
    return _application;
  end;
  $function$
  ;

