import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { ProfileFragmentDoc } from '../fragment/Profile.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UpdateProfileMutationVariables = schema.Exact<{
  displayName: schema.Scalars['String']['input'];
  firstName: schema.Scalars['String']['input'];
  lastName: schema.Scalars['String']['input'];
  phone?: schema.InputMaybe<schema.Scalars['String']['input']>;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile?: { __typename?: 'UpdateProfilePayload', profile?: { __typename?: 'Profile', id: any, email: string, identifier?: string | null, firstName?: string | null, lastName?: string | null, fullName?: string | null, phone?: string | null, isPublic: boolean, displayName?: string | null, avatarKey?: string | null, status: schema.ProfileStatus, createdAt: any, updatedAt: any } | null } | null };


export const UpdateProfileDocument = gql`
    mutation UpdateProfile($displayName: String!, $firstName: String!, $lastName: String!, $phone: String) {
  updateProfile(
    input: {_displayName: $displayName, _firstName: $firstName, _lastName: $lastName, _phone: $phone}
  ) {
    profile {
      ...Profile
    }
  }
}
    ${ProfileFragmentDoc}`;

export function useUpdateProfileMutation() {
  return Urql.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument);
};