# Caveats
## Edge Deployment
Until [schema-only usage](https://postgraphile.org/postgraphile/next/usage-schema) is ready in postgraphile, we are unable to deploy to edge workers such as Vercel or Cloudflare (or Lambda).

This issue is on the current roadmap for postgraphile, and should be resolved in the near future.

Docker-based deployment environments such as Cloud Run etc. are a straightforward way to deploy for now.
## Realtime
Currently, graphql subscriptions do not work, but they will as soon as both Nuxt and Postgraphile release a couple of bug-fixes and pull-requests.

This has all been tested here: https://github.com/Dodobibi/postgraphile-nuxt and it is planned to be evolved into a nuxt module.

The messaging (and maybe todo) features of this repository will be updated with this functionality when it is available.

However, even then, subscriptions will not work in edge environments, as they do not support websockets.

If edge execution is required, an approach (using the message/topic app herein) would be to load the initial topic as it works today, and to use the supabase realtime client to listen for updates directly from the browser.