import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { TenantSubscriptionFragmentDoc } from '../fragment/TenantSubscription.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ReactivateTenantSubscriptionMutationVariables = schema.Exact<{
  tenantSubscriptionId: schema.Scalars['UUID']['input'];
}>;


export type ReactivateTenantSubscriptionMutation = { __typename?: 'Mutation', reactivateTenantSubscription?: { __typename?: 'ReactivateTenantSubscriptionPayload', tenantSubscription?: { __typename?: 'TenantSubscription', id: any, licensePackKey: string, status: schema.TenantSubscriptionStatus } | null } | null };


export const ReactivateTenantSubscriptionDocument = gql`
    mutation ReactivateTenantSubscription($tenantSubscriptionId: UUID!) {
  reactivateTenantSubscription(
    input: {_tenantSubscriptionId: $tenantSubscriptionId}
  ) {
    tenantSubscription {
      ...TenantSubscription
    }
  }
}
    ${TenantSubscriptionFragmentDoc}`;

export function useReactivateTenantSubscriptionMutation() {
  return Urql.useMutation<ReactivateTenantSubscriptionMutation, ReactivateTenantSubscriptionMutationVariables>(ReactivateTenantSubscriptionDocument);
};