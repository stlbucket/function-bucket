import urql, { cacheExchange, fetchExchange, subscriptionExchange } from '@urql/vue';
import { createClient as createWSClient } from 'graphql-ws';

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
      cacheExchange,
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