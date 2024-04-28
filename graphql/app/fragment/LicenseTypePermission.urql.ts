import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
export type LicenseTypePermissionFragment = { __typename?: 'LicenseTypePermission', licenseTypeKey: string, permissionKey: string };

export const LicenseTypePermissionFragmentDoc = gql`
    fragment LicenseTypePermission on LicenseTypePermission {
  licenseTypeKey
  permissionKey
}
    `;