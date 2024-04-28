import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
export type LocationFragment = { __typename?: 'Location', id: any, name?: string | null, address1?: string | null, address2?: string | null, city?: string | null, state?: string | null, country?: string | null, postalCode?: string | null, lat?: string | null, lon?: string | null };

export const LocationFragmentDoc = gql`
    fragment Location on Location {
  id
  name
  address1
  address2
  city
  state
  country
  postalCode
  lat
  lon
}
    `;