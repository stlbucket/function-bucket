import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type DeleteLocationMutationVariables = schema.Exact<{
  locationId: schema.Scalars['UUID']['input'];
}>;


export type DeleteLocationMutation = { __typename?: 'Mutation', deleteLocation?: { __typename?: 'DeleteLocationPayload', boolean?: boolean | null } | null };


export const DeleteLocationDocument = gql`
    mutation DeleteLocation($locationId: UUID!) {
  deleteLocation(input: {_locationId: $locationId}) {
    boolean
  }
}
    `;

export function useDeleteLocationMutation() {
  return Urql.useMutation<DeleteLocationMutation, DeleteLocationMutationVariables>(DeleteLocationDocument);
};