import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { ProfileClaimFragmentDoc } from '../fragment/ProfileClaim.urql';
import { ResidentFragmentDoc } from '../fragment/Resident.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CurrentProfileClaimsQueryVariables = schema.Exact<{ [key: string]: never; }>;


export type CurrentProfileClaimsQuery = { __typename?: 'Query', currentProfileClaims?: { __typename?: 'ProfileClaim', profileId?: any | null, tenantId?: any | null, residentId?: any | null, actualResidentId?: any | null, profileStatus?: schema.ProfileStatus | null, permissions?: Array<string | null> | null, email?: string | null, displayName?: string | null, tenantName?: string | null } | null, availableModules?: Array<{ __typename?: 'ModuleInfo', key?: string | null, name?: string | null, permissionKeys?: Array<string | null> | null, defaultIconKey?: string | null, ordinal?: number | null, toolsByModuleKeyList?: Array<{ __typename?: 'ToolInfo', key?: string | null, name?: string | null, permissionKeys?: Array<string | null> | null, defaultIconKey?: string | null, ordinal?: number | null, route?: string | null } | null> | null } | null> | null, activeResidency?: Array<{ __typename?: 'Resident', id: any, profileId?: any | null, tenantId: any, tenantName: string, status: schema.ResidentStatus, displayName?: string | null, email: string, type: schema.ResidentType }> | null };


export const CurrentProfileClaimsDocument = gql`
    query CurrentProfileClaims {
  currentProfileClaims {
    ...ProfileClaim
  }
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
  activeResidency: residentsList(condition: {status: ACTIVE}) {
    ...Resident
  }
}
    ${ProfileClaimFragmentDoc}
${ResidentFragmentDoc}`;

export function useCurrentProfileClaimsQuery(options: Omit<Urql.UseQueryArgs<never, CurrentProfileClaimsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CurrentProfileClaimsQuery>({ query: CurrentProfileClaimsDocument, ...options });
};