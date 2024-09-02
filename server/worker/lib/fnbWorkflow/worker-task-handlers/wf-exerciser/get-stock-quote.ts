import { FnbWorkflowStepPayload, FnbWorkflowStepResult, FnbWorkflowStepResultStatus } from '../d.js';
import _workflowHandler from '../_workflow-handler.js';
const camelcaseKeys = require('camelcase-keys');
const ALPHA_VANTAGE_KEY = process.env.ALPHA_VANTAGE_KEY
import fetch from 'node-fetch'

// import sendInvitationEmail from '../lib/auth0/send-password-change-email'
const handler = async (payload: FnbWorkflowStepPayload): Promise<FnbWorkflowStepResult> => {
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${payload.workflowData.workflowInputData.stockSymbol}&apikey=${ALPHA_VANTAGE_KEY}`
  const response = await fetch(url)
  const data = await (await response).json()
  // console.log(JSON.stringify(data,null,2))
  // process.exit()
  return { 
    status: FnbWorkflowStepResultStatus.complete,
    workflowData: {
      stockQuote: data['Global Quote']
    }
  }
};

export default _workflowHandler(handler)
