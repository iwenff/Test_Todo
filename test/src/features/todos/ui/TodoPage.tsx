import React, { useMemo, useState } from "react";
import { useTodos } from "../model/useTodos";
import "../../../shared/styles/index.css";

import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import type {
  TodoFilterOptions,
  TodoSortOrder,
  TodoStatusFilter,
} from "../../../entities/todo/model/types";
import { useDebouncedValue } from "../../../shared/lib/useDebouncedValue";
import { applyFiltersAndSort } from "../../../entities/todo/model/sortAndFilter";
import { TodoFilters } from "./TodoFilter";
import { Spinner } from "../../../shared/ui/Spinner";
import { Button } from "../../../shared/ui/Button";
import { Alert } from "../../../shared/ui/Alert";

export const TodoPage: React.FC = () => {
  const {
    todos,
    status,
    error,
    reload,
    addTodo,
    toggleTodo,
    editTodo,
    removeTodo,
  } = useTodos();
  const [statusFilter, setStatusFilter] = useState<TodoStatusFilter>("all");
  const [sortOrder, setSortOrder] = useState<TodoSortOrder>("createdAtDesc");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 200);

  const filterOptions: TodoFilterOptions = {
    status: statusFilter,
    sortOrder,
    search: debouncedSearch,
  };

  const visibleTodos = useMemo(
    () => applyFiltersAndSort(todos, filterOptions),
    [todos, filterOptions]
  );

  const isLoading = status === "loading";
  const isError = status === "error";

  return (
    <section className="todo-page" aria-label="Список задач">
      <TodoForm onSubmit={addTodo} isSubmitting={false} />

      <TodoFilters
        status={statusFilter}
        sortOrder={sortOrder}
        onStatusChange={setStatusFilter}
        onSortOrderChange={setSortOrder}
        search={search}
        onSearchChange={setSearch}
      />

      {isLoading && (
        <div className="center-row">
          <Spinner />
        </div>
      )}

      {isError && error && (
        <div className="center-column">
          <Alert type="error">{error}</Alert>
          <Button type="button" onClick={() => reload()}>
            Повторить запрос
          </Button>
        </div>
      )}

      {!isLoading && !isError && visibleTodos.length === 0 && (
        <div className="empty-state" aria-live="polite">
          <p className="empty-title">
            {todos.length === 0
              ? "Список задач пуст"
              : "Ничего не найдено по вашему запросу"}
          </p>
          <p className="empty-subtitle">
            Добавьте первую задачу или измените фильтры.
          </p>
        </div>
      )}

      {!isLoading && !isError && visibleTodos.length > 0 && (
        <TodoList
          todos={visibleTodos}
          onToggle={toggleTodo}
          onEdit={editTodo}
          onDelete={removeTodo}
        />
      )}
    </section>
  );
};
