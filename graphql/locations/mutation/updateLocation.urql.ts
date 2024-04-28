import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { LocationFragmentDoc } from '../fragment/Location.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UpdateLocationMutationVariables = schema.Exact<{
  locationInfo: schema.LocationInfoInput;
}>;


export type UpdateLocationMutation = { __typename?: 'Mutation', updateLocation?: { __typename?: 'UpdateLocationPayload', location?: { __typename?: 'Location', id: any, name?: string | null, address1?: string | null, address2?: string | null, city?: string | null, state?: string | null, country?: string | null, postalCode?: string | null, lat?: string | null, lon?: string | null } | null } | null };


export const UpdateLocationDocument = gql`
    mutation UpdateLocation($locationInfo: LocationInfoInput!) {
  updateLocation(input: {_locationInfo: $locationInfo}) {
    location {
      ...Location
    }
  }
}
    ${LocationFragmentDoc}`;

export function useUpdateLocationMutation() {
  return Urql.useMutation<UpdateLocationMutation, UpdateLocationMutationVariables>(UpdateLocationDocument);
};