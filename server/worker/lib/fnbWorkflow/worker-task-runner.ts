const { makeWorkerUtils, runOnce } = require("graphile-worker");
import workerTasks from './worker-task-handlers/index.js'

const dbConnection = process.env.DB_OWNER_CONNECTION

export default async () => {
  const workerUtils = await makeWorkerUtils({
    connectionString: dbConnection
  })
  await workerUtils.migrate()

  await runOnce({
    connectionString: dbConnection,
    concurrency: 5,
    // Install signal handlers for graceful shutdown on SIGINT, SIGTERM, etc
    noHandleSignals: false,
    pollInterval: 1000,
    // you can set the taskList or taskDirectory but not both
    taskList: workerTasks
  })

  return 'no more jobs'
}