import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { ApplicationFragmentDoc } from '../fragment/Application.urql';
import { LicenseTypeFragmentDoc } from '../fragment/LicenseType.urql';
import { LicenseTypePermissionFragmentDoc } from '../fragment/LicenseTypePermission.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type AllApplicationsQueryVariables = schema.Exact<{ [key: string]: never; }>;


export type AllApplicationsQuery = { __typename?: 'Query', applications?: Array<{ __typename?: 'Application', key: string, name: string, licenseTypes: Array<{ __typename?: 'LicenseType', key: string, displayName: string, assignmentScope: schema.LicenseTypeAssignmentScope, permissions: Array<{ __typename?: 'LicenseTypePermission', licenseTypeKey: string, permissionKey: string }>, licenses: { __typename?: 'LicensesConnection', totalCount: number } }> }> | null };


export const AllApplicationsDocument = gql`
    query AllApplications {
  applications: applicationsList {
    ...Application
    licenseTypes: licenseTypesByApplicationKeyList {
      ...LicenseType
      permissions: licenseTypePermissionsByLicenseTypeKeyList {
        ...LicenseTypePermission
      }
      licenses: licensesByLicenseTypeKey {
        totalCount
      }
    }
  }
}
    ${ApplicationFragmentDoc}
${LicenseTypeFragmentDoc}
${LicenseTypePermissionFragmentDoc}`;

export function useAllApplicationsQuery(options: Omit<Urql.UseQueryArgs<never, AllApplicationsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllApplicationsQuery>({ query: AllApplicationsDocument, ...options });
};