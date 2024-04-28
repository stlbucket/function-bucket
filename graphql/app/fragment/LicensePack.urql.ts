import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
export type LicensePackFragment = { __typename?: 'LicensePack', key: string, displayName: string, description: string };

export const LicensePackFragmentDoc = gql`
    fragment LicensePack on LicensePack {
  key
  displayName
  description
}
    `;