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
  'project',
  'milestone',
  'task',
  'issue'
);
----------------------------------------
CREATE TABLE wf.project_type (
  id text not null primary key
);
----------------------------------------
CREATE TABLE wf.project (
  id uuid NOT NULL DEFAULT gen_random_uuid() primary key,
  uow_id uuid,
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  identifier text,
  tenant_id uuid NOT NULL,
  name text,
  type text NOT NULL references wf.project_type(id),
  is_template boolean DEFAULT false NOT NULL,
  workflow_data jsonb DEFAULT '{}'::jsonb NOT NULL,
  workflow_input_definition jsonb DEFAULT '{}'::jsonb NOT NULL
);
----------------------------------------
CREATE TABLE wf.uow (
  id uuid NOT NULL DEFAULT gen_random_uuid() primary key,
  project_id uuid NOT NULL references wf.project(id),
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  tenant_id uuid NOT NULL,
  identifier text,
  is_template boolean DEFAULT false NOT NULL,
  name text,
  description text,
  type wf.uow_type,
  data jsonb,
  parent_uow_id uuid,
  status wf.uow_status_type DEFAULT 'incomplete'::wf.uow_status_type NOT NULL,
  due_at timestamp with time zone,
  completed_at timestamp with time zone,
  workflow_handler_key text,
  use_worker boolean DEFAULT false NOT NULL,
  workflow_error jsonb DEFAULT '{}'::jsonb NOT NULL
);
----------------------------------------
CREATE TABLE wf.project_role (
  id uuid NOT NULL DEFAULT gen_random_uuid() primary key,
  name text,
  key text,
  config jsonb DEFAULT '{}'::jsonb NOT NULL,
  CONSTRAINT project_role_key_check CHECK (((key IS NOT NULL) AND (key <> ''::text))),
  CONSTRAINT project_role_name_check CHECK (((name IS NOT NULL) AND (name <> ''::text)))
);
----------------------------------------
CREATE TABLE wf.uow_dependency (
  id uuid NOT NULL DEFAULT gen_random_uuid() primary key,
  tenant_id uuid NOT NULL,
  depender_id uuid NOT NULL references wf.uow(id),
  dependee_id uuid NOT NULL references wf.uow(id),
  is_template boolean DEFAULT false NOT NULL
);
----------------------------------------
CREATE FUNCTION wf.fn_before_update_project() RETURNS trigger
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
CREATE FUNCTION wf.project_template(_project wf.project) RETURNS wf.project
  LANGUAGE plpgsql STABLE
  AS $$
DECLARE
  _project_template wf.project;
  _err_context text;
BEGIN
  select * into _project_template from wf.project where type = _project.type and is_template = true;
  return _project_template;
  exception
    when others then
      GET STACKED DIAGNOSTICS _err_context = PG_EXCEPTION_CONTEXT;
      if position('FB' in SQLSTATE::text) = 0 then
        _err_context := 'wf.project_template:::' || SQLSTATE::text || ':::' || SQLERRM::text || ':::' || _err_context;
        raise exception '%', _err_context using errcode = 'FB500';
      end if;
      raise;
end;
$$;
----------------------------------------
CREATE FUNCTION wf.uow_dependees(_uow wf.uow) RETURNS SETOF wf.uow
  LANGUAGE plpgsql STABLE
  AS $$
DECLARE
  _err_context text;
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
      if position('FB' in SQLSTATE::text) = 0 then
        _err_context := 'wf.uow_dependees:::' || SQLSTATE::text || ':::' || SQLERRM::text || ':::' || _err_context;
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
  _err_context text;
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
      if position('FB' in SQLSTATE::text) = 0 then
        _err_context := 'wf.uow_dependers:::' || SQLSTATE::text || ':::' || SQLERRM::text || ':::' || _err_context;
        raise exception '%', _err_context using errcode = 'FB500';
      end if;
      raise;
  END
$$;
----------------------------------------
CREATE INDEX idx_prj_project_type ON wf.project USING btree (type);
----------------------------------------
CREATE INDEX idx_project_tenant ON wf.project USING btree (tenant_id);
----------------------------------------
CREATE INDEX idx_project_uow ON wf.project USING btree (uow_id);
----------------------------------------
CREATE UNIQUE INDEX idx_unique_project_template ON wf.project USING btree (tenant_id, identifier) WHERE (is_template = true);
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
CREATE INDEX idx_uow_project ON wf.uow USING btree (project_id);
----------------------------------------
CREATE UNIQUE INDEX idx_uow_project_project ON wf.uow USING btree (project_id) WHERE (type = 'project'::wf.uow_type);
----------------------------------------
CREATE INDEX idx_wf_app_user_id ON wf.project USING gin (((workflow_data #> '{workflowInputData,appUserId}'::text[])));
----------------------------------------
CREATE INDEX idx_wf_input_data ON wf.project USING gin (((workflow_data #> '{workflowInputData}'::text[])));
----------------------------------------
CREATE TRIGGER tg_before_update_project BEFORE UPDATE ON wf.project FOR EACH ROW EXECUTE FUNCTION wf.fn_before_update_project();
----------------------------------------
CREATE TRIGGER tg_before_update_uow BEFORE UPDATE ON wf.uow FOR EACH ROW EXECUTE FUNCTION wf.fn_before_update_uow();
