import closeWorkflowWf from "./_common/close-workflow-wf.js"

import initWorkflowExerciser from "./wf-exerciser/init-workflow-exerciser.js";
import finishWorkflowExerciser from "./wf-exerciser/finish-workflow-exerciser.js";
import getStockQuote from "./wf-exerciser/get-stock-quote.js";
import maybeThrowError from "./wf-exerciser/maybe-throw-error.js";
import doTheThings from "./wf-exerciser/do-the-things.js";
import maybeRaiseException from "./wf-exerciser/maybe-raise-exception.js";
import wait from './_common/wait.js'
import type { TaskList } from "graphile-worker";


const taskList: TaskList = {
  'init-workflow-exerciser': initWorkflowExerciser,  
  'finish-workflow-exerciser': finishWorkflowExerciser,
  'close-workflow-wf': closeWorkflowWf,
  'get-stock-quote': getStockQuote,
  'maybe-throw-error': maybeThrowError,
  'do-the-things': doTheThings,
  'maybe-raise-exception': maybeRaiseException,
  'wait': wait
}

export default taskList