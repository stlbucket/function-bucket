import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type AvailableModulesQueryVariables = schema.Exact<{ [key: string]: never; }>;


export type AvailableModulesQuery = { __typename?: 'Query', availableModules?: Array<{ __typename?: 'ModuleInfo', key?: string | null, name?: string | null, permissionKeys?: Array<string | null> | null, defaultIconKey?: string | null, ordinal?: number | null, toolsByModuleKeyList?: Array<{ __typename?: 'ToolInfo', key?: string | null, name?: string | null, permissionKeys?: Array<string | null> | null, defaultIconKey?: string | null, ordinal?: number | null, route?: string | null } | null> | null } | null> | null };


export const AvailableModulesDocument = gql`
    query AvailableModules {
  availableModules {
    key
    name
    permissionKeys
    defaultIconKey
    ordinal
    toolsByModuleKeyList: tools {
      key
      name
      permissionKeys
      defaultIconKey
      ordinal
      route
    }
  }
}
    `;

export function useAvailableModulesQuery(options: Omit<Urql.UseQueryArgs<never, AvailableModulesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AvailableModulesQuery>({ query: AvailableModulesDocument, ...options });
};