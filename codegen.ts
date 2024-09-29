import type { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: 'http://localhost:3000/api/graphql',
  documents: ['./graphql/**/*.graphql'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    'graphql/schema.json': {
      plugins: [
        'introspection'
      ]
    },
    'graphql/schema.min.json': {
      plugins: [
        'urql-introspection'
      ]
    },
    'graphql/api.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-vue-urql',
      ],
      config: {
        gqlImport: '@urql/vue#gql',
        arrayInputCoercion: false,
        nonOptionalTypename: true
      }
    },
  }
}
 
export default config
