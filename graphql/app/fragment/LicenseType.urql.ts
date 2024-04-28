import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
export type LicenseTypeFragment = { __typename?: 'LicenseType', key: string, displayName: string, assignmentScope: schema.LicenseTypeAssignmentScope };

export const LicenseTypeFragmentDoc = gql`
    fragment LicenseType on LicenseType {
  key
  displayName
  assignmentScope
}
    `;