# SupaNuxtPhile
[Documentation](https://supanuxtbucket-docs.vercel.app/)
## Purpose
This repo is intended to explore and illustrate a quick-start scenario for building MVPs that can be easily deployed to Supabase and the related ecosystem.
- Multi-tenancy support that includes the ability for individuals to work in many contexts, with varying permission levels depending on tenant residency.
- Minimal UI styling, with simple straightforward usage of Nuxt UI component library and basic Tailwind tweaks.  It should be relatively painless to swap in a different library as desired.
- A schema-based, modular approach to database design meant to be scalable in the short term, and ready for refactoring should major services need to be split off in the future.

The problem space is loosely defined as an incident management scenario, where group discussion and ad-hoc todo list tools are included with additional functionality to build a custom solution.

The combination of Nuxt, Postgraphile, and Supabase is a core aspect of this codebase.  Significant input from the Postgraphile community helped bring this together, and it will soon produce a proper Nuxt module.
## Core Techs:
- [Supabase](https://www.supabase.com)
- [Nuxt](https://nuxtjs.com)
- [Postgraphile](https://postgraphile.org/)
- [Nuxt UI](https://ui.nuxtlabs.com/getting-started)
- [Nuxt Graphql Client](https://nuxt-graphql-client.web.app/)
## A few relevant threads
- [could_supabase_rls_used_for_complex_authorization](https://www.reddit.com/r/Supabase/comments/15nem7t/could_supabase_rls_used_for_complex_authorization/)
- [is_supabase_rls_enough_for_an_mvp](https://www.reddit.com/r/Supabase/comments/151xp3w/is_supabase_rls_enough_for_an_mvp/)
- [is_supabase_capable_of_multi_tenancy](https://www.reddit.com/r/Supabase/comments/165kbqs/is_supabase_capable_of_multi_tenancy/)
- [how_would_one_set_up_supabase_with_multitenant](https://www.reddit.com/r/Supabase/comments/zauwim/how_would_one_set_up_supabase_with_multitenant/)
- [updated_multitenant_rolebased_access_control_for](https://www.reddit.com/r/Supabase/comments/16iz7gz/updated_multitenant_rolebased_access_control_for/)