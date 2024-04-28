import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
export type TodoFragment = { __typename?: 'Todo', id: any, name: string, description?: string | null, type: schema.TodoType, status: schema.TodoStatus, createdAt: any, updatedAt: any, parentTodoId?: any | null, rootTodoId: any, isTemplate: boolean, topicId: any };

export const TodoFragmentDoc = gql`
    fragment Todo on Todo {
  id
  name
  description
  type
  status
  createdAt
  updatedAt
  parentTodoId
  rootTodoId
  isTemplate
  topicId
}
    `;