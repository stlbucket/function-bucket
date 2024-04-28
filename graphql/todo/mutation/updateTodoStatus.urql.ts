import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UpdateTodoStatusMutationVariables = schema.Exact<{
  todoId: schema.Scalars['UUID']['input'];
  status: schema.TodoStatus;
}>;


export type UpdateTodoStatusMutation = { __typename?: 'Mutation', updateTodoStatus?: { __typename?: 'UpdateTodoStatusPayload', todo?: { __typename?: 'Todo', id: any, status: schema.TodoStatus, parentTodo?: { __typename?: 'Todo', id: any, status: schema.TodoStatus, parentTodo?: { __typename?: 'Todo', id: any, status: schema.TodoStatus, parentTodo?: { __typename?: 'Todo', id: any, status: schema.TodoStatus, parentTodo?: { __typename?: 'Todo', id: any, status: schema.TodoStatus, parentTodo?: { __typename?: 'Todo', id: any, status: schema.TodoStatus, parentTodo?: { __typename?: 'Todo', id: any, status: schema.TodoStatus, parentTodo?: { __typename?: 'Todo', id: any, status: schema.TodoStatus, parentTodo?: { __typename?: 'Todo', id: any, status: schema.TodoStatus, parentTodo?: { __typename?: 'Todo', id: any, status: schema.TodoStatus, parentTodo?: { __typename?: 'Todo', id: any, status: schema.TodoStatus, parentTodo?: { __typename?: 'Todo', id: any, status: schema.TodoStatus } | null } | null } | null } | null } | null } | null } | null } | null } | null } | null } | null } | null } | null };


export const UpdateTodoStatusDocument = gql`
    mutation UpdateTodoStatus($todoId: UUID!, $status: TodoStatus!) {
  updateTodoStatus(input: {_todoId: $todoId, _status: $status}) {
    todo {
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
}
    `;

export function useUpdateTodoStatusMutation() {
  return Urql.useMutation<UpdateTodoStatusMutation, UpdateTodoStatusMutationVariables>(UpdateTodoStatusDocument);
};