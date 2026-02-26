import {
  mapTodoDtoToTodo,
  mapTodoToDto,
} from "../../../entities/todo/model/mapper";
import type { Todo, TodoDTO } from "../../../entities/todo/model/types";
import { http } from "../../../shared/api/httpClient";

export async function getTodos(signal?: AbortSignal): Promise<Todo[]> {
  const data = await http<TodoDTO[]>("/todos?_limit=20", {
    method: "GET",
    signal,
  });
  return data.map(mapTodoDtoToTodo);
}

export async function createTodo(title: string): Promise<Todo> {
  const dto: TodoDTO = {
    id: Math.random(),
    title,
    completed: false,
  };

  const created = await http<TodoDTO>("/todos", {
    method: "POST",
    body: JSON.stringify(dto),
  });

  return mapTodoDtoToTodo(created);
}

export async function updateTodo(todo: Todo): Promise<Todo> {
  const dto = mapTodoToDto(todo);
  const updated = await http<TodoDTO>(`/todos/${todo.id}`, {
    method: "PUT",
    body: JSON.stringify(dto),
  });

  return mapTodoDtoToTodo(updated);
}

export async function deleteTodo(id: number): Promise<void> {
  await http<void>(`/todos/${id}`, {
    method: "DELETE",
  });
}
