import { mapTodoDtoToTodo } from "./mapper";
import type { TodoDTO } from "./types";
import { describe, it, expect } from "vitest";

describe("mapTodoDtoToTodo", () => {
  it("maps basic fields", () => {
    const dto: TodoDTO = {
      id: 1,
      title: "Test",
      completed: false,
    };

    const result = mapTodoDtoToTodo(dto);

    expect(result.id).toBe(dto.id);
    expect(result.title).toBe(dto.title);
    expect(result.completed).toBe(dto.completed);
    expect(typeof result.createdAt).toBe("string");
  });

  it("uses createdAt from dto if provided", () => {
    const dto: TodoDTO = {
      id: 1,
      title: "Test",
      completed: false,
      createdAt: "2020-01-01T00:00:00.000Z",
    };

    const result = mapTodoDtoToTodo(dto);

    expect(result.createdAt).toBe(dto.createdAt);
  });
});
