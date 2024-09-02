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
  identifier: 'auth0-invite-user',
  name: 'Invite User',
  isTemplate: true,
  type: 'auth0-invite-user',
  onCompletedWorkflowHandlerKey: 'close-workflow-project',
  workflowInputDefinition: JSON.stringify(workflowInputDefinition),
  uows: [
    {
      identifier: 'auth0-push-user',
      isTemplate: true,
      type: FnbUnitOfWorkType.TASK,
      name: 'Push user to Auth0',
      description: 'Push user to Auth0',
      // data: {},
      useWorker: true,
      workflowHandlerKey: 'push-auth0-user'
    },
    {
      identifier: 'send-invitation-email',
      isTemplate: true,
      type: FnbUnitOfWorkType.TASK,
      name: 'Send Invitation Email',
      description: 'Send Invitation Email',
      // data: {},
      useWorker: true,
      workflowHandlerKey: 'send-invitation-email'
    }
  ],
  uowDependencies: [
    {
      dependeeIdentifier: 'auth0-push-user',
      dependerIdentifier: 'send-invitation-email'
    }
  ]
}

export default project
