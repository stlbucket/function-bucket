import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
export type TenantSubscriptionFragment = { __typename?: 'TenantSubscription', id: any, licensePackKey: string, status: schema.TenantSubscriptionStatus };

export const TenantSubscriptionFragmentDoc = gql`
    fragment TenantSubscription on TenantSubscription {
  id
  licensePackKey
  status
}
    `;