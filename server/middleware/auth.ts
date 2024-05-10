import { H3Event } from 'h3'
import { getH3EventClaims } from '~/server/_common/get-h3-event-claims.js'

export default defineEventHandler(async (event: H3Event) => {
  // graphql request claims must be checked in the context handler in graphile.config.ts
  if (event.node.req.url !== '/api/graphql') {
    await getH3EventClaims(event)
  }
})
