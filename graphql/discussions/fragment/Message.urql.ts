import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
export type MessageFragment = { __typename?: 'Message', id: any, createdAt: any, status: schema.MessageStatus, content: string, postedBy?: { __typename?: 'MsgResident', residentId: any, displayName: string } | null };

export const MessageFragmentDoc = gql`
    fragment Message on Message {
  id
  createdAt
  status
  content
  postedBy: postedByMsgResident {
    residentId
    displayName
  }
}
    `;