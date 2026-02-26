import React, { useState } from "react";
import type { Todo } from "../../../entities/todo/model/types";
import { Checkbox } from "../../../shared/ui/Checkbox";
import { Input } from "../../../shared/ui/Input";
import { IconButton } from "../../../shared/ui/IconButton";

interface TodoItemProps {
  todo: Todo;
  onToggle: (todo: Todo) => Promise<void> | void;
  onEdit: (todo: Todo, newTitle: string) => Promise<void> | void;
  onDelete: (id: number) => Promise<void> | void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);

  const handleSave = async () => {
    const trimmed = draft.trim();
    if (!trimmed || trimmed === todo.title) {
      setIsEditing(false);
      setDraft(todo.title);
      return;
    }
    await onEdit(todo, trimmed);
    setIsEditing(false);
  };

  return (
    <li className="todo-item">
      <div className="todo-item-main">
        <Checkbox
          checked={todo.completed}
          onChange={() => onToggle(todo)}
          aria-label={
            todo.completed
              ? "Отметить как невыполненную"
              : "Отметить как выполненную"
          }
        />
        {isEditing ? (
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={handleSave}
            autoFocus
            aria-label="Редактировать задачу"
          />
        ) : (
          <span
            className={`todo-title ${todo.completed ? "todo-title-completed" : ""}`}
          >
            {todo.title}
          </span>
        )}
      </div>
      <div className="todo-item-actions">
        <IconButton
          type="button"
          aria-label={isEditing ? "Сохранить задачу" : "Редактировать задачу"}
          onClick={() => {
            if (isEditing) {
              void handleSave();
            } else {
              setIsEditing(true);
            }
          }}
        >
          ✏️
        </IconButton>
        <IconButton
          type="button"
          aria-label="Удалить задачу"
          onClick={() => onDelete(todo.id)}
        >
          🗑
        </IconButton>
      </div>
    </li>
  );
};
