import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { TenantFragmentDoc } from '../fragment/Tenant.urql';
import { TenantSubscriptionFragmentDoc } from '../fragment/TenantSubscription.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type TenantByIdQueryVariables = schema.Exact<{
  tenantId: schema.Scalars['UUID']['input'];
}>;


export type TenantByIdQuery = { __typename?: 'Query', tenant?: { __typename?: 'Tenant', id: any, name: string, createdAt: any, identifier?: string | null, status: schema.TenantStatus, type: schema.TenantType, residents: { __typename?: 'ResidentsConnection', totalCount: number }, tenantSubscriptions: Array<{ __typename?: 'TenantSubscription', id: any, licensePackKey: string, status: schema.TenantSubscriptionStatus, licenses: { __typename?: 'LicensesConnection', totalCount: number } }>, licenses: { __typename?: 'LicensesConnection', totalCount: number } } | null };


export const TenantByIdDocument = gql`
    query TenantById($tenantId: UUID!) {
  tenant(id: $tenantId) {
    ...Tenant
    residents: residents {
      totalCount
    }
    tenantSubscriptions: tenantSubscriptionsList {
      ...TenantSubscription
      licenses: licenses {
        totalCount
      }
    }
  }
}
    ${TenantFragmentDoc}
${TenantSubscriptionFragmentDoc}`;

export function useTenantByIdQuery(options: Omit<Urql.UseQueryArgs<never, TenantByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TenantByIdQuery>({ query: TenantByIdDocument, ...options });
};