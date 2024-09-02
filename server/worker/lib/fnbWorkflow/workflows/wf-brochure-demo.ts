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
    }
  }
}

const project: FnbWorkflow = {
  identifier: 'brochure-demo',
  name: 'Brochure Demo',
  isTemplate: true,
  type: 'brochure-demo',
  onCompletedWorkflowHandlerKey: 'close-workflow-project',
  workflowInputDefinition: JSON.stringify(workflowInputDefinition),
  uows: [
    {
      identifier: 'send-brochure-demo-email',
      isTemplate: true,
      type: FnbUnitOfWorkType.TASK,
      name: 'Send Brochure Demo Email',
      description: 'Send Brochure Demo Email',
      // data: {},
      useWorker: true,
      workflowHandlerKey: 'send-brochure-demo-email'
    }
  ],
  uowDependencies: [
  ]
}

export default project
