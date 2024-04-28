import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { ResidentFragmentDoc } from '../fragment/Resident.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ExitSupportModeMutationVariables = schema.Exact<{ [key: string]: never; }>;


export type ExitSupportModeMutation = { __typename?: 'Mutation', exitSupportMode?: { __typename?: 'ExitSupportModePayload', resident?: { __typename?: 'Resident', id: any, profileId?: any | null, tenantId: any, tenantName: string, status: schema.ResidentStatus, displayName?: string | null, email: string, type: schema.ResidentType } | null } | null };


export const ExitSupportModeDocument = gql`
    mutation ExitSupportMode {
  exitSupportMode(input: {}) {
    resident {
      ...Resident
    }
  }
}
    ${ResidentFragmentDoc}`;

export function useExitSupportModeMutation() {
  return Urql.useMutation<ExitSupportModeMutation, ExitSupportModeMutationVariables>(ExitSupportModeDocument);
};