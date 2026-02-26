import React from "react";
import type {
  TodoSortOrder,
  TodoStatusFilter,
} from "../../../entities/todo/model/types";
import { Button } from "../../../shared/ui/Button";
import { Select } from "../../../shared/ui/Select";
import { Input } from "../../../shared/ui/Input";

interface Props {
  status: TodoStatusFilter;
  sortOrder: TodoSortOrder;
  onStatusChange: (value: TodoStatusFilter) => void;
  onSortOrderChange: (value: TodoSortOrder) => void;
  search: string;
  onSearchChange: (value: string) => void;
}

export const TodoFilters: React.FC<Props> = ({
  status,
  sortOrder,
  onStatusChange,
  onSortOrderChange,
  search,
  onSearchChange,
}) => {
  return (
    <section className="todo-filters" aria-label="Фильтры задач">
      <div className="todo-filters-row">
        <div className="todo-filters-group">
          <Button
            type="button"
            variant={status === "all" ? "primary" : "secondary"}
            onClick={() => onStatusChange("all")}
            aria-pressed={status === "all"}
          >
            Все
          </Button>
          <Button
            type="button"
            variant={status === "active" ? "primary" : "secondary"}
            onClick={() => onStatusChange("active")}
            aria-pressed={status === "active"}
          >
            Активные
          </Button>
          <Button
            type="button"
            variant={status === "completed" ? "primary" : "secondary"}
            onClick={() => onStatusChange("completed")}
            aria-pressed={status === "completed"}
          >
            Выполненные
          </Button>
        </div>

        <Select
          value={sortOrder}
          onChange={(e) => onSortOrderChange(e.target.value as TodoSortOrder)}
          aria-label="Сортировка по дате"
        >
          <option value="createdAtDesc">Сначала новые</option>
          <option value="createdAtAsc">Сначала старые</option>
        </Select>
      </div>

      <div className="todo-filters-row">
        <Input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Поиск по задачам..."
          aria-label="Поиск задач"
        />
      </div>
    </section>
  );
};
