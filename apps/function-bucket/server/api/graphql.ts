// /server/api/graphql.ts
import { CloseCode, makeServer } from 'graphql-ws';
import { makeGraphQLWSConfig } from 'postgraphile/grafserv';
// import { serv } from '@/server/grafserv/serv'; // <-- PATH TO YOUR SERV

import { postgraphile } from "postgraphile"
import { grafserv } from "grafserv/h3/v1";
import preset from "./graphile.config.js";

const pgl = postgraphile(preset);
const serv = pgl.createServ(grafserv);

const graphqlWsServer = makeServer(makeGraphQLWSConfig(serv));

export default eventHandler({
  /**
   * HTTP request handler
   */
  handler:  (event) => serv.handleGraphQLEvent(event),
  // handler:  serv.handleGraphQLEvent,
  /**
   * WS request handler
   */
  websocket: {
    open(peer: { ctx: { node: { ws: any; req: any; }; }; }) {
      const { ws: socket, req } = peer.ctx.node;
      const closed = graphqlWsServer.opened(
        {
          protocol: socket.protocol, // will be validated
          send: (data) =>
            new Promise((resolve, reject) => {
              socket.send(data, (err: Error) => (err ? reject(err) : resolve()));
            }), // control your data flow by timing the promise resolve
          close: (code, reason) => socket.close(code, reason), // there are protocol standard closures
          onMessage: (cb) =>
            socket.on('message', async (event: any) => {
              try {
                // wait for the the operation to complete
                // - if init message, waits for connect
                // - if query/mutation, waits for result
                // - if subscription, waits for complete
                await cb(event.toString());
              } catch (err: any) {
                try {
                  // all errors that could be thrown during the
                  // execution of operations will be caught here
                  socket.close(CloseCode.InternalServerError, err.message);
                } catch {
                  /*noop*/
                }
              }
            }),
        },
        // pass values to the `extra` field in the context
        { socket, request: req }
      );
      socket.once('close', closed);
    },
  },
});

// import { postgraphile } from "postgraphile"
// import { grafserv } from "grafserv/h3/v1";
// import preset from "./graphile.config.js";
// // utils/grafserv.mjs

// const pgl = postgraphile(preset);
// const serv = pgl.createServ(grafserv);

// export default defineEventHandler(async (event) => {
//   // console.log('blah', process.env.GRAPHQL_SCHEMAS)
//   return serv.handleGraphQLEvent(event)  
// })

// export { serv }