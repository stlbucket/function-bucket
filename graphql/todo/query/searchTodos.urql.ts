import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { TodoFragmentDoc } from '../fragment/Todo.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SearchTodosQueryVariables = schema.Exact<{
  searchTerm?: schema.InputMaybe<schema.Scalars['String']['input']>;
  todoType?: schema.InputMaybe<schema.TodoType>;
  rootsOnly?: schema.InputMaybe<schema.Scalars['Boolean']['input']>;
  isTemplate?: schema.InputMaybe<schema.Scalars['Boolean']['input']>;
}>;


export type SearchTodosQuery = { __typename?: 'Query', searchTodos?: { __typename?: 'TodosConnection', nodes: Array<{ __typename?: 'Todo', id: any, name: string, description?: string | null, type: schema.TodoType, status: schema.TodoStatus, createdAt: any, updatedAt: any, parentTodoId?: any | null, rootTodoId: any, isTemplate: boolean, topicId: any, resident?: { __typename?: 'TodoResident', residentId: any, displayName: string } | null, parentTodo?: { __typename?: 'Todo', id: any, name: string, description?: string | null, type: schema.TodoType, status: schema.TodoStatus, createdAt: any, updatedAt: any, parentTodoId?: any | null, rootTodoId: any, isTemplate: boolean, topicId: any } | null, tenant?: { __typename?: 'TodoTenant', tenantId: any, name: string } | null } | null> } | null };


export const SearchTodosDocument = gql`
    query SearchTodos($searchTerm: String, $todoType: TodoType, $rootsOnly: Boolean, $isTemplate: Boolean) {
  searchTodos(
    _options: {searchTerm: $searchTerm, todoType: $todoType, rootsOnly: $rootsOnly, isTemplate: $isTemplate}
  ) {
    nodes {
      ...Todo
      resident {
        residentId
        displayName
      }
      parentTodo {
        ...Todo
      }
      tenant {
        tenantId
        name
      }
    }
  }
}
    ${TodoFragmentDoc}`;

export function useSearchTodosQuery(options: Omit<Urql.UseQueryArgs<never, SearchTodosQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SearchTodosQuery>({ query: SearchTodosDocument, ...options });
};