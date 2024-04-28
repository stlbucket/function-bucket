import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { LicensePackFragmentDoc } from '../fragment/LicensePack.urql';
import { LicensePackLicenseTypeFragmentDoc } from '../fragment/LicensePackLicenseType.urql';
import { LicenseTypeFragmentDoc } from '../fragment/LicenseType.urql';
import { LicenseTypePermissionFragmentDoc } from '../fragment/LicenseTypePermission.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type AllLicensePacksQueryVariables = schema.Exact<{ [key: string]: never; }>;


export type AllLicensePacksQuery = { __typename?: 'Query', licensePacks?: Array<{ __typename?: 'LicensePack', key: string, displayName: string, description: string, licensePackLicenseTypes: Array<{ __typename?: 'LicensePackLicenseType', licensePackKey: string, licenseTypeKey: string, numberOfLicenses: number, expirationIntervalType: schema.ExpirationIntervalType, expirationIntervalMultiplier: number, issuedCount?: number | null, licenseType?: { __typename?: 'LicenseType', key: string, displayName: string, assignmentScope: schema.LicenseTypeAssignmentScope, permissions: Array<{ __typename?: 'LicenseTypePermission', licenseTypeKey: string, permissionKey: string }>, licenses: { __typename?: 'LicensesConnection', totalCount: number } } | null }>, tenantSubscriptions: { __typename?: 'TenantSubscriptionsConnection', totalCount: number } }> | null };


export const AllLicensePacksDocument = gql`
    query AllLicensePacks {
  licensePacks: licensePacksList {
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
    tenantSubscriptions: tenantSubscriptionsByLicensePackKey {
      totalCount
    }
  }
}
    ${LicensePackFragmentDoc}
${LicensePackLicenseTypeFragmentDoc}
${LicenseTypeFragmentDoc}
${LicenseTypePermissionFragmentDoc}`;

export function useAllLicensePacksQuery(options: Omit<Urql.UseQueryArgs<never, AllLicensePacksQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllLicensePacksQuery>({ query: AllLicensePacksDocument, ...options });
};