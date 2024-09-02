CREATE SCHEMA wf_fn;
CREATE SCHEMA wf_api;
-------------------------------------------------------
CREATE TYPE wf_fn.clone_project_template_options AS (
	data jsonb
);
-------------------------------------------------------
CREATE TYPE wf_fn.clone_uow_template_options AS (
	data json
);
-------------------------------------------------------
CREATE TYPE wf_fn.complete_uow_options AS (
	workflow_data jsonb,
	step_data jsonb
);
-------------------------------------------------------
CREATE TYPE wf_fn.complete_uow_result AS (
	uow wf.uow,
	uows_to_schedule wf.uow[]
);
-------------------------------------------------------
CREATE TYPE wf_fn.uow_dependency_info AS (
	depender_identifier text,
	dependee_identifier text
);
-------------------------------------------------------
CREATE TYPE wf_fn.uow_info AS (
	id text,
	identifier text,
	name text,
	is_template boolean,
	description text,
	type wf.uow_type,
	data jsonb,
	project_id text,
	parent_uow_id text,
	due_at timestamp with time zone,
	workflow_handler_key text,
	use_worker boolean
);
-------------------------------------------------------
CREATE TYPE wf_fn.project_info AS (
	id text,
	identifier text,
	type text,
	name text,
	is_template boolean,
	uows wf_fn.uow_info[],
	uow_dependencies wf_fn.uow_dependency_info[],
	on_completed_workflow_handler_key text,
	workflow_input_definition jsonb
);
-------------------------------------------------------
CREATE TYPE wf_fn.queue_workflow_result AS (
	project wf.project,
	uows_to_schedule wf.uow[]
);
CREATE TYPE wf_fn.search_projects_options AS (
	project_type text,
	is_template boolean,
	search_terms text[],
	date_range_start date,
	date_range_end date,
	tenant_id text,
	project_uow_status wf.uow_status_type,
	result_limit integer
);
CREATE TYPE wf_fn.update_uow_status_options AS (
	data jsonb,
	error_info jsonb
);
-------------------------------------------------------
CREATE TYPE wf_fn.update_uow_status_result AS (
	uow wf.uow,
	uows_to_schedule wf.uow[]
);
