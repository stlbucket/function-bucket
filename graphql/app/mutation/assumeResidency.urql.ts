import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { ResidentFragmentDoc } from '../fragment/Resident.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type AssumeResidentMutationVariables = schema.Exact<{
  residentId: schema.Scalars['UUID']['input'];
}>;


export type AssumeResidentMutation = { __typename?: 'Mutation', assumeResidency?: { __typename?: 'AssumeResidencyPayload', resident?: { __typename?: 'Resident', id: any, profileId?: any | null, tenantId: any, tenantName: string, status: schema.ResidentStatus, displayName?: string | null, email: string, type: schema.ResidentType } | null } | null };


export const AssumeResidentDocument = gql`
    mutation AssumeResident($residentId: UUID!) {
  assumeResidency(input: {_residentId: $residentId}) {
    resident {
      ...Resident
    }
  }
}
    ${ResidentFragmentDoc}`;

export function useAssumeResidentMutation() {
  return Urql.useMutation<AssumeResidentMutation, AssumeResidentMutationVariables>(AssumeResidentDocument);
};