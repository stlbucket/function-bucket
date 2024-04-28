import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { LicensePackFragmentDoc } from '../fragment/LicensePack.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ActiveLicensePacksQueryVariables = schema.Exact<{ [key: string]: never; }>;


export type ActiveLicensePacksQuery = { __typename?: 'Query', licensePacksList?: Array<{ __typename?: 'LicensePack', key: string, displayName: string, description: string }> | null };


export const ActiveLicensePacksDocument = gql`
    query ActiveLicensePacks {
  licensePacksList {
    ...LicensePack
  }
}
    ${LicensePackFragmentDoc}`;

export function useActiveLicensePacksQuery(options: Omit<Urql.UseQueryArgs<never, ActiveLicensePacksQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ActiveLicensePacksQuery>({ query: ActiveLicensePacksDocument, ...options });
};