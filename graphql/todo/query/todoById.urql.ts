import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { TodoFragmentDoc } from '../fragment/Todo.urql';
import { LocationFragmentDoc } from '../../locations/fragment/Location.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type TodoByIdQueryVariables = schema.Exact<{
  id: schema.Scalars['UUID']['input'];
}>;


export type TodoByIdQuery = { __typename?: 'Query', todo?: { __typename?: 'Todo', id: any, name: string, description?: string | null, type: schema.TodoType, status: schema.TodoStatus, createdAt: any, updatedAt: any, parentTodoId?: any | null, rootTodoId: any, isTemplate: boolean, topicId: any, location?: { __typename?: 'Location', id: any, name?: string | null, address1?: string | null, address2?: string | null, city?: string | null, state?: string | null, country?: string | null, postalCode?: string | null, lat?: string | null, lon?: string | null } | null, owner?: { __typename?: 'TodoResident', residentId: any, displayName: string } | null, children: Array<{ __typename?: 'Todo', id: any, name: string, description?: string | null, type: schema.TodoType, status: schema.TodoStatus, createdAt: any, updatedAt: any, parentTodoId?: any | null, rootTodoId: any, isTemplate: boolean, topicId: any, location?: { __typename?: 'Location', id: any, name?: string | null, address1?: string | null, address2?: string | null, city?: string | null, state?: string | null, country?: string | null, postalCode?: string | null, lat?: string | null, lon?: string | null } | null, owner?: { __typename?: 'TodoResident', residentId: any, displayName: string } | null, children: Array<{ __typename?: 'Todo', id: any, name: string, description?: string | null, type: schema.TodoType, status: schema.TodoStatus, createdAt: any, updatedAt: any, parentTodoId?: any | null, rootTodoId: any, isTemplate: boolean, topicId: any, location?: { __typename?: 'Location', id: any, name?: string | null, address1?: string | null, address2?: string | null, city?: string | null, state?: string | null, country?: string | null, postalCode?: string | null, lat?: string | null, lon?: string | null } | null, owner?: { __typename?: 'TodoResident', residentId: any, displayName: string } | null, children: Array<{ __typename?: 'Todo', id: any, name: string, description?: string | null, type: schema.TodoType, status: schema.TodoStatus, createdAt: any, updatedAt: any, parentTodoId?: any | null, rootTodoId: any, isTemplate: boolean, topicId: any, location?: { __typename?: 'Location', id: any, name?: string | null, address1?: string | null, address2?: string | null, city?: string | null, state?: string | null, country?: string | null, postalCode?: string | null, lat?: string | null, lon?: string | null } | null, owner?: { __typename?: 'TodoResident', residentId: any, displayName: string } | null, hiddenChildren: { __typename?: 'TodosConnection', totalCount: number } }> }> }> } | null };


export const TodoByIdDocument = gql`
    query TodoById($id: UUID!) {
  todo(id: $id) {
    ...Todo
    location {
      ...Location
    }
    owner: resident {
      residentId
      displayName
    }
    children: todosByParentTodoIdList {
      ...Todo
      location {
        ...Location
      }
      owner: resident {
        residentId
        displayName
      }
      children: todosByParentTodoIdList {
        ...Todo
        location {
          ...Location
        }
        owner: resident {
          residentId
          displayName
        }
        children: todosByParentTodoIdList {
          ...Todo
          location {
            ...Location
          }
          owner: resident {
            residentId
            displayName
          }
          hiddenChildren: todosByParentTodoId {
            totalCount
          }
        }
      }
    }
  }
}
    ${TodoFragmentDoc}
${LocationFragmentDoc}`;

export function useTodoByIdQuery(options: Omit<Urql.UseQueryArgs<never, TodoByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TodoByIdQuery>({ query: TodoByIdDocument, ...options });
};