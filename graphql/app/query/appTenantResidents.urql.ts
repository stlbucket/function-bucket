import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { ResidentFragmentDoc } from '../fragment/Resident.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type TenantResidentsQueryVariables = schema.Exact<{ [key: string]: never; }>;


export type TenantResidentsQuery = { __typename?: 'Query', residents?: Array<{ __typename?: 'Resident', id: any, profileId?: any | null, tenantId: any, tenantName: string, status: schema.ResidentStatus, displayName?: string | null, email: string, type: schema.ResidentType }> | null };


export const TenantResidentsDocument = gql`
    query TenantResidents {
  residents: residentsList {
    ...Resident
  }
}
    ${ResidentFragmentDoc}`;

export function useTenantResidentsQuery(options: Omit<Urql.UseQueryArgs<never, TenantResidentsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TenantResidentsQuery>({ query: TenantResidentsDocument, ...options });
};