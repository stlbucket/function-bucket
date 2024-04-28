import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { LicenseFragmentDoc } from '../fragment/License.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GrantUserLicenseMutationVariables = schema.Exact<{
  residentId: schema.Scalars['UUID']['input'];
  licenseTypeKey: schema.Scalars['String']['input'];
}>;


export type GrantUserLicenseMutation = { __typename?: 'Mutation', grantUserLicense?: { __typename?: 'GrantUserLicensePayload', license?: { __typename?: 'License', id: any, licenseTypeKey: string, createdAt: any, expiresAt?: any | null } | null } | null };


export const GrantUserLicenseDocument = gql`
    mutation GrantUserLicense($residentId: UUID!, $licenseTypeKey: String!) {
  grantUserLicense(
    input: {_residentId: $residentId, _licenseTypeKey: $licenseTypeKey}
  ) {
    license {
      ...License
    }
  }
}
    ${LicenseFragmentDoc}`;

export function useGrantUserLicenseMutation() {
  return Urql.useMutation<GrantUserLicenseMutation, GrantUserLicenseMutationVariables>(GrantUserLicenseDocument);
};