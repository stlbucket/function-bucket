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
  identifier: 'auth0-reactivate-user',
  name: 'Reactivate User',
  isTemplate: true,
  type: 'auth0-reactivate-user',
  onCompletedWorkflowHandlerKey: 'close-workflow-project',
  workflowInputDefinition: JSON.stringify(workflowInputDefinition),
  uows: [
    {
      identifier: 'auth0-unblock',
      isTemplate: true,
      type: FnbUnitOfWorkType.TASK,
      name: 'Unblock user in Auth0',
      description: 'Unblock user in Auth0',
      // data: {},
      useWorker: true,
      workflowHandlerKey: 'unblock-auth0-user'
    },
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
    {
      dependeeIdentifier: 'auth0-unblock',
      dependerIdentifier: 'send-welcome-email'
    }
  ]
}

export default project
