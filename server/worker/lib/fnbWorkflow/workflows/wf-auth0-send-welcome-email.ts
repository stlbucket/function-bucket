import { FnbWorkflow, FnbUnitOfWorkType, FnbWorkflowDataType, FnbWorkflowInputDefinition } from "../worker-task-handlers/d.js";

// this has to be separate so typescript can enforce the input
// in the workfow definition this is JSON.stringified so this can load thru graphql
const workflowInputDefinition: FnbWorkflowInputDefinition = {
  workflowInputData: {
    appUserId: {
      type: FnbWorkflowDataType.STRING,
    }
  }
}

const project: FnbWorkflow = {
  identifier: 'auth0-send-welcome-email',
  name: 'Send Welcome Email',
  isTemplate: true,
  type: 'auth0-send-welcome-email',
  onCompletedWorkflowHandlerKey: 'close-workflow-project',
  workflowInputDefinition: JSON.stringify(workflowInputDefinition),
  uows: [
    {
      identifier: 'send-welcome-email',
      isTemplate: true,
      type: FnbUnitOfWorkType.TASK,
      name: 'Send Welcome Email',
      description: 'Send Welcome Email',
      // data: {},
      useWorker: true,
      workflowHandlerKey: 'send-welcome-email'
    }
  ],
  uowDependencies: [
  ]
}

export default project
