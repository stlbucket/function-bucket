import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { ResidentFragmentDoc } from '../fragment/Resident.urql';
import { LicenseFragmentDoc } from '../fragment/License.urql';
import { LicenseTypeFragmentDoc } from '../fragment/LicenseType.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type MyProfileResidenciesQueryVariables = schema.Exact<{ [key: string]: never; }>;


export type MyProfileResidenciesQuery = { __typename?: 'Query', myProfileResidenciesList?: Array<{ __typename?: 'Resident', id: any, profileId?: any | null, tenantId: any, tenantName: string, status: schema.ResidentStatus, displayName?: string | null, email: string, type: schema.ResidentType, licenses: Array<{ __typename?: 'License', id: any, licenseTypeKey: string, createdAt: any, expiresAt?: any | null, licenseType?: { __typename?: 'LicenseType', key: string, displayName: string, assignmentScope: schema.LicenseTypeAssignmentScope } | null }> } | null> | null };


export const MyProfileResidenciesDocument = gql`
    query MyProfileResidencies {
  myProfileResidenciesList {
    ...Resident
    licenses: licensesList {
      ...License
      licenseType {
        ...LicenseType
      }
    }
  }
}
    ${ResidentFragmentDoc}
${LicenseFragmentDoc}
${LicenseTypeFragmentDoc}`;

export function useMyProfileResidenciesQuery(options: Omit<Urql.UseQueryArgs<never, MyProfileResidenciesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MyProfileResidenciesQuery>({ query: MyProfileResidenciesDocument, ...options });
};