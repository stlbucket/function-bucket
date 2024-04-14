export default defineNuxtPlugin(() => {
  // useGqlError((err:any) => {
  //   // Only log during development
  //   if (useRuntimeConfig().NODE_ENV !== 'production') {
  //     for (const gqlError of err.gqlErrors) {
  //       console.error('[nuxt-graphql-client] [GraphQL error]', {
  //         client: err.client,
  //         statusCode: err.statusCode,
  //         operationType: err.operationType,
  //         operationName: err.operationName,
  //         gqlError
  //       })
  //     }
  //     const message = err.gqlErrors[0].message
  //     alert(message)
  //     if (message === 'INVALID SESSION') {
  //       navigateTo('/logout')
  //     }
  //   }

    // Handle different error cases
    // const tokenExpired = err.gqlErrors.some(e => e.message.includes('id-token-expired'))
    // const tokenRevoked = err.gqlErrors.some(e => e.message.includes('id-token-revoked'))
    // const unauthorized = err.gqlErrors.some(e => e.message.includes('invalid-claims') || e.message.includes('insufficient-permission'))

    // take action accordingly...
  // })
})

