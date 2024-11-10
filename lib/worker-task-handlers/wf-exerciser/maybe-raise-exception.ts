import { type FnbWorkflowStepPayload, type FnbWorkflowStepResult, FnbWorkflowStepResultStatus } from '../d.js';
import { useFnbPgClient } from '~/composables/use-pg-client.js'
import _workflowHandler from '../_workflow-handler.js';
import camelcaseKeys from 'camelcase-keys'

const handler = async (payload: FnbWorkflowStepPayload): Promise<FnbWorkflowStepResult> => {
  const message = payload.workflowData.workflowInputData.raiseExceptionMessage
  if (message) {
    const client = useFnbPgClient()
    const result = camelcaseKeys((await client.doQuery(`
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
