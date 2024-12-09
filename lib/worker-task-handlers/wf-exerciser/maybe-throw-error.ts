import { type FnbWorkflowStepPayload, type FnbWorkflowStepResult, FnbWorkflowStepResultStatus } from '../d.js';
import _workflowHandler from '../_workflow-handler.js';

const handler = async (payload: FnbWorkflowStepPayload): Promise<FnbWorkflowStepResult> => {
  const throwError = payload.workflowData.workflowInputData.throwError
  if (throwError) { throw new Error(`COZ YOU ASKED`)}

  return { 
    status: FnbWorkflowStepResultStatus.complete
  }
};

export default _workflowHandler(handler)
