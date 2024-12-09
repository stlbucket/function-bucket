const { makeWrapResolversPlugin } = require('graphile-utils')
import scheduleUows from "./_scheduleUows.js";
const workerUrl = process.env.WORKER_URL

const queueWorkflowPlugin =  makeWrapResolversPlugin({
  Mutation: {
    async queueWorkflow(resolve: any, source?: any, args?: any, context?: any, resolveInfo?: any) {
      try {
        // wait for the wf.queue_workflow function to complete
        const resolution = await resolve()

        // now schedule the uows that currently need to be executed
        await scheduleUows(resolution.data.uows_to_schedule)

        return resolution
        // return {
        //   ...resolution,
        //   data: {
        //     ...resolution.data
        //   },
        // }
      } catch (error) {
        throw error
      }
    },
  },
})

export default queueWorkflowPlugin
