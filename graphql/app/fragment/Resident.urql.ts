import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
export type ResidentFragment = { __typename?: 'Resident', id: any, profileId?: any | null, tenantId: any, tenantName: string, status: schema.ResidentStatus, displayName?: string | null, email: string, type: schema.ResidentType };

export const ResidentFragmentDoc = gql`
    fragment Resident on Resident {
  id
  profileId
  tenantId
  tenantName
  status
  displayName
  email
  type
  tenantId
}
    `;