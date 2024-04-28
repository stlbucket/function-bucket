import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { ResidentFragmentDoc } from '../fragment/Resident.urql';
import { LicenseFragmentDoc } from '../fragment/License.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ResidentByIdQueryVariables = schema.Exact<{
  residentId: schema.Scalars['UUID']['input'];
}>;


export type ResidentByIdQuery = { __typename?: 'Query', resident?: { __typename?: 'Resident', id: any, profileId?: any | null, tenantId: any, tenantName: string, status: schema.ResidentStatus, displayName?: string | null, email: string, type: schema.ResidentType, licenses: Array<{ __typename?: 'License', id: any, licenseTypeKey: string, createdAt: any, expiresAt?: any | null }> } | null };


export const ResidentByIdDocument = gql`
    query ResidentById($residentId: UUID!) {
  resident(id: $residentId) {
    ...Resident
    licenses: licensesList {
      ...License
    }
  }
}
    ${ResidentFragmentDoc}
${LicenseFragmentDoc}`;

export function useResidentByIdQuery(options: Omit<Urql.UseQueryArgs<never, ResidentByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ResidentByIdQuery>({ query: ResidentByIdDocument, ...options });
};