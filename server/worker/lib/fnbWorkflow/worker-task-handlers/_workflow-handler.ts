import {doQuery} from '../../../pg-client.js'
import { FnbWorkFlowHandlerFunction, FnbWorkflowStepPayload } from './d.js';
const camelcaseKeys = require('camelcase-keys')

const { makeWorkerUtils } = require("graphile-worker");
const connectionString = process.env.DB_OWNER_CONNECTION || process.env.DB_CONNECTION

// https://dev.to/ankittanna/how-to-create-a-type-for-complex-json-object-in-typescript-d81

export default (handler: FnbWorkFlowHandlerFunction): Function => {
  return async (payload: FnbWorkflowStepPayload) => {
    const workerUtils = await makeWorkerUtils({
      connectionString: connectionString,
    });

    const uow = camelcaseKeys(payload.uow)
    try {
      const workflowDataQuery = (await doQuery('select workflow_data from prj.project where id = $1;', [
        uow.projectId
      ])).rows[0]

      const workflowData = workflowDataQuery ? workflowDataQuery.workflow_data : {}
      // console.log('workflowData', workflowData)
      
      const result = await handler({
        uow: uow,
        workflowData: workflowData
      })

      // console.log('result', uow.identifier, JSON.stringify(result, null, 2))

      switch (result.status) {
        case 'complete':
            const completeUowResult = (await doQuery('select to_jsonb(prj_fn.complete_uow($1, row($2, $3)::prj_fn.complete_uow_options));', [
              uow.id,
              result.workflowData || {},
              result.stepData || {}
            ])).rows[0].to_jsonb
            // console.log('completeUowResult.uows_to_schedule', JSON.stringify(completeUowResult.uows_to_schedule, null, 2))
            await Promise.all(
              completeUowResult.uows_to_schedule.map(
                async (uow: any) => {
                  await workerUtils.addJob(
                    uow.workflow_handler_key,
                    // Payload
                    {
                      uow: uow
                    },
                    // Optionally, add further task spec details here
                  )
                }
              )
            )
          break;
        case 'error':
          if (!result.errorInfo) { throw new Error(`workflow error thrown with no info: ${uow.workflowHandlerKey}`)}

          await doQuery('select to_jsonb(prj_fn.error_uow($1, $2, $3));', [
            uow.id,
            result.errorInfo.message,
            result.errorInfo.stack.split('\n')
          ])
        break;
        default:
          throw new Error(`invalid result status: ${result.status}`)
        }
  
    } catch (e: any) {
      console.log('stack', e.stack.split('\n'))
      await doQuery('select to_jsonb(prj_fn.error_uow($1, $2, $3));', [
        uow.id,
        e.toString(),
        e.stack.split('\n')
      ])
    } finally {
      workerUtils.release()
    }
  }
};

