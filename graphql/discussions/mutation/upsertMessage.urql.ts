import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UpsertMessageMutationVariables = schema.Exact<{
  messageInfo: schema.MessageInfoInput;
}>;


export type UpsertMessageMutation = { __typename?: 'Mutation', upsertMessage?: { __typename?: 'UpsertMessagePayload', message?: { __typename?: 'Message', id: any, createdAt: any, content: string, tags: Array<string | null> } | null } | null };


export const UpsertMessageDocument = gql`
    mutation UpsertMessage($messageInfo: MessageInfoInput!) {
  upsertMessage(input: {_messageInfo: $messageInfo}) {
    message {
      id
      createdAt
      content
      tags
    }
  }
}
    `;

export function useUpsertMessageMutation() {
  return Urql.useMutation<UpsertMessageMutation, UpsertMessageMutationVariables>(UpsertMessageDocument);
};