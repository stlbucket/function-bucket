import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { ResidentFragmentDoc } from '../fragment/Resident.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type BecomeSupportMutationVariables = schema.Exact<{
  tenantId: schema.Scalars['UUID']['input'];
}>;


export type BecomeSupportMutation = { __typename?: 'Mutation', becomeSupport?: { __typename?: 'BecomeSupportPayload', resident?: { __typename?: 'Resident', id: any, profileId?: any | null, tenantId: any, tenantName: string, status: schema.ResidentStatus, displayName?: string | null, email: string, type: schema.ResidentType } | null } | null };


export const BecomeSupportDocument = gql`
    mutation BecomeSupport($tenantId: UUID!) {
  becomeSupport(input: {_tenantId: $tenantId}) {
    resident {
      ...Resident
    }
  }
}
    ${ResidentFragmentDoc}`;

export function useBecomeSupportMutation() {
  return Urql.useMutation<BecomeSupportMutation, BecomeSupportMutationVariables>(BecomeSupportDocument);
};