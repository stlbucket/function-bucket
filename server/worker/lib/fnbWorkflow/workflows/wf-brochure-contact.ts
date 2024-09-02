import { FnbWorkflow, FnbUnitOfWorkType, FnbWorkflowDataType, FnbWorkflowInputDefinition } from "../worker-task-handlers/d.js";

// this has to be separate so typescript can enforce the input
// in the workfow definition this is JSON.stringified so this can load thru graphql
const workflowInputDefinition: FnbWorkflowInputDefinition = {
  workflowInputData: {
    appUserId: {
      type: FnbWorkflowDataType.STRING
    },
    message: {
      type: FnbWorkflowDataType.STRING
    },
    source: {
      type: FnbWorkflowDataType.STRING
    },
    tag: {
      type: FnbWorkflowDataType.STRING
    }
  }
}

const project: FnbWorkflow = {
  identifier: 'brochure-contact',
  name: 'Brochure Contact',
  isTemplate: true,
  type: 'brochure-contact',
  onCompletedWorkflowHandlerKey: 'close-workflow-project',
  workflowInputDefinition: JSON.stringify(workflowInputDefinition),
  uows: [
    {
      identifier: 'send-brochure-contact-email',
      isTemplate: true,
      type: FnbUnitOfWorkType.TASK,
      name: 'Send Brochure Contact Email',
      description: 'Send Brochure Contact Email',
      // data: {},
      useWorker: true,
      workflowHandlerKey: 'send-brochure-contact-email'
    },
    {
      identifier: 'add-list-member',
      isTemplate: true,
      type: FnbUnitOfWorkType.TASK,
      name: 'Add member to mailchimp list with tag "WebContact"',
      description: 'Add to mailchimp drip campaign list',
      // data: {},
      useWorker: true,
      workflowHandlerKey: 'add-list-member'
    },
  ],
  uowDependencies: [
    {
      dependeeIdentifier: 'send-brochure-contact-email',
      dependerIdentifier: 'add-list-member'
    }
  ]
}

export default project
