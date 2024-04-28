import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ThrowErrorQueryVariables = schema.Exact<{
  message?: schema.InputMaybe<schema.Scalars['String']['input']>;
}>;


export type ThrowErrorQuery = { __typename?: 'Query', throwError?: boolean | null };


export const ThrowErrorDocument = gql`
    query ThrowError($message: String) {
  throwError(_message: $message)
}
    `;

export function useThrowErrorQuery(options: Omit<Urql.UseQueryArgs<never, ThrowErrorQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ThrowErrorQuery>({ query: ThrowErrorDocument, ...options });
};