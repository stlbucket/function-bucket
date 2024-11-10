// @/server/plugins/graphile-worker.ts
import { makeWorkerUtils, run } from 'graphile-worker';
import taskList from '~/lib/worker-task-handlers/index.js';

export default defineNitroPlugin(async (nitroApp: any) => {
  let runner;

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