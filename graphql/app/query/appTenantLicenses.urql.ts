import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { LicenseFragmentDoc } from '../fragment/License.urql';
import { ResidentFragmentDoc } from '../fragment/Resident.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type TenantLicensesQueryVariables = schema.Exact<{ [key: string]: never; }>;


export type TenantLicensesQuery = { __typename?: 'Query', tenantLicenses?: Array<{ __typename?: 'License', id: any, licenseTypeKey: string, createdAt: any, expiresAt?: any | null, resident?: { __typename?: 'Resident', id: any, profileId?: any | null, tenantId: any, tenantName: string, status: schema.ResidentStatus, displayName?: string | null, email: string, type: schema.ResidentType } | null } | null> | null };


export const TenantLicensesDocument = gql`
    query TenantLicenses {
  tenantLicenses: tenantLicensesList {
    ...License
    resident {
      ...Resident
    }
  }
}
    ${LicenseFragmentDoc}
${ResidentFragmentDoc}`;

export function useTenantLicensesQuery(options: Omit<Urql.UseQueryArgs<never, TenantLicensesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TenantLicensesQuery>({ query: TenantLicensesDocument, ...options });
};