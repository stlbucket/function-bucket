import { FnbWorkflow, FnbUnitOfWorkType, FnbWorkflowDataType, FnbWorkflowInputDefinition } from "../worker-task-handlers/d.js";

// this has to be separate so typescript can enforce the input
// in the workfow definition this is JSON.stringified so this can load thru graphql
const workflowInputDefinition: FnbWorkflowInputDefinition = {
  workflowInputData: {
    activityDeploymentId: {
      type: FnbWorkflowDataType.STRING,
    }
  }
}

const project: FnbWorkflow = {
  identifier: 'ovb-deploy-game-to-prod',
  name: 'Deploy Game To Prod',
  isTemplate: true,
  type: 'ovb-deploy-game-to-prod',
  onCompletedWorkflowHandlerKey: 'close-workflow-project',
  workflowInputDefinition: JSON.stringify(workflowInputDefinition),
  uows: [
    {
      identifier: 'request-activity-transfer-operation',
      isTemplate: true,
      type: FnbUnitOfWorkType.TASK,
      name: 'Request Transfer',
      description: 'Initiates a storage transfer operation from dev to prod',
      useWorker: true,
      workflowHandlerKey: 'request-activity-transfer-operation'
    }
  ],
  uowDependencies: [
  ]
}

export default project
