import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { TenantSubscriptionFragmentDoc } from '../fragment/TenantSubscription.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type DeactivateTenantSubscriptionMutationVariables = schema.Exact<{
  tenantSubscriptionId: schema.Scalars['UUID']['input'];
}>;


export type DeactivateTenantSubscriptionMutation = { __typename?: 'Mutation', deactivateTenantSubscription?: { __typename?: 'DeactivateTenantSubscriptionPayload', tenantSubscription?: { __typename?: 'TenantSubscription', id: any, licensePackKey: string, status: schema.TenantSubscriptionStatus } | null } | null };


export const DeactivateTenantSubscriptionDocument = gql`
    mutation DeactivateTenantSubscription($tenantSubscriptionId: UUID!) {
  deactivateTenantSubscription(
    input: {_tenantSubscriptionId: $tenantSubscriptionId}
  ) {
    tenantSubscription {
      ...TenantSubscription
    }
  }
}
    ${TenantSubscriptionFragmentDoc}`;

export function useDeactivateTenantSubscriptionMutation() {
  return Urql.useMutation<DeactivateTenantSubscriptionMutation, DeactivateTenantSubscriptionMutationVariables>(DeactivateTenantSubscriptionDocument);
};