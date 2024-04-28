import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
export type ApplicationFragment = { __typename?: 'Application', key: string, name: string };

export const ApplicationFragmentDoc = gql`
    fragment Application on Application {
  key
  name
}
    `;