
-----------------------------------------------
-- script gearz_fn and gearz_api schema functions
-----------------------------------------------
----------------------------------- install_gearz_application
CREATE OR REPLACE FUNCTION gearz_fn.install_gearz_application()
  RETURNS app.application
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $function$
  DECLARE
    _application app.application;
  BEGIN
    _application := app_fn.install_basic_application(
      _key => 'gearz'
      ,_name => 'Gearz'
      ,_description => 'An app to manage music gear rentals.'
      ,_auto_subscribe => false
    );
    return _application;
  end;
  $function$
  ;

