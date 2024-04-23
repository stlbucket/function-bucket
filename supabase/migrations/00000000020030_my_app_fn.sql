
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
      ,_modules => array[
        row(
          'my-module'::citext
          ,'My Module'::citext
          ,'{"p:my-app","p:my-app-admin"}'::citext[]
          ,null::citext
          ,array[
            row(
              'my-tool'::citext
              ,'My Tool'::citext
              ,'{"p:my-app","p:my-app-admin"}'::citext[]
              ,null::citext
              ,'/my-app/my-tool'
            )::app_fn.tool_info
          ]::app_fn.tool_info[]
        )::app_fn.module_info
        ,row(
          'my-module-admin'::citext
          ,'My Module Admin'::citext
          ,'{"p:my-app-admin"}'::citext[]
          ,null::citext
          ,array[
            row(
              'my-tool-admin'::citext
              ,'My Tool Admin'::citext
              ,'{"p:my-app-admin"}'::citext[]
              ,null::citext
              ,'/my-app-admin/my-tool-admin'
            )::app_fn.tool_info
          ]::app_fn.tool_info[]
        )::app_fn.module_info
      ]::app_fn.module_info[]
    );
    return _application;
  end;
  $function$
  ;

