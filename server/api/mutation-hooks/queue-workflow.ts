const { makeWrapResolversPlugin } = require('graphile-utils')
import scheduleUows from "./_scheduleUows.js";
const workerUrl = process.env.WORKER_URL

const queueWorkflowPlugin =  makeWrapResolversPlugin({
  Mutation: {
    async queueWorkflow(resolve: any, source?: any, args?: any, context?: any, resolveInfo?: any) {
      try {
        const resolution = await resolve()
        await scheduleUows(resolution.data.uows_to_schedule)

        return {
          ...resolution,
          data: {
            ...resolution.data
          },
        }
      } catch (error) {
        throw error
      }
    },
  },
})

export default queueWorkflowPlugin
