import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
export type TopicFragment = { __typename?: 'Topic', id: any, name: string, identifier?: string | null, status: schema.TopicStatus };

export const TopicFragmentDoc = gql`
    fragment Topic on Topic {
  id
  name
  identifier
  status
}
    `;