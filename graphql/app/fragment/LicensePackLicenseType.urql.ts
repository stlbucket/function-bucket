import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
export type LicensePackLicenseTypeFragment = { __typename?: 'LicensePackLicenseType', licensePackKey: string, licenseTypeKey: string, numberOfLicenses: number, expirationIntervalType: schema.ExpirationIntervalType, expirationIntervalMultiplier: number, issuedCount?: number | null };

export const LicensePackLicenseTypeFragmentDoc = gql`
    fragment LicensePackLicenseType on LicensePackLicenseType {
  licensePackKey
  licenseTypeKey
  numberOfLicenses
  expirationIntervalType
  expirationIntervalMultiplier
  issuedCount
}
    `;