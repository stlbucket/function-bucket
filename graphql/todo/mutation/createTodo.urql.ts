import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateTodoMutationVariables = schema.Exact<{
  name: schema.Scalars['String']['input'];
  description?: schema.InputMaybe<schema.Scalars['String']['input']>;
  parentTodoId?: schema.InputMaybe<schema.Scalars['UUID']['input']>;
}>;


export type CreateTodoMutation = { __typename?: 'Mutation', createTodo?: { __typename?: 'CreateTodoPayload', todo?: { __typename?: 'Todo', id: any, name: string, description?: string | null, status: schema.TodoStatus, type: schema.TodoType, createdAt: any, updatedAt: any, parentTodoId?: any | null, isTemplate: boolean } | null } | null };


export const CreateTodoDocument = gql`
    mutation CreateTodo($name: String!, $description: String, $parentTodoId: UUID) {
  createTodo(
    input: {_name: $name, _options: {description: $description, parentTodoId: $parentTodoId}}
  ) {
    todo {
      id
      name
      description
      status
      type
      createdAt
      updatedAt
      parentTodoId
      isTemplate
    }
  }
}
    `;

export function useCreateTodoMutation() {
  return Urql.useMutation<CreateTodoMutation, CreateTodoMutationVariables>(CreateTodoDocument);
};