import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type DeleteTodoMutationVariables = schema.Exact<{
  todoId: schema.Scalars['UUID']['input'];
}>;


export type DeleteTodoMutation = { __typename?: 'Mutation', deleteTodo?: { __typename?: 'DeleteTodoPayload', boolean?: boolean | null } | null };


export const DeleteTodoDocument = gql`
    mutation DeleteTodo($todoId: UUID!) {
  deleteTodo(input: {_todoId: $todoId}) {
    boolean
  }
}
    `;

export function useDeleteTodoMutation() {
  return Urql.useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(DeleteTodoDocument);
};