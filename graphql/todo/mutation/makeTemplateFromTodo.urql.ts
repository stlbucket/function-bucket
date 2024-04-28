import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type MakeTemplateFromTodoMutationVariables = schema.Exact<{
  todoId?: schema.InputMaybe<schema.Scalars['UUID']['input']>;
}>;


export type MakeTemplateFromTodoMutation = { __typename?: 'Mutation', makeTemplateFromTodo?: { __typename?: 'MakeTemplateFromTodoPayload', todo?: { __typename?: 'Todo', id: any, name: string } | null } | null };


export const MakeTemplateFromTodoDocument = gql`
    mutation MakeTemplateFromTodo($todoId: UUID) {
  makeTemplateFromTodo(input: {_todoId: $todoId}) {
    todo {
      id
      name
    }
  }
}
    `;

export function useMakeTemplateFromTodoMutation() {
  return Urql.useMutation<MakeTemplateFromTodoMutation, MakeTemplateFromTodoMutationVariables>(MakeTemplateFromTodoDocument);
};