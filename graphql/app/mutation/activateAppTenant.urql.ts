import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { TenantFragmentDoc } from '../fragment/Tenant.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ActivateTenantMutationVariables = schema.Exact<{
  tenantId: schema.Scalars['UUID']['input'];
}>;


export type ActivateTenantMutation = { __typename?: 'Mutation', activateTenant?: { __typename?: 'ActivateTenantPayload', tenant?: { __typename?: 'Tenant', id: any, name: string, createdAt: any, identifier?: string | null, status: schema.TenantStatus, type: schema.TenantType, licenses: { __typename?: 'LicensesConnection', totalCount: number } } | null } | null };


export const ActivateTenantDocument = gql`
    mutation ActivateTenant($tenantId: UUID!) {
  activateTenant(input: {_tenantId: $tenantId}) {
    tenant {
      ...Tenant
    }
  }
}
    ${TenantFragmentDoc}`;

export function useActivateTenantMutation() {
  return Urql.useMutation<ActivateTenantMutation, ActivateTenantMutationVariables>(ActivateTenantDocument);
};