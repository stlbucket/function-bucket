import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { TenantFragmentDoc } from '../fragment/Tenant.urql';
import { TenantSubscriptionFragmentDoc } from '../fragment/TenantSubscription.urql';
import { LicensePackFragmentDoc } from '../fragment/LicensePack.urql';
import { LicensePackLicenseTypeFragmentDoc } from '../fragment/LicensePackLicenseType.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SearchTenantsQueryVariables = schema.Exact<{
  searchTerm?: schema.InputMaybe<schema.Scalars['String']['input']>;
}>;


export type SearchTenantsQuery = { __typename?: 'Query', searchTenants?: { __typename?: 'TenantsConnection', nodes: Array<{ __typename?: 'Tenant', id: any, name: string, createdAt: any, identifier?: string | null, status: schema.TenantStatus, type: schema.TenantType, subscriptions: Array<{ __typename?: 'TenantSubscription', id: any, licensePackKey: string, status: schema.TenantSubscriptionStatus, licensePack?: { __typename?: 'LicensePack', key: string, displayName: string, description: string, licenseTypes: Array<{ __typename?: 'LicensePackLicenseType', licensePackKey: string, licenseTypeKey: string, numberOfLicenses: number, expirationIntervalType: schema.ExpirationIntervalType, expirationIntervalMultiplier: number, issuedCount?: number | null }> } | null }>, licenses: { __typename?: 'LicensesConnection', totalCount: number } } | null> } | null };


export const SearchTenantsDocument = gql`
    query SearchTenants($searchTerm: String) {
  searchTenants(_options: {searchTerm: $searchTerm}) {
    nodes {
      ...Tenant
      subscriptions: tenantSubscriptionsList(orderBy: LICENSE_PACK_KEY_ASC) {
        ...TenantSubscription
        licensePack {
          ...LicensePack
          licenseTypes: licensePackLicenseTypesByLicensePackKeyList(
            orderBy: LICENSE_TYPE_KEY_ASC
          ) {
            ...LicensePackLicenseType
          }
        }
      }
    }
  }
}
    ${TenantFragmentDoc}
${TenantSubscriptionFragmentDoc}
${LicensePackFragmentDoc}
${LicensePackLicenseTypeFragmentDoc}`;

export function useSearchTenantsQuery(options: Omit<Urql.UseQueryArgs<never, SearchTenantsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SearchTenantsQuery>({ query: SearchTenantsDocument, ...options });
};