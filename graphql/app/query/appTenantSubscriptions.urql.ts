import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { TenantSubscriptionFragmentDoc } from '../fragment/TenantSubscription.urql';
import { TenantFragmentDoc } from '../fragment/Tenant.urql';
import { LicensePackFragmentDoc } from '../fragment/LicensePack.urql';
import { LicensePackLicenseTypeFragmentDoc } from '../fragment/LicensePackLicenseType.urql';
import { LicenseTypeFragmentDoc } from '../fragment/LicenseType.urql';
import { LicenseTypePermissionFragmentDoc } from '../fragment/LicenseTypePermission.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type TenantSubscriptionsQueryVariables = schema.Exact<{
  tenantId: schema.Scalars['UUID']['input'];
}>;


export type TenantSubscriptionsQuery = { __typename?: 'Query', tenantSubscriptions?: Array<{ __typename?: 'TenantSubscription', id: any, licensePackKey: string, status: schema.TenantSubscriptionStatus, tenant?: { __typename?: 'Tenant', id: any, name: string, createdAt: any, identifier?: string | null, status: schema.TenantStatus, type: schema.TenantType, licenses: { __typename?: 'LicensesConnection', totalCount: number } } | null, licenses: { __typename?: 'LicensesConnection', totalCount: number }, licensePack?: { __typename?: 'LicensePack', key: string, displayName: string, description: string, licensePackLicenseTypes: Array<{ __typename?: 'LicensePackLicenseType', licensePackKey: string, licenseTypeKey: string, numberOfLicenses: number, expirationIntervalType: schema.ExpirationIntervalType, expirationIntervalMultiplier: number, issuedCount?: number | null, licenseType?: { __typename?: 'LicenseType', key: string, displayName: string, assignmentScope: schema.LicenseTypeAssignmentScope, permissions: Array<{ __typename?: 'LicenseTypePermission', licenseTypeKey: string, permissionKey: string }>, licenses: { __typename?: 'LicensesConnection', totalCount: number } } | null }> } | null }> | null };


export const TenantSubscriptionsDocument = gql`
    query TenantSubscriptions($tenantId: UUID!) {
  tenantSubscriptions: tenantSubscriptionsList(condition: {tenantId: $tenantId}) {
    ...TenantSubscription
    tenant {
      ...Tenant
    }
    licenses {
      totalCount
    }
    licensePack {
      ...LicensePack
      licensePackLicenseTypes: licensePackLicenseTypesByLicensePackKeyList {
        ...LicensePackLicenseType
        licenseType {
          ...LicenseType
          permissions: licenseTypePermissionsByLicenseTypeKeyList {
            ...LicenseTypePermission
          }
          licenses: licensesByLicenseTypeKey {
            totalCount
          }
        }
      }
    }
  }
}
    ${TenantSubscriptionFragmentDoc}
${TenantFragmentDoc}
${LicensePackFragmentDoc}
${LicensePackLicenseTypeFragmentDoc}
${LicenseTypeFragmentDoc}
${LicenseTypePermissionFragmentDoc}`;

export function useTenantSubscriptionsQuery(options: Omit<Urql.UseQueryArgs<never, TenantSubscriptionsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TenantSubscriptionsQuery>({ query: TenantSubscriptionsDocument, ...options });
};