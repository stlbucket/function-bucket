import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UpsertTopicMutationVariables = schema.Exact<{
  topicInfo: schema.TopicInfoInput;
}>;


export type UpsertTopicMutation = { __typename?: 'Mutation', upsertTopic?: { __typename?: 'UpsertTopicPayload', topic?: { __typename?: 'Topic', id: any, name: string, identifier?: string | null } | null } | null };


export const UpsertTopicDocument = gql`
    mutation UpsertTopic($topicInfo: TopicInfoInput!) {
  upsertTopic(input: {_topicInfo: $topicInfo}) {
    topic {
      id
      name
      identifier
    }
  }
}
    `;

export function useUpsertTopicMutation() {
  return Urql.useMutation<UpsertTopicMutation, UpsertTopicMutationVariables>(UpsertTopicDocument);
};