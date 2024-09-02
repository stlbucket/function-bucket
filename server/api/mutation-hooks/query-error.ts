const { makePluginHook } = require("postgraphile");

const queryErrorInspectorPlugin = {
  ["postgraphile:http:handler"](req, { res }) {
    console.log('HEYO')
    return req;
  },
};

const plugin = makePluginHook([queryErrorInspectorPlugin])

export default plugin

// const pluginHook = makePluginHook([
//   queryErrorInspector()
// ]);

// export default pluginHook

// const { makeWrapResolversPlugin } = require('graphile-utils')

// const queryError =  makeWrapResolversPlugin({
//   Query: {
//     async errorReportSearch(resolve: any, source?: any, args?: any, context?: any, resolveInfo?: any) {
//       try {
//         const resolution = await resolve()

//         return resolution
//       } catch (error) {
//         console.log(error)
//         throw error
//       }
//     },
//   },
// })

// export default queryError

