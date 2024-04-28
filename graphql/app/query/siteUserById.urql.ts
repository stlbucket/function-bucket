import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SiteUserByIdQueryVariables = schema.Exact<{
  id: schema.Scalars['UUID']['input'];
}>;


export type SiteUserByIdQuery = { __typename?: 'Query', siteUserById?: any | null };


export const SiteUserByIdDocument = gql`
    query SiteUserById($id: UUID!) {
  siteUserById(_id: $id)
}
    `;

export function useSiteUserByIdQuery(options: Omit<Urql.UseQueryArgs<never, SiteUserByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SiteUserByIdQuery>({ query: SiteUserByIdDocument, ...options });
};