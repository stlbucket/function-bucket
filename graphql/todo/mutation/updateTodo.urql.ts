import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UpdateTodoMutationVariables = schema.Exact<{
  todoId: schema.Scalars['UUID']['input'];
  name: schema.Scalars['String']['input'];
  description?: schema.InputMaybe<schema.Scalars['String']['input']>;
}>;


export type UpdateTodoMutation = { __typename?: 'Mutation', updateTodo?: { __typename?: 'UpdateTodoPayload', todo?: { __typename?: 'Todo', id: any, name: string, description?: string | null, type: schema.TodoType, status: schema.TodoStatus, createdAt: any, updatedAt: any, parentTodoId?: any | null } | null } | null };


export const UpdateTodoDocument = gql`
    mutation UpdateTodo($todoId: UUID!, $name: String!, $description: String) {
  updateTodo(input: {_todoId: $todoId, _name: $name, _description: $description}) {
    todo {
      id
      name
      description
      type
      status
      createdAt
      updatedAt
      parentTodoId
    }
  }
}
    `;

export function useUpdateTodoMutation() {
  return Urql.useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(UpdateTodoDocument);
};