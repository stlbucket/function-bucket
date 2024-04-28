import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { TenantFragmentDoc } from '../fragment/Tenant.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type DeactivateTenantMutationVariables = schema.Exact<{
  tenantId: schema.Scalars['UUID']['input'];
}>;


export type DeactivateTenantMutation = { __typename?: 'Mutation', deactivateTenant?: { __typename?: 'DeactivateTenantPayload', tenant?: { __typename?: 'Tenant', id: any, name: string, createdAt: any, identifier?: string | null, status: schema.TenantStatus, type: schema.TenantType, licenses: { __typename?: 'LicensesConnection', totalCount: number } } | null } | null };


export const DeactivateTenantDocument = gql`
    mutation DeactivateTenant($tenantId: UUID!) {
  deactivateTenant(input: {_tenantId: $tenantId}) {
    tenant {
      ...Tenant
    }
  }
}
    ${TenantFragmentDoc}`;

export function useDeactivateTenantMutation() {
  return Urql.useMutation<DeactivateTenantMutation, DeactivateTenantMutationVariables>(DeactivateTenantDocument);
};