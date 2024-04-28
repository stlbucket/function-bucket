import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type TodoByIdForRefreshQueryVariables = schema.Exact<{
  id: schema.Scalars['UUID']['input'];
}>;


export type TodoByIdForRefreshQuery = { __typename?: 'Query', todo?: { __typename?: 'Todo', id: any, status: schema.TodoStatus, parentTodo?: { __typename?: 'Todo', id: any, status: schema.TodoStatus, parentTodo?: { __typename?: 'Todo', id: any, status: schema.TodoStatus, parentTodo?: { __typename?: 'Todo', id: any, status: schema.TodoStatus, parentTodo?: { __typename?: 'Todo', id: any, status: schema.TodoStatus, parentTodo?: { __typename?: 'Todo', id: any, status: schema.TodoStatus, parentTodo?: { __typename?: 'Todo', id: any, status: schema.TodoStatus, parentTodo?: { __typename?: 'Todo', id: any, status: schema.TodoStatus, parentTodo?: { __typename?: 'Todo', id: any, status: schema.TodoStatus, parentTodo?: { __typename?: 'Todo', id: any, status: schema.TodoStatus, parentTodo?: { __typename?: 'Todo', id: any, status: schema.TodoStatus, parentTodo?: { __typename?: 'Todo', id: any, status: schema.TodoStatus } | null } | null } | null } | null } | null } | null } | null } | null } | null } | null } | null } | null };


export const TodoByIdForRefreshDocument = gql`
    query TodoByIdForRefresh($id: UUID!) {
  todo(id: $id) {
    id
    status
    parentTodo {
      id
      status
      parentTodo {
        id
        status
        parentTodo {
          id
          status
          parentTodo {
            id
            status
            parentTodo {
              id
              status
              parentTodo {
                id
                status
                parentTodo {
                  id
                  status
                  parentTodo {
                    id
                    status
                    parentTodo {
                      id
                      status
                      parentTodo {
                        id
                        status
                        parentTodo {
                          id
                          status
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;

export function useTodoByIdForRefreshQuery(options: Omit<Urql.UseQueryArgs<never, TodoByIdForRefreshQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TodoByIdForRefreshQuery>({ query: TodoByIdForRefreshDocument, ...options });
};