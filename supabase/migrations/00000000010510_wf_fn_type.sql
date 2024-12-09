CREATE SCHEMA wf_fn;
CREATE SCHEMA wf_api;
-------------------------------------------------------
CREATE TYPE wf_fn.clone_wf_template_options AS (
	data jsonb
);
-------------------------------------------------------
CREATE TYPE wf_fn.clone_uow_template_options AS (
	data jsonb
);
-------------------------------------------------------
CREATE TYPE wf_fn.complete_uow_options AS (
	workflow_data jsonb,
	step_data jsonb
);
-------------------------------------------------------
CREATE TYPE wf_fn.complete_uow_result AS (
	uow wf.uow,
	uows_to_schedule wf.uow[],
  uows_to_trigger wf.uow[]
);
-------------------------------------------------------
CREATE TYPE wf_fn.uow_dependency_info AS (
	depender_identifier citext,
	dependee_identifier citext
);
-------------------------------------------------------
CREATE TYPE wf_fn.uow_info AS (
	identifier citext,
	name citext,
	description citext,
	type wf.uow_type,
	data jsonb,
	wf_id citext,
	parent_uow_id citext,
	due_at timestamp with time zone,
	workflow_handler_key citext,
	use_worker boolean
);
-------------------------------------------------------
CREATE TYPE wf_fn.wf_info AS (
	identifier citext,
	type citext,
	name citext,
  description citext,
	uows wf_fn.uow_info[],
	uow_dependencies wf_fn.uow_dependency_info[],
	on_completed_workflow_handler_key citext,
	input_definitions wf.workflow_input_definition[]
);
-------------------------------------------------------
CREATE TYPE wf_fn.queue_workflow_result AS (
	wf wf.wf,
	uows_to_schedule wf.uow[]
);
CREATE TYPE wf_fn.search_wfs_options AS (
	wf_type citext,
	is_template boolean,
	search_terms citext[],
	date_range_start date,
	date_range_end date,
	tenant_id citext,
	wf_uow_status wf.uow_status_type,
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
