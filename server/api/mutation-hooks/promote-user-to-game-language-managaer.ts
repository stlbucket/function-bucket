const { makeWrapResolversPlugin } = require('graphile-utils')
import queueWorkflow from './_queueWorkflow.js'

const promoteUserToGameLanguageManagerPlugin =  makeWrapResolversPlugin({
  Mutation: {
    async promoteUserToGameLanguageManager(resolve: any, source?: any, args?: any, context?: any, resolveInfo?: any) {
      // const { pgClient } = context;
      try {
        const resolution = await resolve()
        const appUser = resolution.data['@appUserAuth0Info']
        if (!appUser.permissions.find(p => p === 'r:no-login')) {
          await queueWorkflow(
            context,
            'auth0-sync-user',
            {
              appUserId: appUser.appUserId
            }
          )
        }

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

export default promoteUserToGameLanguageManagerPlugin

