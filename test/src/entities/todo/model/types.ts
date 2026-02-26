export interface TodoDTO {
  userId?: number;
  id: number;
  title: string;
  completed: boolean;
  createdAt?: string;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

export type TodoStatusFilter = "all" | "active" | "completed";
export type TodoSortOrder = "createdAtAsc" | "createdAtDesc";

export interface TodoFilterOptions {
  status: TodoStatusFilter;
  sortOrder: TodoSortOrder;
  search: string;
}
