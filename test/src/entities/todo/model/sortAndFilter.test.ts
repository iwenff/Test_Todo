import { applyFiltersAndSort } from "./sortAndFilter";
import type { Todo, TodoFilterOptions } from "./types";
import { describe, it, expect } from "vitest";

const makeTodo = (id: number, overrides: Partial<Todo> = {}): Todo => ({
  id,
  title: `Task ${id}`,
  completed: false,
  createdAt: new Date(2020, 0, id).toISOString(),
  ...overrides,
});

describe("applyFiltersAndSort", () => {
  const baseTodos: Todo[] = [makeTodo(1), makeTodo(2, { completed: true })];

  const baseOptions: TodoFilterOptions = {
    status: "all",
    sortOrder: "createdAtDesc",
    search: "",
  };

  it("returns all todos by default", () => {
    const result = applyFiltersAndSort(baseTodos, baseOptions);
    expect(result).toHaveLength(2);
  });

  it("filters by completed status", () => {
    const result = applyFiltersAndSort(baseTodos, {
      ...baseOptions,
      status: "completed",
    });
    expect(result).toHaveLength(1);
    expect(result[0].completed).toBe(true);
  });

  it("filters by active status", () => {
    const result = applyFiltersAndSort(baseTodos, {
      ...baseOptions,
      status: "active",
    });
    expect(result).toHaveLength(1);
    expect(result[0].completed).toBe(false);
  });

  it("filters by search query", () => {
    const todos: Todo[] = [
      makeTodo(1, { title: "Buy milk" }),
      makeTodo(2, { title: "Read book" }),
    ];
    const result = applyFiltersAndSort(todos, {
      ...baseOptions,
      search: "buy",
    });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Buy milk");
  });

  it("sorts by createdAt ascending", () => {
    const result = applyFiltersAndSort(baseTodos, {
      ...baseOptions,
      sortOrder: "createdAtAsc",
    });
    expect(result[0].id).toBe(1);
  });

  it("sorts by createdAt descending", () => {
    const result = applyFiltersAndSort(baseTodos, {
      ...baseOptions,
      sortOrder: "createdAtDesc",
    });
    expect(result[0].id).toBe(2);
  });
});
