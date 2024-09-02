export enum FnbWorkflowStepResultStatus {
  complete = 'complete',
  error = 'error'
}

export interface FnbWorkflowError {
  message: string,
  stack: string
}

export interface FnbWorkflowStepResult {
  status: FnbWorkflowStepResultStatus,
  stepData?: any,
  workflowData?: any,
  errorInfo?: FnbWorkflowError
}

export interface FnbWorkflowStepPayload {
  uow: FnbUnitOfWork,
  workflowData: any
}

export type FnbWorkFlowHandlerFunction = (
  payload: FnbWorkflowStepPayload
) => Promise<FnbWorkflowStepResult>

export enum FnbUnitOfWorkType {
  TASK = 'TASK',
  MILESTONE = 'MILESTONE',
  PROJECT = 'PROJECT'
}

export enum FnbWorkflowDataType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
  OBJECT = 'OBJECT'
}

export interface FnbUnitOfWork {
  id?: string,
  type: FnbUnitOfWorkType,
  name: string,
  identifier: string,
  isTemplate?: Boolean,
  description?: string,
  data?: any,
  dueAt?: Date,
  workflowHandlerKey?: string,
  useWorker?: Boolean,
  parentUowId?: string
}

export interface FnbUowDependency {
  dependerIdentifier: string,
  dependeeIdentifier: string
}  
export interface FnbWorkflowInputItem {
  type: FnbWorkflowDataType,
  required?: Boolean,
  default?: any
}

export interface FnbWorkflowInput {
  [index: string]: FnbWorkflowInputItem
}

export interface FnbWorkflowStepInput {
  [index: string]: FnbWorkflowInput 
}

export interface FnbWorkflowInputDefinition {
  workflowInputData?: FnbWorkflowInput,
  stepInputData?: FnbWorkflowStepInput
}

export interface FnbWorkflow {
  id?: string,
  identifier: string,
  type: string,
  name: string,
  isTemplate?: Boolean,
  onCompletedWorkflowHandlerKey?: string
  uows: FnbUnitOfWork[]
  uowDependencies?: FnbUowDependency[]
  workflowInputDefinition?: any
}
