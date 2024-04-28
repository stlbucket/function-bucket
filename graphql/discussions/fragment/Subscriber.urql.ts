import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
export type SubscriberFragment = { __typename?: 'Subscriber', id: any, status: schema.SubscriberStatus, lastRead: any, msgResident?: { __typename?: 'MsgResident', residentId: any, displayName: string } | null };

export const SubscriberFragmentDoc = gql`
    fragment Subscriber on Subscriber {
  id
  status
  lastRead
  msgResident {
    residentId
    displayName
  }
}
    `;