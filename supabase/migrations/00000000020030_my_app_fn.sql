
-----------------------------------------------
-- script my_app_fn and my_app_api schema functions
-----------------------------------------------
----------------------------------- install_my_app_application
CREATE OR REPLACE FUNCTION my_app_fn.install_my_app_application()
  RETURNS app.application
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $function$
  DECLARE
    _application app.application;
  BEGIN
    _application := app_fn.install_basic_application(
      _key => 'my_app'
      ,_name => 'my_app'
      ,_description => 'A custom app for me.'
      ,_auto_subscribe => false
    );
    return _application;
  end;
  $function$
  ;

