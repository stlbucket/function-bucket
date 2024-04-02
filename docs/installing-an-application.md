# Installing an application
To add an application to the platform, you call ```app_fn.install_application```.

This will handle setting up all the proper records to drive the rest of the app.

CRUD functionality to tweak any of this could be added later.

License-packs would be a prime candidate for this treatment.
``` sql
CREATE OR REPLACE FUNCTION inc_fn.install_incidents_application()
  RETURNS app.application
  LANGUAGE plpgsql
  VOLATILE
  SECURITY INVOKER
  AS $function$
  DECLARE
    _application app.application;
  BEGIN
    _application := app_fn.install_application(
      _application_info => row(
        'inc'::citext
        ,'Incidents'::citext
        ,array[
          row(
            'incidents-user'::citext
            ,'Incidents User'::citext
            ,'{"p:incidents"}'::citext[]
            ,'user'::app.license_type_assignment_scope
          )::app_fn.license_type_info
          ,row(
            'incidents-admin'::citext
            ,'Incidents Admin'::citext
            ,'{"p:incidents","p:incidents-admin"}'::citext[]
            ,'admin'::app.license_type_assignment_scope
          )::app_fn.license_type_info
        ]::app_fn.license_type_info[]
        ,array[
          row(
            'inc'::citext
            ,'Incidents'::citext
            ,array[
              row(
                'incidents-user'::citext
                ,0::integer
                ,'none'::app.expiration_interval_type
                ,0::integer
              )::app_fn.license_pack_license_type_info
              ,row(
                'incidents-admin'::citext
                ,0::integer
                ,'none'::app.expiration_interval_type
                ,0::integer
              )::app_fn.license_pack_license_type_info
            ]::app_fn.license_pack_license_type_info[]
            ,true  -- auto_subscribe new tenants to this license pack
          )::app_fn.license_pack_info
        ]::app_fn.license_pack_info[]
      )::app_fn.application_info
    );

    return _application;
  end;
  $function$
  ;
```