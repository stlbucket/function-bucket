import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { TenantFragmentDoc } from '../fragment/Tenant.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateTenantMutationVariables = schema.Exact<{
  name: schema.Scalars['String']['input'];
  email: schema.Scalars['String']['input'];
}>;


export type CreateTenantMutation = { __typename?: 'Mutation', createTenant?: { __typename?: 'CreateTenantPayload', tenant?: { __typename?: 'Tenant', id: any, name: string, createdAt: any, identifier?: string | null, status: schema.TenantStatus, type: schema.TenantType, licenses: { __typename?: 'LicensesConnection', totalCount: number } } | null } | null };


export const CreateTenantDocument = gql`
    mutation CreateTenant($name: String!, $email: String!) {
  createTenant(input: {_name: $name, _email: $email}) {
    tenant {
      ...Tenant
    }
  }
}
    ${TenantFragmentDoc}`;

export function useCreateTenantMutation() {
  return Urql.useMutation<CreateTenantMutation, CreateTenantMutationVariables>(CreateTenantDocument);
};