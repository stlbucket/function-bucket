import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { ResidentFragmentDoc } from '../fragment/Resident.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type BlockResidentMutationVariables = schema.Exact<{
  residentId: schema.Scalars['UUID']['input'];
}>;


export type BlockResidentMutation = { __typename?: 'Mutation', blockResident?: { __typename?: 'BlockResidentPayload', resident?: { __typename?: 'Resident', id: any, profileId?: any | null, tenantId: any, tenantName: string, status: schema.ResidentStatus, displayName?: string | null, email: string, type: schema.ResidentType } | null } | null };


export const BlockResidentDocument = gql`
    mutation BlockResident($residentId: UUID!) {
  blockResident(input: {_residentId: $residentId}) {
    resident {
      ...Resident
    }
  }
}
    ${ResidentFragmentDoc}`;

export function useBlockResidentMutation() {
  return Urql.useMutation<BlockResidentMutation, BlockResidentMutationVariables>(BlockResidentDocument);
};