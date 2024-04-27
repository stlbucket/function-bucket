# Typescript
The best solution for this is still being explored, but currently typescript types are generated using [kysely-codegen](https://github.com/RobinBlomberg/kysely-codegen)

This is because [supabase-gen-types-typescript](https://supabase.com/docs/reference/cli/supabase-gen-types-typescript) does not currently support camelCase code generation.

Our graphql queries are in camel case, so this represents a bit of a conflict point.  Using [graphql codegen](https://the-guild.dev/graphql/codegen) is potentially a solution, but it has it's own set of hurdles.

For now, we generate types for each schema:
``` bash
# apps/ui-nuxt/gen-types.sh
npx kysely-codegen --camel-case --include-pattern 'app.*' --out-file ./db-types/db.app.d.ts

npx kysely-codegen --camel-case --include-pattern 'todo.*' --out-file ./db-types/db.todo.d.ts

npx kysely-codegen --camel-case --include-pattern 'msg.*' --out-file ./db-types/db.msg.d.ts

npx kysely-codegen --camel-case --include-pattern 'inc.*' --out-file ./db-types/db.inc.d.ts
```
Then pull them together explicitly
``` ts
// apps/ui-nuxt/db-types/index.ts
...
// TODO
export interface ITodoResident extends todo.TodoTodoResident {

}

export interface ITodo extends todo.TodoTodo {
  owner?: ITodoResident
  children?: Todo[]
  hiddenChildren?: {
    totalCount: number
  }
}

declare global {
  type Todo = ITodo
}
...
```
This process is likely to be refactored.  The Postgraphile v5 server supports a fairly flexible entity naming inflector as well as some other features which might be leveraged to further automate.