import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RevokeUserLicenseMutationVariables = schema.Exact<{
  licenseId: schema.Scalars['UUID']['input'];
}>;


export type RevokeUserLicenseMutation = { __typename?: 'Mutation', revokeUserLicense?: { __typename?: 'RevokeUserLicensePayload', boolean?: boolean | null } | null };


export const RevokeUserLicenseDocument = gql`
    mutation RevokeUserLicense($licenseId: UUID!) {
  revokeUserLicense(input: {_licenseId: $licenseId}) {
    boolean
  }
}
    `;

export function useRevokeUserLicenseMutation() {
  return Urql.useMutation<RevokeUserLicenseMutation, RevokeUserLicenseMutationVariables>(RevokeUserLicenseDocument);
};