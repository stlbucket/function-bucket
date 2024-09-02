import {workerTaskRunner} from './lib/fnbWorkflow/index.js'

async function runTasks() {
  try{
    console.log('RUNNING TASKS')
    const result = await workerTaskRunner()
    console.log(result)
  } catch (e: any) {
    console.error(e.toString())   
    process.exit(1)
  }
}

export { runTasks }