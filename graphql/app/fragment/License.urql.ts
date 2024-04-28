import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
export type LicenseFragment = { __typename?: 'License', id: any, licenseTypeKey: string, createdAt: any, expiresAt?: any | null };

export const LicenseFragmentDoc = gql`
    fragment License on License {
  id
  licenseTypeKey
  createdAt
  expiresAt
}
    `;