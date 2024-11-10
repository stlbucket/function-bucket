import { type FnbWorkflowStepPayload, type FnbWorkflowStepResult, FnbWorkflowStepResultStatus } from '../d.js';
import _workflowHandler from '../_workflow-handler.js';
const ALPHA_VANTAGE_KEY = process.env.ALPHA_VANTAGE_KEY

const handler = async (payload: FnbWorkflowStepPayload): Promise<FnbWorkflowStepResult> => {
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${payload.workflowData.workflowInputData.stockSymbol}&apikey=${ALPHA_VANTAGE_KEY}`
  const response = await fetch(url)
  const data = await (await response).json()
  return { 
    status: FnbWorkflowStepResultStatus.complete,
    workflowData: {
      stockQuote: data['Global Quote']
    }
  }
};

export default _workflowHandler(handler)
