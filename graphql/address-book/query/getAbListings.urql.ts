import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAbListingsQueryVariables = schema.Exact<{ [key: string]: never; }>;


export type GetAbListingsQuery = { __typename?: 'Query', getAbListings?: Array<{ __typename?: 'AbListing', profileId?: any | null, fullName?: string | null, email?: string | null, phone?: string | null, displayName?: string | null, canInvite?: boolean | null } | null> | null };


export const GetAbListingsDocument = gql`
    query GetAbListings {
  getAbListings: getAbListingsList {
    profileId
    fullName
    email
    phone
    displayName
    canInvite
  }
}
    `;

export function useGetAbListingsQuery(options: Omit<Urql.UseQueryArgs<never, GetAbListingsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAbListingsQuery>({ query: GetAbListingsDocument, ...options });
};