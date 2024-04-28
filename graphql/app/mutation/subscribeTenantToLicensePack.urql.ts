import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { TenantSubscriptionFragmentDoc } from '../fragment/TenantSubscription.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SubscribeTenantToLicensePackMutationVariables = schema.Exact<{
  tenantId: schema.Scalars['UUID']['input'];
  licensePackKey: schema.Scalars['String']['input'];
}>;


export type SubscribeTenantToLicensePackMutation = { __typename?: 'Mutation', subscribeTenantToLicensePack?: { __typename?: 'SubscribeTenantToLicensePackPayload', tenantSubscription?: { __typename?: 'TenantSubscription', id: any, licensePackKey: string, status: schema.TenantSubscriptionStatus } | null } | null };


export const SubscribeTenantToLicensePackDocument = gql`
    mutation SubscribeTenantToLicensePack($tenantId: UUID!, $licensePackKey: String!) {
  subscribeTenantToLicensePack(
    input: {_tenantId: $tenantId, _licensePackKey: $licensePackKey}
  ) {
    tenantSubscription {
      ...TenantSubscription
    }
  }
}
    ${TenantSubscriptionFragmentDoc}`;

export function useSubscribeTenantToLicensePackMutation() {
  return Urql.useMutation<SubscribeTenantToLicensePackMutation, SubscribeTenantToLicensePackMutationVariables>(SubscribeTenantToLicensePackDocument);
};