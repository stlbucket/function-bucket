const { makeWorkerUtils } = require("graphile-worker");
const connectionString = process.env.DB_OWNER_CONNECTION || process.env.DB_CONNECTION

let workerUtils: any = null

const scheduleUows = async (uowsToSchedule: any[]) => {
  if (!workerUtils) {
    workerUtils = await makeWorkerUtils({
      connectionString: connectionString,
    });
  }

  try {
    await Promise.all(
      uowsToSchedule.map(
        async (uow: any) => {
          await workerUtils.addJob(
            uow.workflow_handler_key,
            // Payload
            {
              uow: uow,
            },
            // Optionally, add further task spec details here
          )
        }
      )
    )
  } catch (error) {
    console.log('ERROR', error)
    throw error
  }
}

export default scheduleUows