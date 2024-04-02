export default {
  title: 'SupaNuxtPhile',
  description: 'Build your idea quickly, query it (gra)fast!',
  ignoreDeadLinks: true,
  themeConfig: {
    siteTitle: 'SupaNuxtPhile',
    nav: [
      { text: 'Getting started', link: '/getting-started' },
      { text: 'Github', link: 'https://github.com/stlbucket/supanuxtbucket' },
    ],
    sidebar: [
      {
        items: [
          { text: 'Overview', link: '/overview' },
          { text: 'Getting started', link: '/getting-started' },
          { text: 'Demo Data', link: '/demo-tenants' },
          { text: 'Postraphile v5', link: '/postgraphile' },
          { text: 'Credentials Flow', link: '/credentials-flow' },
          { text: 'Typescript', link: '/typescript' },
          { text: 'Installing an Application', link: '/installing-an-application'},
          { text: 'Caveats', link: '/caveats' },
          {
            text: 'Schemas',
            link: '/schemas/index.schema',
            items: [
              { text: 'auth_ext', link: '/schemas/auth_ext.schema' },
              { text: 'app', link: '/schemas/app.schema' },
              { text: 'todo', link: '/schemas/todo.schema' },
              { text: 'msg', link: '/schemas/msg.schema' },
              { text: 'inc', link: '/schemas/inc.schema' },
            ],
          },
          // { text: 'UI Boilerplate', items: [
          //   { text: 'SiteAdmin', items: [
          //     { text: 'Applications', link: '/site-admin/applications' },
          //     { text: 'License Packs', link: '/site-admin/license-packs' },
          //     { text: 'Site Users', link: '/site-admin/site-users' },
          //     { text: 'Tenant Residents', link: '/site-admin/tenant-residents' },
          //     { text: 'Tenant Support', link: '/site-admin/tenant-support' },
          //   ]},
          //   { text: 'Admin', items: [
          //     { text: 'App Users', link: '/admin/app-users' },
          //     { text: 'Subscriptions', link: '/admin/subscriptions' },
          //   ]},
          //   { text: 'Tools', 
          //     link: '/tools/index',
          //     items: [
          //       { text: 'Todo', link: '/tools/todo-tool' },
          //       { text: 'Discussions', link: '/tools/discussions' },
          //       { text: 'Address Book', link: '/tools/address-book' },
          //     ]
          //   },
          //   { text: 'Incidents', items: [
          //     { text: 'Incidents', link: '/apps/incidents' },
          //   ]},
          // ]}
        ],
      },
    ],
  },

}
