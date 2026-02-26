import type { Todo, TodoDTO } from "./types";

const nowIso = (): string => new Date().toISOString();

export const mapTodoDtoToTodo = (dto: TodoDTO): Todo => {
  return {
    id: dto.id,
    title: dto.title,
    completed: dto.completed,
    createdAt: dto.createdAt ?? nowIso(),
  };
};

export const mapTodoToDto = (todo: Todo): TodoDTO => {
  return {
    id: todo.id,
    title: todo.title,
    completed: todo.completed,
    createdAt: todo.createdAt,
  };
};
