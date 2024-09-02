import { FnbWorkflow, FnbUnitOfWorkType, FnbWorkflowDataType, FnbWorkflowInputDefinition } from "../worker-task-handlers/d.js";

// this has to be separate so typescript can enforce the input
// in the workfow definition this is JSON.stringified so this can load thru graphql
const workflowInputDefinition: FnbWorkflowInputDefinition = {
  workflowInputData: {
    stockSymbol: {
      type: FnbWorkflowDataType.STRING,
      default: 'TSLA'
    },
    throwError: {
      type: FnbWorkflowDataType.BOOLEAN,
      default: false
    },
    raiseExceptionMessage: {
      type: FnbWorkflowDataType.STRING,
      default: null
    }
  }
}

const project: FnbWorkflow = {
  identifier: 'wf-exerciser',
  name: 'Workflow Exerciser',
  isTemplate: true,
  type: 'wf-exerciser',
  onCompletedWorkflowHandlerKey: 'close-workflow-project',
  workflowInputDefinition: JSON.stringify(workflowInputDefinition),
  uows: [
    {
      identifier: 'init-workflow-exerciser',
      isTemplate: true,
      type: FnbUnitOfWorkType.TASK,
      name: 'Init Workflow Exerciser',
      description: 'Initial housekeeping stuff',
      useWorker: true,
      workflowHandlerKey: 'init-workflow-exerciser'
    },
    {
      identifier: 'do-the-things',
      isTemplate: true,
      type: FnbUnitOfWorkType.MILESTONE,
      name: 'Do the things',
      description: 'This is about the milestone',
      useWorker: true,
      workflowHandlerKey: 'do-the-things',
    },
    {
      identifier: 'get-stock-quote',
      isTemplate: true,
      type: FnbUnitOfWorkType.TASK,
      name: 'Get a stock quote',
      description: 'Get a stock quote',
      useWorker: true,
      workflowHandlerKey: 'get-stock-quote',
      parentUowId: 'do-the-things'
    },
    {
      identifier: 'maybe-throw-error',
      isTemplate: true,
      type: FnbUnitOfWorkType.TASK,
      name: 'Throw an error',
      description: 'Throw an error',
      useWorker: true,
      workflowHandlerKey: 'maybe-throw-error',
      parentUowId: 'do-the-things'
    },
    {
      identifier: 'maybe-raise-exception',
      isTemplate: true,
      type: FnbUnitOfWorkType.TASK,
      name: 'Raise an Exception',
      description: 'Raise an Exception',
      useWorker: true,
      workflowHandlerKey: 'maybe-raise-exception',
      parentUowId: 'do-the-things'
    },
    {
      identifier: 'finish-workflow-exerciser',
      isTemplate: true,
      type: FnbUnitOfWorkType.TASK,
      name: 'Finish Workflow Exerciser',
      description: 'Final housekeeping stuff',
      useWorker: true,
      workflowHandlerKey: 'finish-workflow-exerciser'
    }
  ],
  uowDependencies: [
    {
      dependeeIdentifier: 'init-workflow-exerciser',
      dependerIdentifier: 'do-the-things'
    },
    {
      dependeeIdentifier: 'get-stock-quote',
      dependerIdentifier: 'maybe-throw-error'
    },
    {
      dependeeIdentifier: 'maybe-throw-error',
      dependerIdentifier: 'maybe-raise-exception'
    },
    {
      dependeeIdentifier: 'maybe-raise-exception',
      dependerIdentifier: 'finish-workflow-exerciser'
    }
  ]
}

export default project

