import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { TopicFragmentDoc } from '../fragment/Topic.urql';
import { SubscriberFragmentDoc } from '../fragment/Subscriber.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type AllDiscussionsQueryVariables = schema.Exact<{ [key: string]: never; }>;


export type AllDiscussionsQuery = { __typename?: 'Query', topics?: { __typename?: 'TopicsConnection', nodes: Array<{ __typename?: 'Topic', id: any, name: string, identifier?: string | null, status: schema.TopicStatus, subscribers: Array<{ __typename?: 'Subscriber', id: any, status: schema.SubscriberStatus, lastRead: any, msgResident?: { __typename?: 'MsgResident', residentId: any, displayName: string } | null }>, messages: { __typename?: 'MessagesConnection', totalCount: number } } | null> } | null };


export const AllDiscussionsDocument = gql`
    query AllDiscussions {
  topics {
    nodes {
      ...Topic
      subscribers: subscribersList {
        ...Subscriber
      }
      messages {
        totalCount
      }
    }
  }
}
    ${TopicFragmentDoc}
${SubscriberFragmentDoc}`;

export function useAllDiscussionsQuery(options: Omit<Urql.UseQueryArgs<never, AllDiscussionsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllDiscussionsQuery>({ query: AllDiscussionsDocument, ...options });
};