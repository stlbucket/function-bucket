import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { ProfileFragmentDoc } from '../fragment/Profile.urql';
import { ResidentFragmentDoc } from '../fragment/Resident.urql';
import { LicenseFragmentDoc } from '../fragment/License.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type AllAppProfilesQueryVariables = schema.Exact<{ [key: string]: never; }>;


export type AllAppProfilesQuery = { __typename?: 'Query', profiles?: { __typename?: 'ProfilesConnection', nodes: Array<{ __typename?: 'Profile', id: any, email: string, identifier?: string | null, firstName?: string | null, lastName?: string | null, fullName?: string | null, phone?: string | null, isPublic: boolean, displayName?: string | null, avatarKey?: string | null, status: schema.ProfileStatus, createdAt: any, updatedAt: any, residents: Array<{ __typename?: 'Resident', id: any, profileId?: any | null, tenantId: any, tenantName: string, status: schema.ResidentStatus, displayName?: string | null, email: string, type: schema.ResidentType, licenses: Array<{ __typename?: 'License', id: any, licenseTypeKey: string, createdAt: any, expiresAt?: any | null }> }> } | null> } | null };


export const AllAppProfilesDocument = gql`
    query AllAppProfiles {
  profiles {
    nodes {
      ...Profile
      residents: residentsList {
        ...Resident
        licenses: licensesList {
          ...License
        }
      }
    }
  }
}
    ${ProfileFragmentDoc}
${ResidentFragmentDoc}
${LicenseFragmentDoc}`;

export function useAllAppProfilesQuery(options: Omit<Urql.UseQueryArgs<never, AllAppProfilesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllAppProfilesQuery>({ query: AllAppProfilesDocument, ...options });
};