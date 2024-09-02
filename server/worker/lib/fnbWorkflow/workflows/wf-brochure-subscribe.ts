import { FnbWorkflow, FnbUnitOfWorkType, FnbWorkflowDataType, FnbWorkflowInputDefinition } from "../worker-task-handlers/d.js";

// this has to be separate so typescript can enforce the input
// in the workfow definition this is JSON.stringified so this can load thru graphql
const workflowInputDefinition: FnbWorkflowInputDefinition = {
  workflowInputData: {
    appUserId: {
      type: FnbWorkflowDataType.STRING,
    },
    source: {
      type: FnbWorkflowDataType.STRING
    },
    tag: {
      type: FnbWorkflowDataType.STRING
    }
  }
}

// this could be a workflow, separate from initial admin user initialization
// CURRENTLY NOT IN USE
const project: FnbWorkflow = {
  identifier: 'brochure-subscribe',
  name: 'Brochure Subscribe',
  isTemplate: true,
  type: 'brochure-subscribe',
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
      identifier: 'send-welcome-email',
      isTemplate: true,
      type: FnbUnitOfWorkType.TASK,
      name: 'Send Welcome Email',
      description: 'Send Welcome Email',
      // data: {},
      useWorker: true,
      workflowHandlerKey: 'send-welcome-email'
    },
    {
      identifier: 'add-list-member',
      isTemplate: true,
      type: FnbUnitOfWorkType.TASK,
      name: 'Add member to mailchimp list',
      description: 'Add to mailchimp drip campaign list',
      // data: {},
      useWorker: true,
      workflowHandlerKey: 'add-list-member'
    },
  ],
  uowDependencies: [
    {
      dependeeIdentifier: 'auth0-push-user',
      dependerIdentifier: 'send-welcome-email'
    },
    {
      dependeeIdentifier: 'send-welcome-email',
      dependerIdentifier: 'add-list-member'
    },
  ]
}

export default project
