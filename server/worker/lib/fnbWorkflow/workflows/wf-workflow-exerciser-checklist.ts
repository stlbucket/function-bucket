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
    }
  },
  // stepInputData: {
  //   'maybe-throw-error': {
  //     throwError: {
  //       type: FnbWorkflowDataType.BOOLEAN,
  //       default: false
  //     }
  //   }
  // }
}

const project: FnbWorkflow = {
  identifier: 'wf-exerciser-checklist',
  name: 'Workflow Excerciser Chcklist',
  isTemplate: true,
  type: 'wf-exerciser-checklist',
  onCompletedWorkflowHandlerKey: 'close-workflow-project',
  workflowInputDefinition: JSON.stringify(workflowInputDefinition),
  uows: [
    {
      identifier: 'wf-checklist-step-1',
      isTemplate: true,
      type: FnbUnitOfWorkType.TASK,
      name: 'WF Checklist 1',
      description: 'Step 1',
      // data: {},
      useWorker: false
    },
    {
      identifier: 'wf-checklist-step-2',
      isTemplate: true,
      type: FnbUnitOfWorkType.TASK,
      name: 'WF Checklist 2',
      description: 'Step 2',
      // data: {},
      useWorker: false
    },
    {
      identifier: 'wf-checklist-step-3',
      isTemplate: true,
      type: FnbUnitOfWorkType.TASK,
      name: 'WF Checklist 3',
      description: 'Step 3',
      // data: {},
      useWorker: false
    }
  ],
  uowDependencies: [
    // {
    //   dependeeIdentifier: 'init-workflow-exerciser',
    //   dependerIdentifier: 'do-the-things'
    // },
  ]
}

export default project

