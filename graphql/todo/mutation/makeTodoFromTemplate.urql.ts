import * as schema from '../../../src/generated/graphql-schema';

import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type MakeTodoFromTemplateMutationVariables = schema.Exact<{
  todoId?: schema.InputMaybe<schema.Scalars['UUID']['input']>;
}>;


export type MakeTodoFromTemplateMutation = { __typename?: 'Mutation', makeTodoFromTemplate?: { __typename?: 'MakeTodoFromTemplatePayload', todo?: { __typename?: 'Todo', id: any, name: string } | null } | null };


export const MakeTodoFromTemplateDocument = gql`
    mutation MakeTodoFromTemplate($todoId: UUID) {
  makeTodoFromTemplate(input: {_todoId: $todoId}) {
    todo {
      id
      name
    }
  }
}
    `;

export function useMakeTodoFromTemplateMutation() {
  return Urql.useMutation<MakeTodoFromTemplateMutation, MakeTodoFromTemplateMutationVariables>(MakeTodoFromTemplateDocument);
};