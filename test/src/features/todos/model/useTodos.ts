import { useCallback, useEffect, useReducer, useRef } from "react";

import { createTodo, deleteTodo, getTodos, updateTodo } from "../api/todoApi";
import type { Todo } from "../../../entities/todo/model/types";

type Status = "idle" | "loading" | "success" | "error";

interface State {
  todos: Todo[];
  status: Status;
  error: string | null;
}

type Action =
  | { type: "LOAD_START" }
  | { type: "LOAD_SUCCESS"; payload: Todo[] }
  | { type: "LOAD_ERROR"; payload: string }
  | { type: "ADD_TODO"; payload: Todo }
  | { type: "UPDATE_TODO"; payload: Todo }
  | { type: "DELETE_TODO"; payload: number };

const initialState: State = {
  todos: [],
  status: "idle",
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, status: "loading", error: null };
    case "LOAD_SUCCESS":
      return { todos: action.payload, status: "success", error: null };
    case "LOAD_ERROR":
      return { ...state, status: "error", error: action.payload };
    case "ADD_TODO":
      return { ...state, todos: [action.payload, ...state.todos] };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload),
      };
    default:
      return state;
  }
}

export const useTodos = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadTodos = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    dispatch({ type: "LOAD_START" });
    try {
      const todos = await getTodos(controller.signal);
      dispatch({ type: "LOAD_SUCCESS", payload: todos });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }
      dispatch({
        type: "LOAD_ERROR",
        payload: error instanceof Error ? error.message : "Неизвестная ошибка",
      });
    }
  }, []);

  useEffect(() => {
    loadTodos();
    return () => {
      abortControllerRef.current?.abort();
    };
  }, [loadTodos]);

  const addTodo = useCallback(async (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    const created = await createTodo(trimmed);
    dispatch({ type: "ADD_TODO", payload: created });
  }, []);

  const toggleTodo = useCallback(async (todo: Todo) => {
    const updated: Todo = { ...todo, completed: !todo.completed };
    await updateTodo(updated);
    dispatch({ type: "UPDATE_TODO", payload: updated });
  }, []);

  const editTodo = useCallback(async (todo: Todo, newTitle: string) => {
    const trimmed = newTitle.trim();
    if (!trimmed) return;
    const updated: Todo = { ...todo, title: trimmed };
    await updateTodo(updated);
    dispatch({ type: "UPDATE_TODO", payload: updated });
  }, []);

  const removeTodo = useCallback(async (id: number) => {
    await deleteTodo(id);
    dispatch({ type: "DELETE_TODO", payload: id });
  }, []);

  return {
    todos: state.todos,
    status: state.status,
    error: state.error,
    reload: loadTodos,
    addTodo,
    toggleTodo,
    editTodo,
    removeTodo,
  };
};
