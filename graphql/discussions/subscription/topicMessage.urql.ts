import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { MessageFragmentDoc } from '../fragment/Message.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type TopicMessageSubscriptionVariables = schema.Exact<{
  topicId: schema.Scalars['UUID']['input'];
}>;


export type TopicMessageSubscription = { __typename?: 'Subscription', topicMessage?: { __typename?: 'TopicMessageSubscriptionPayload', event?: string | null, messageId?: any | null, message?: { __typename: 'Message', id: any, createdAt: any, status: schema.MessageStatus, content: string, postedBy?: { __typename?: 'MsgResident', residentId: any, displayName: string } | null } | null } | null };


export const TopicMessageDocument = gql`
    subscription TopicMessage($topicId: UUID!) {
  topicMessage(topicId: $topicId) {
    message {
      ...Message
      __typename
    }
    event
    messageId
  }
}
    ${MessageFragmentDoc}`;

export function useTopicMessageSubscription<R = TopicMessageSubscription>(options: Omit<Urql.UseSubscriptionArgs<never, TopicMessageSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandlerArg<TopicMessageSubscription, R>) {
  return Urql.useSubscription<TopicMessageSubscription, R, TopicMessageSubscriptionVariables>({ query: TopicMessageDocument, ...options }, handler);
};