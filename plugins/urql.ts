// import { createClient, ssrExchange, debugExchange, fetchExchange, Client } from '@urql/core';
// import { cacheExchange } from '@urql/exchange-graphcache'
import urql, { cacheExchange, fetchExchange } from '@urql/vue';

export default defineNuxtPlugin(nuxtApp => {

  // const ssrKey = '__URQL_DATA__'

  // const ssr = ssrExchange({
  //     isClient: process.client
  //   })

  // //Optional when app has rendered in server, send SSR state to client
  // if (process.server) {
  //     nuxtApp.hooks.hook('app:rendered', () => {
  //         nuxtApp.payload[ssrKey] = ssr.extractData() 
  //     })
  // }

  // //Optional when app is created in browser, restore SSR state from nuxt payload
  // if (process.client) {
  // nuxtApp.hooks.hook('app:created', () => {
  //   ssr.restoreData(nuxtApp.payload[ssrKey])
  // })
  // }


  // const client = createClient({
  //   url: 'http://localhost:3000/api/graphql', //I am using this with CORS
  //   exchanges: [
  //         // debugExchange,
  //         cacheExchange,  //You can change out some of the exchanges as you see fit
  //         // ssr, 
  //         fetchExchange,
  //     ],
  // });
  // console.log('client', client)

  nuxtApp.vueApp.use(urql, {
    url: 'http://localhost:3000/api/graphql',
    exchanges: [cacheExchange, fetchExchange]
  });
  // nuxtApp.vueApp.provide("Urql", client);
  // nuxtApp.vueApp.provide("$Urql", client);
  // nuxtApp.vueApp.provide("urql", client);
  // nuxtApp.vueApp.provide("$urql", client);

})