import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
export type ProfileFragment = { __typename?: 'Profile', id: any, email: string, identifier?: string | null, firstName?: string | null, lastName?: string | null, fullName?: string | null, phone?: string | null, isPublic: boolean, displayName?: string | null, avatarKey?: string | null, status: schema.ProfileStatus, createdAt: any, updatedAt: any };

export const ProfileFragmentDoc = gql`
    fragment Profile on Profile {
  id
  email
  identifier
  firstName
  lastName
  fullName
  phone
  isPublic
  displayName
  avatarKey
  status
  createdAt
  updatedAt
}
    `;