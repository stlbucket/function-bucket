const { makeWorkerUtils } = require("graphile-worker");
import { runTasks } from './run-tasks.js'
import { loadOvbWorkflows } from './load-ovb-workflows.js'
const loadWorkflows = process.env.LOAD_WORKFLOWS === 'true'
const dbConnection = process.env.DB_OWNER_CONNECTION

async function doWork() {
  const workerUtils = await makeWorkerUtils({
    connectionString: dbConnection
  })
  await workerUtils.migrate()

  if (loadWorkflows) {
    console.log('loading workflows')
    await loadOvbWorkflows()
  } else {
    await runTasks()
  }
  process.exit(0)
}

doWork()