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
  identifier: 'auth0-delete-user',
  name: 'Delete User',
  isTemplate: true,
  type: 'auth0-delete-user',
  onCompletedWorkflowHandlerKey: 'close-workflow-project',
  workflowInputDefinition: JSON.stringify(workflowInputDefinition),
  uows: [
    {
      identifier: 'delete-auth0-user',
      isTemplate: true,
      type: FnbUnitOfWorkType.TASK,
      name: 'Delete user from Auth0',
      description: 'Delete user from Auth0',
      // data: {},
      useWorker: true,
      workflowHandlerKey: 'delete-auth0-user'
    }
  ],
  uowDependencies: []
}

export default project
