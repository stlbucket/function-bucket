import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type LeaveAddressBookMutationVariables = schema.Exact<{ [key: string]: never; }>;


export type LeaveAddressBookMutation = { __typename?: 'Mutation', leaveAddressBook?: { __typename?: 'LeaveAddressBookPayload', profile?: { __typename?: 'Profile', id: any, email: string, displayName?: string | null, firstName?: string | null, lastName?: string | null, phone?: string | null, fullName?: string | null, isPublic: boolean } | null } | null };


export const LeaveAddressBookDocument = gql`
    mutation LeaveAddressBook {
  leaveAddressBook(input: {}) {
    profile {
      id
      email
      displayName
      firstName
      lastName
      phone
      fullName
      isPublic
    }
  }
}
    `;

export function useLeaveAddressBookMutation() {
  return Urql.useMutation<LeaveAddressBookMutation, LeaveAddressBookMutationVariables>(LeaveAddressBookDocument);
};