import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
export type ProfileClaimFragment = { __typename?: 'ProfileClaim', profileId?: any | null, tenantId?: any | null, residentId?: any | null, actualResidentId?: any | null, profileStatus?: schema.ProfileStatus | null, permissions?: Array<string | null> | null, email?: string | null, displayName?: string | null, tenantName?: string | null };

export const ProfileClaimFragmentDoc = gql`
    fragment ProfileClaim on ProfileClaim {
  profileId
  tenantId
  residentId
  actualResidentId
  profileStatus
  permissions
  email
  displayName
  tenantName
}
    `;