import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type TodoTodoStatus = "archived" | "complete" | "incomplete" | "unfinished";

export type TodoTodoType = "milestone" | "task";

export interface TodoTodo {
  id: Generated<string>;
  parentTodoId: string | null;
  tenantId: string;
  residentId: string | null;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  name: string;
  description: string | null;
  status: Generated<TodoTodoStatus>;
  type: Generated<TodoTodoType>;
  ordinal: number;
  pinned: Generated<boolean>;
  tags: Generated<string[]>;
  isTemplate: Generated<boolean>;
}

export interface TodoTodoResident {
  residentId: string;
  tenantId: string;
  displayName: string;
}

export interface TodoTodoTenant {
  tenantId: string;
  name: string;
}

export interface DB {
  "todo.todo": TodoTodo;
  "todo.todoResident": TodoTodoResident;
  "todo.todoTenant": TodoTodoTenant;
}
