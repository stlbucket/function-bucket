// https://nuxt.com/docs/api/configuration/nuxt-config
// import defaultTheme from 'tailwindcss/defaultTheme'
export default defineNuxtConfig({
  ssr: false,
  nitro: {
    experimental: {
      websocket: true
    }
  },
  piniaPersistedstate: {
    storage: 'localStorage'
  },
  buildModules: [
    '@nuxtjs/pwa',
  ],
  pwa: {
    
  },
  supabase: {
    redirect: false,
    redirectOptions: {
      login: '/login',
      callback: '/authenticated',
      exclude: [],
    },
    cookieOptions: {
      // maxAge: 60 * 5,
      maxAge: 60 * 60 * 8,
      sameSite: 'lax',
      secure: true
    },
    clientOptions: {
      // auth: {
      //   flowType: 'pkce',
      //   detectSessionInUrl: true,
      //   persistSession: true,
      //   autoRefreshToken: true
      // },
    }
  },
  imports: {
    dirs: [
      'lib'
      ,'store'
      ,'types'
      ,'graphql'
    ],
    global: true
  },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt3-leaflet'
  ],
  pinia: {
    autoImports: [
      ['defineStore', 'definePiniaStore'],
    ],
  },
  devtools: { enabled: true },
  css: [
    '@/assets/css/main.scss'
  ],
  devServer: {
    port: 3000
  },
  runtimeConfig: {
    SUPABASE_SERVICE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU',
    SUPABASE_JWT_SECRET: 'super-secret-jwt-token-with-at-least-32-characters-long',    
    SUPABASE_URI: 'postgresql://postgres:postgres@localhost:54322/postgres',
    GQL_HOST: 'http://localhost:3000/api/graphql',
    GRAPHILE_DEBUG_LOG: false,
    public: {
      PROTOTYPE_MODE: false,
      DEMO_MODE: false,
      ENABLE_DEV_TOOLS: false,
      GQL_HOST: 'http://localhost:3000/api/graphql',
      SUPABASE_URL: 'http://localhost:54321',
      SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
      'graphql-client': {
        clients: {
          default: {
            host: 'http://localhost:3000/api/graphql'
          }
        }
      }
    }  
  },
  components: {
    "dirs": [
      {
        "path": "~/components",
        "pathPrefix": false,
        "global": true
      },
    ]
  },
  ignore: [
    "server/api/mutation-hooks/**"
  ],
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            'bermuda': '#78dcca',
            'ash-grey': {
              100: '#B9C8CB',
              200: '#A1B6BA',
              300: '#8AA3A8',
              400: '#729197',
              500: '#5F7B81',
              600: '#4E656A',
              700: '#3D4E52',
              800: '#2B383B',
              900: '#1A2223',
            },
          }
        }
      }  
    }
  }
})
