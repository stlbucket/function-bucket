import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { ResidentFragmentDoc } from '../fragment/Resident.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SearchResidentsQueryVariables = schema.Exact<{
  searchTerm?: schema.InputMaybe<schema.Scalars['String']['input']>;
}>;


export type SearchResidentsQuery = { __typename?: 'Query', searchResidents?: { __typename?: 'ResidentsConnection', nodes: Array<{ __typename?: 'Resident', id: any, profileId?: any | null, tenantId: any, tenantName: string, status: schema.ResidentStatus, displayName?: string | null, email: string, type: schema.ResidentType } | null> } | null };


export const SearchResidentsDocument = gql`
    query SearchResidents($searchTerm: String) {
  searchResidents(_options: {searchTerm: $searchTerm}) {
    nodes {
      ...Resident
    }
  }
}
    ${ResidentFragmentDoc}`;

export function useSearchResidentsQuery(options: Omit<Urql.UseQueryArgs<never, SearchResidentsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SearchResidentsQuery>({ query: SearchResidentsDocument, ...options });
};