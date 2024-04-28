import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import { TodoFragmentDoc } from '../fragment/Todo.urql';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type AssignTodoMutationVariables = schema.Exact<{
  todoId: schema.Scalars['UUID']['input'];
  residentId: schema.Scalars['UUID']['input'];
}>;


export type AssignTodoMutation = { __typename?: 'Mutation', assignTodo?: { __typename?: 'AssignTodoPayload', todo?: { __typename?: 'Todo', id: any, name: string, description?: string | null, type: schema.TodoType, status: schema.TodoStatus, createdAt: any, updatedAt: any, parentTodoId?: any | null, rootTodoId: any, isTemplate: boolean, topicId: any, owner?: { __typename?: 'TodoResident', residentId: any, displayName: string } | null } | null } | null };


export const AssignTodoDocument = gql`
    mutation AssignTodo($todoId: UUID!, $residentId: UUID!) {
  assignTodo(input: {_todoId: $todoId, _residentId: $residentId}) {
    todo {
      ...Todo
      owner: resident {
        residentId
        displayName
      }
    }
  }
}
    ${TodoFragmentDoc}`;

export function useAssignTodoMutation() {
  return Urql.useMutation<AssignTodoMutation, AssignTodoMutationVariables>(AssignTodoDocument);
};