import { FnbWorkflowStepPayload, FnbWorkflowStepResult, FnbWorkflowStepResultStatus } from '../d.js';
import _workflowHandler from '../_workflow-handler.js';
import { PromiseOrDirect, Task } from 'graphile-worker';
const camelcaseKeys = require('camelcase-keys');

// import sendInvitationEmail from '../lib/auth0/send-password-change-email'
const handler: Task<"doTheThings"> = async (payload: FnbWorkflowStepPayload): Promise<FnbWorkflowStepResult> => {
  return { 
    status: FnbWorkflowStepResultStatus.complete,
  }
};

export default _workflowHandler(handler)
