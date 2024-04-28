import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { ProfileFragmentDoc } from '../fragment/Profile.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SearchProfilesQueryVariables = schema.Exact<{
  searchTerm?: schema.InputMaybe<schema.Scalars['String']['input']>;
}>;


export type SearchProfilesQuery = { __typename?: 'Query', searchProfiles?: { __typename?: 'ProfilesConnection', nodes: Array<{ __typename?: 'Profile', id: any, email: string, identifier?: string | null, firstName?: string | null, lastName?: string | null, fullName?: string | null, phone?: string | null, isPublic: boolean, displayName?: string | null, avatarKey?: string | null, status: schema.ProfileStatus, createdAt: any, updatedAt: any } | null> } | null };


export const SearchProfilesDocument = gql`
    query SearchProfiles($searchTerm: String) {
  searchProfiles(_options: {searchTerm: $searchTerm}) {
    nodes {
      ...Profile
    }
  }
}
    ${ProfileFragmentDoc}`;

export function useSearchProfilesQuery(options: Omit<Urql.UseQueryArgs<never, SearchProfilesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SearchProfilesQuery>({ query: SearchProfilesDocument, ...options });
};