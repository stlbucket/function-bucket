import closeWorkflowProject from "./_common/close-workflow-project.js"

import initWorkflowExerciser from "./wf-exerciser/init-workflow-exerciser.js";
import finishWorkflowExerciser from "./wf-exerciser/finish-workflow-exerciser.js";
import getStockQuote from "./wf-exerciser/get-stock-quote.js";
import maybeThrowError from "./wf-exerciser/maybe-throw-error.js";
import doTheThings from "./wf-exerciser/do-the-things.js";
import maybeRaiseException from "./wf-exerciser/maybe-raise-exception.js";
import { TaskList } from "graphile-worker";


const taskList: TaskList = {
  'init-workflow-exerciser': initWorkflowExerciser,  
  'finish-workflow-exerciser': finishWorkflowExerciser,
  'close-workflow-project': closeWorkflowProject,
  'get-stock-quote': getStockQuote,
  'maybe-throw-error': maybeThrowError,
  'do-the-things': doTheThings,
  'maybe-raise-exception': maybeRaiseException,
}

export default taskList