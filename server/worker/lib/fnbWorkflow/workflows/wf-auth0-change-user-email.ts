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
  identifier: 'auth0-change-user-email',
  name: 'Change User Email',
  isTemplate: true,
  type: 'auth0-change-user-email',
  onCompletedWorkflowHandlerKey: 'close-workflow-project',
  workflowInputDefinition: JSON.stringify(workflowInputDefinition),
  uows: [
    {
      identifier: 'auth0-update-user-email',
      isTemplate: true,
      type: FnbUnitOfWorkType.TASK,
      name: 'Change user email in Auth0',
      description: 'Change user email in Auth0',
      // data: {},
      useWorker: true,
      workflowHandlerKey: 'change-user-email'
    },
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
      identifier: 'send-email-verification-email',
      isTemplate: true,
      type: FnbUnitOfWorkType.TASK,
      name: 'Send Email Verification Email',
      description: 'Send Email Verification Email',
      // data: {},
      useWorker: true,
      workflowHandlerKey: 'send-email-verification-email'
    }
  ],
  uowDependencies: [
    {
      dependeeIdentifier: 'auth0-update-user-email',
      dependerIdentifier: 'auth0-push-user'
    },
    {
      dependeeIdentifier: 'auth0-push-user',
      dependerIdentifier: 'send-email-verification-email'
    }
  ]
}

export default project
