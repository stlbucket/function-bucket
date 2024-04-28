import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { ProfileFragmentDoc } from '../fragment/Profile.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetMyselfQueryVariables = schema.Exact<{ [key: string]: never; }>;


export type GetMyselfQuery = { __typename?: 'Query', getMyself?: { __typename?: 'Profile', id: any, email: string, identifier?: string | null, firstName?: string | null, lastName?: string | null, fullName?: string | null, phone?: string | null, isPublic: boolean, displayName?: string | null, avatarKey?: string | null, status: schema.ProfileStatus, createdAt: any, updatedAt: any } | null };


export const GetMyselfDocument = gql`
    query GetMyself {
  getMyself {
    ...Profile
  }
}
    ${ProfileFragmentDoc}`;

export function useGetMyselfQuery(options: Omit<Urql.UseQueryArgs<never, GetMyselfQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetMyselfQuery>({ query: GetMyselfDocument, ...options });
};