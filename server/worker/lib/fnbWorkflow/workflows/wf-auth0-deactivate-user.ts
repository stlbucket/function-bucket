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
  identifier: 'auth0-deactivate-user',
  name: 'Dectivate User',
  isTemplate: true,
  type: 'auth0-deactivate-user',
  onCompletedWorkflowHandlerKey: 'close-workflow-project',
  workflowInputDefinition: JSON.stringify(workflowInputDefinition),
  uows: [
    {
      identifier: 'auth0-block',
      isTemplate: true,
      type: FnbUnitOfWorkType.TASK,
      name: 'Block user in Auth0',
      description: 'Block user in Auth0',
      useWorker: true,
      workflowHandlerKey: 'block-auth0-user'
    }
  ],
  uowDependencies: [
  ]
}

export default project
