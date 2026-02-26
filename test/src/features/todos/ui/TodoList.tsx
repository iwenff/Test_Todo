import React from "react";
import { TodoItem } from "./TodoItem";
import type { Todo } from "../../../entities/todo/model/types";

interface TodoListProps {
  todos: Todo[];
  onToggle: (todo: Todo) => Promise<void> | void;
  onEdit: (todo: Todo, newTitle: string) => Promise<void> | void;
  onDelete: (id: number) => Promise<void> | void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onEdit,
  onDelete,
}) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};
