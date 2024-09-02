// @/server/plugins/graphile-worker.ts
import { makeWorkerUtils, run } from 'graphile-worker';
import type { RunnerOptions } from 'graphile-worker';
import taskList from '@/server/worker/lib/fnbWorkflow/worker-task-handlers';

let runner;

export default defineNitroPlugin(async (nitroApp) => {
  const utils = await makeWorkerUtils({
   /**
   * configure your utils here...
   */
  });
  await utils.migrate();

  runner = await run({
    taskList,
     /**
     * configure your worker here...
     */
  });

  // For cleaning worker properly :)
  nitroApp.hooks.hookOnce('close', async () => {
    await runner.stop();
  });
});