import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { ResidentFragmentDoc } from '../fragment/Resident.urql';
import { LicenseFragmentDoc } from '../fragment/License.urql';
import { LicenseTypeFragmentDoc } from '../fragment/LicenseType.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type AllResidentsQueryVariables = schema.Exact<{ [key: string]: never; }>;


export type AllResidentsQuery = { __typename?: 'Query', residents?: Array<{ __typename?: 'Resident', id: any, profileId?: any | null, tenantId: any, tenantName: string, status: schema.ResidentStatus, displayName?: string | null, email: string, type: schema.ResidentType, licenses: Array<{ __typename?: 'License', id: any, licenseTypeKey: string, createdAt: any, expiresAt?: any | null, licenseType?: { __typename?: 'LicenseType', key: string, displayName: string, assignmentScope: schema.LicenseTypeAssignmentScope } | null }> }> | null };


export const AllResidentsDocument = gql`
    query AllResidents {
  residents: residentsList {
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

export function useAllResidentsQuery(options: Omit<Urql.UseQueryArgs<never, AllResidentsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllResidentsQuery>({ query: AllResidentsDocument, ...options });
};