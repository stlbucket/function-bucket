import type { Task } from 'graphile-worker';
import { useFnbPgClient } from '~/composables/use-pg-client.js'
import type { FnbWorkFlowHandlerFunction, FnbWorkflowStepPayload } from './d.js';
import camelcaseKeys from 'camelcase-keys'

import { makeWorkerUtils } from "graphile-worker";
const connectionString = process.env.DB_OWNER_CONNECTION || process.env.DB_CONNECTION

// https://dev.to/ankittanna/how-to-create-a-type-for-complex-json-object-in-typescript-d81

export default (handler: FnbWorkFlowHandlerFunction): Task => {
  return async (payload: any) => {
    const workerUtils = await makeWorkerUtils({
      connectionString: connectionString,
    });
    const client = useFnbPgClient()

    const uow = camelcaseKeys(payload)
    // console.log('WF HANDLER', {payload})
    try {
      const workflowDataQuery = (await client.doQuery('select workflow_data from wf.wf where id = $1;', [
        uow.wfId
      ])).rows[0]

      const workflowData = workflowDataQuery ? workflowDataQuery.workflow_data : {}
      console.log('workflowData', workflowData)
      
      if (uow.status === 'incomplete') {
        // any uow that gets to this point with any other status will be ignored
        // this is something that should be optimized at some point
        // EAGER-SCHEDULING - search for this term in 00000000010520_wf_fn.sql
        const result = await handler({
          uow: uow,
          workflowData: workflowData
        })
  
        console.log('result', uow.identifier, JSON.stringify(result, null, 2))
  
        switch (result.status) {
          case 'complete':
              const completeUowResult = (await client.doQuery('select to_jsonb(wf_fn.complete_uow($1, row($2, $3)::wf_fn.complete_uow_options));', [
                uow.id,
                result.workflowData || {},
                result.stepData || {}
              ])).rows[0].to_jsonb
              const uts = completeUowResult.uows_to_schedule.map(u => u.identifier)
              console.log('completeUowResult.uows_to_schedule', result.afterStepDelay,  JSON.stringify(uts, null, 2))
              await Promise.all(
                completeUowResult.uows_to_schedule.map(
                  async (uow: any) => {
                    await workerUtils.addJob(
                      uow.workflow_handler_key,
                      // Payload
                      uow,
                      // Optionally, add further task spec details here
                      {
                        maxAttempts: 1,
                        runAt: (new Date(Date.now() + (result.afterStepDelay || 0)))
                      },
                    )
                  }
                )
              )
            break;
          case 'error':
            if (!result.errorInfo) { throw new Error(`workflow error thrown with no info: ${uow.workflowHandlerKey}`)}
  
            await client.doQuery('select to_jsonb(wf_fn.error_uow($1, $2, $3));', [
              uow.id,
              result.errorInfo.message,
              result.errorInfo.stack.split('\n')
            ])
            break;
          default:
            throw new Error(`invalid result status: ${result.status}`)
        }
      }  
    } catch (e: any) {
      console.log('stack', e.stack.split('\n'))
      await client.doQuery('select to_jsonb(wf_fn.error_uow($1, $2, $3));', [
        uow.id,
        e.toString(),
        e.stack.split('\n')
      ])
    } finally {
      workerUtils.release()
    }
  }
};

