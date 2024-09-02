import { FnbWorkflowStepPayload, FnbWorkflowStepResult, FnbWorkflowStepResultStatus } from '../d.js';
import {doQuery} from '../../../../pg-client.js'
import _workflowHandler from '../_workflow-handler.js';
const camelcaseKeys = require('camelcase-keys');

// import sendInvitationEmail from '../lib/auth0/send-password-change-email'
const handler = async (payload: FnbWorkflowStepPayload): Promise<FnbWorkflowStepResult> => {
  const message = payload.workflowData.workflowInputData.raiseExceptionMessage
  if (message) { 
    const result = camelcaseKeys((await doQuery(`
      select to_jsonb(app_fn.raise_exception($1));`, [
      message
    ])))

    console.log(result)
  }

  return { 
    status: FnbWorkflowStepResultStatus.complete
  }
};

export default _workflowHandler(handler)
