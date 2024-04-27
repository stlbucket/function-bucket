import { filter, pipe, tap } from 'wonka';

import urql, { cacheExchange, mapExchange, fetchExchange, subscriptionExchange, type Exchange } from '@urql/vue';
import { createClient as createWSClient } from 'graphql-ws';
import { dedupExchange } from '@urql/core';

const GRAPHQL_ENDPOINT = 'localhost:3000/api/graphql'
const GRAPHQL_HTTP_URL = `http://${GRAPHQL_ENDPOINT}`
const GRAPHQL_WS_URL = `ws://${GRAPHQL_ENDPOINT}`

const wsClient = createWSClient({
  url: GRAPHQL_WS_URL,
});

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(urql, {
    url: GRAPHQL_HTTP_URL,
    exchanges: [
      dedupExchange,
      cacheExchange,
      mapExchange({
        onOperation(operation) {
          // console.log('OPERATION', JSON.stringify(operation,null,2))
        },
        onResult(result) {
          // console.log('RESULT', result)
        },
        onError(error) {
          console.log('ERROR', error)
          alert(error.message.replace('[GraphQL] ', ''))
        }
      }),
      fetchExchange,
      subscriptionExchange({
        forwardSubscription(request) {
          const input = { ...request, query: request.query || '' };
          return {
            subscribe(sink) {
              const unsubscribe = wsClient.subscribe(input, sink);
              return { unsubscribe };
            },
          };          
        }
      })
    ]
  });
});