import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
export type TenantFragment = { __typename?: 'Tenant', id: any, name: string, createdAt: any, identifier?: string | null, status: schema.TenantStatus, type: schema.TenantType, licenses: { __typename?: 'LicensesConnection', totalCount: number } };

export const TenantFragmentDoc = gql`
    fragment Tenant on Tenant {
  id
  name
  createdAt
  identifier
  status
  type
  licenses {
    totalCount
  }
}
    `;