import type { Todo, TodoFilterOptions } from "./types";

export const applyFiltersAndSort = (
  todos: Todo[],
  options: TodoFilterOptions,
): Todo[] => {
  const normalizedSearch = options.search.trim().toLowerCase();

  let result = todos;

  if (options.status !== "all") {
    result = result.filter((todo) =>
      options.status === "completed" ? todo.completed : !todo.completed,
    );
  }

  if (normalizedSearch) {
    result = result.filter((todo) =>
      todo.title.toLowerCase().includes(normalizedSearch),
    );
  }

  result = [...result].sort((a, b) => {
    const aDate = new Date(a.createdAt).getTime();
    const bDate = new Date(b.createdAt).getTime();

    if (options.sortOrder === "createdAtAsc") {
      return aDate - bDate;
    }
    return bDate - aDate;
  });

  return result;
};
