CREATE SCHEMA wf;
----------------------------------------
CREATE TYPE wf.uow_status_type AS ENUM (
  'incomplete',
  'paused',
  'waiting',
  'complete',
  'canceled',
  'deleted',
  'error',
  'template'
);
----------------------------------------
CREATE TYPE wf.uow_type AS ENUM (
  'wf',
  'milestone',
  'task',
  'issue'
);
----------------------------------------
CREATE TYPE wf.workflow_input_data_type AS ENUM (
  'string'
  ,'number'
  ,'boolean'
);
create type wf.workflow_input_definition as (
  name citext
  ,data_type wf.workflow_input_data_type
  ,default_value citext
  ,is_required boolean
);
----------------------------------------
CREATE TABLE wf.wf_type (
  id citext not null primary key
);
----------------------------------------
CREATE TABLE wf.wf (
  id uuid NOT NULL DEFAULT gen_random_uuid() primary key,
  uow_id uuid,
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  identifier citext,
  tenant_id uuid NOT NULL,
  name citext,
  description citext,
  type citext NOT NULL references wf.wf_type(id),
  is_template boolean DEFAULT false NOT NULL,
  workflow_data jsonb DEFAULT '{}'::jsonb NOT NULL,
  input_definitions wf.workflow_input_definition[] NOT NULL default '{}'::wf.workflow_input_definition[]
);
----------------------------------------
CREATE TABLE wf.uow (
  id uuid NOT NULL DEFAULT gen_random_uuid() primary key,
  wf_id uuid NOT NULL references wf.wf(id),
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  tenant_id uuid NOT NULL,
  identifier citext,
  is_template boolean DEFAULT false NOT NULL,
  name citext,
  description citext,
  type wf.uow_type,
  data jsonb,
  parent_uow_id uuid,
  status wf.uow_status_type DEFAULT 'incomplete'::wf.uow_status_type NOT NULL,
  due_at timestamp with time zone,
  completed_at timestamp with time zone,
  workflow_handler_key citext,
  use_worker boolean DEFAULT false NOT NULL,
  workflow_error jsonb DEFAULT '{}'::jsonb NOT NULL
);
----------------------------------------
CREATE TABLE wf.wf_role (
  id uuid NOT NULL DEFAULT gen_random_uuid() primary key,
  name citext,
  key citext,
  config jsonb DEFAULT '{}'::jsonb NOT NULL,
  CONSTRAINT wf_role_key_check CHECK (((key IS NOT NULL) AND (key <> ''::citext))),
  CONSTRAINT wf_role_name_check CHECK (((name IS NOT NULL) AND (name <> ''::citext)))
);
----------------------------------------
CREATE TABLE wf.uow_dependency (
  id uuid NOT NULL DEFAULT gen_random_uuid() primary key,
  tenant_id uuid NOT NULL,
  wf_id uuid NOT NULL references wf.wf(id),
  depender_id uuid NOT NULL references wf.uow(id),
  dependee_id uuid NOT NULL references wf.uow(id),
  is_template boolean DEFAULT false NOT NULL
);
----------------------------------------
CREATE FUNCTION wf.fn_before_update_wf() RETURNS trigger
  LANGUAGE plpgsql
  AS $$
BEGIN
  NEW.updated_at = current_timestamp;
  RETURN NEW;
END; $$;
----------------------------------------
CREATE FUNCTION wf.fn_before_update_uow() RETURNS trigger
  LANGUAGE plpgsql
  AS $$
BEGIN
  NEW.updated_at = current_timestamp;
  RETURN NEW;
END; $$;
----------------------------------------
CREATE FUNCTION wf.wf_template(_wf wf.wf) RETURNS wf.wf
  LANGUAGE plpgsql STABLE
  AS $$
DECLARE
  _wf_template wf.wf;
  _err_context citext;
BEGIN
  select * into _wf_template from wf.wf where type = _wf.type and is_template = true;
  return _wf_template;
end;
$$;
----------------------------------------
CREATE FUNCTION wf.wf_instance_count(_wf wf.wf) RETURNS integer
  LANGUAGE plpgsql STABLE
  AS $$
DECLARE
  _count integer;
  _err_context citext;
BEGIN
  if _wf.is_template != true then return 1; end if;

  select count(*) into _count
  from wf.wf
  where type = _wf.type
  and is_template != true;

  return _count;
end;
$$;
----------------------------------------
CREATE FUNCTION wf.wf_status(_wf wf.wf) RETURNS wf.uow_status_type
  LANGUAGE plpgsql STABLE
  AS $$
DECLARE
  _status wf.uow_status_type;
  _err_context citext;
BEGIN
  select status into _status from wf.uow where wf_id = _wf.id and type = 'wf';
  return _status;
end;
$$;
----------------------------------------
CREATE FUNCTION wf.uow_dependees(_uow wf.uow) RETURNS SETOF wf.uow
  LANGUAGE plpgsql STABLE
  AS $$
DECLARE
  _err_context citext;
BEGIN
  return query
  select *
  from wf.uow
  where id in (
    select dependee_id from wf.uow_dependency where depender_id = _uow.id
  )
  ;
  exception
    when others then
      GET STACKED DIAGNOSTICS _err_context = PG_EXCEPTION_CONTEXT;
      if position('FB' in SQLSTATE::citext) = 0 then
        _err_context := 'wf.uow_dependees:::' || SQLSTATE::citext || ':::' || SQLERRM::citext || ':::' || _err_context;
        raise exception '%', _err_context using errcode = 'FB500';
      end if;
      raise;
  END
$$;
----------------------------------------
CREATE FUNCTION wf.uow_dependers(_uow wf.uow) RETURNS SETOF wf.uow
  LANGUAGE plpgsql STABLE
  AS $$
DECLARE
  _err_context citext;
BEGIN
  return query
  select *
  from wf.uow
  where id in (
    select depender_id from wf.uow_dependency where dependee_id = _uow.id
  )
  ;
  exception
    when others then
      GET STACKED DIAGNOSTICS _err_context = PG_EXCEPTION_CONTEXT;
      if position('FB' in SQLSTATE::citext) = 0 then
        _err_context := 'wf.uow_dependers:::' || SQLSTATE::citext || ':::' || SQLERRM::citext || ':::' || _err_context;
        raise exception '%', _err_context using errcode = 'FB500';
      end if;
      raise;
  END
$$;
----------------------------------------
CREATE INDEX idx_prj_wf_type ON wf.wf USING btree (type);
----------------------------------------
CREATE INDEX idx_wf_tenant ON wf.wf USING btree (tenant_id);
----------------------------------------
CREATE INDEX idx_wf_uow ON wf.wf USING btree (uow_id);
----------------------------------------
CREATE UNIQUE INDEX idx_unique_wf_template ON wf.wf USING btree (tenant_id, identifier) WHERE (is_template = true);
----------------------------------------
CREATE INDEX idx_uow_tenant ON wf.uow USING btree (tenant_id);
----------------------------------------
CREATE INDEX idx_uow_dependency_tenant ON wf.uow_dependency USING btree (tenant_id);
----------------------------------------
CREATE INDEX idx_uow_dependency_dependee ON wf.uow_dependency USING btree (dependee_id);
----------------------------------------
CREATE INDEX idx_uow_dependency_depender ON wf.uow_dependency USING btree (depender_id);
----------------------------------------
CREATE INDEX idx_uow_parent_uow ON wf.uow USING btree (parent_uow_id);
----------------------------------------
CREATE INDEX idx_uow_wf ON wf.uow USING btree (wf_id);
----------------------------------------
CREATE UNIQUE INDEX idx_uow_wf_wf ON wf.uow USING btree (wf_id) WHERE (type = 'wf'::wf.uow_type);
----------------------------------------
CREATE INDEX idx_wf_app_user_id ON wf.wf USING gin (((workflow_data #> '{workflowInputData,appUserId}'::citext[])));
----------------------------------------
CREATE INDEX idx_wf_input_data ON wf.wf USING gin (((workflow_data #> '{workflowInputData}'::citext[])));
----------------------------------------
CREATE TRIGGER tg_before_update_wf BEFORE UPDATE ON wf.wf FOR EACH ROW EXECUTE FUNCTION wf.fn_before_update_wf();
----------------------------------------
CREATE TRIGGER tg_before_update_uow BEFORE UPDATE ON wf.uow FOR EACH ROW EXECUTE FUNCTION wf.fn_before_update_uow();
