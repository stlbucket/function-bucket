import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { TopicFragmentDoc } from '../fragment/Topic.urql';
import { SubscriberFragmentDoc } from '../fragment/Subscriber.urql';
import { MessageFragmentDoc } from '../fragment/Message.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type DiscussionByIdQueryVariables = schema.Exact<{
  topicId: schema.Scalars['UUID']['input'];
}>;


export type DiscussionByIdQuery = { __typename?: 'Query', topic?: { __typename?: 'Topic', id: any, name: string, identifier?: string | null, status: schema.TopicStatus, subscribers: Array<{ __typename?: 'Subscriber', id: any, status: schema.SubscriberStatus, lastRead: any, msgResident?: { __typename?: 'MsgResident', residentId: any, displayName: string } | null }>, messages: Array<{ __typename?: 'Message', id: any, createdAt: any, status: schema.MessageStatus, content: string, postedBy?: { __typename?: 'MsgResident', residentId: any, displayName: string } | null }> } | null };


export const DiscussionByIdDocument = gql`
    query DiscussionById($topicId: UUID!) {
  topic(id: $topicId) {
    ...Topic
    subscribers: subscribersList {
      ...Subscriber
    }
    messages: messagesList {
      ...Message
    }
  }
}
    ${TopicFragmentDoc}
${SubscriberFragmentDoc}
${MessageFragmentDoc}`;

export function useDiscussionByIdQuery(options: Omit<Urql.UseQueryArgs<never, DiscussionByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<DiscussionByIdQuery>({ query: DiscussionByIdDocument, ...options });
};