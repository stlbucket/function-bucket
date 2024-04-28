import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { LocationFragmentDoc } from '../fragment/Location.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type AllLocationsQueryVariables = schema.Exact<{ [key: string]: never; }>;


export type AllLocationsQuery = { __typename?: 'Query', locations?: Array<{ __typename?: 'Location', id: any, name?: string | null, address1?: string | null, address2?: string | null, city?: string | null, state?: string | null, country?: string | null, postalCode?: string | null, lat?: string | null, lon?: string | null }> | null };


export const AllLocationsDocument = gql`
    query AllLocations {
  locations: locationsList {
    ...Location
  }
}
    ${LocationFragmentDoc}`;

export function useAllLocationsQuery(options: Omit<Urql.UseQueryArgs<never, AllLocationsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllLocationsQuery>({ query: AllLocationsDocument, ...options });
};