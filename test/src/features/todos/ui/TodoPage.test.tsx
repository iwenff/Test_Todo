import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import * as todoApi from "../api/todoApi";
import { TodoPage } from "./TodoPage";
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type Mock,
} from "vitest";

vi.mock("../api/todoApi");

const mockedGetTodos = todoApi.getTodos as unknown as Mock;
const mockedCreateTodo = todoApi.createTodo as unknown as Mock;

describe("TodoPage", () => {
  beforeEach(() => {
    mockedGetTodos.mockResolvedValue([]);
    mockedCreateTodo.mockImplementation(async (title: string) => ({
      id: 1,
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("allows adding a new todo", async () => {
    render(<TodoPage />);

    await waitFor(() => {
      expect(mockedGetTodos).toHaveBeenCalled();
    });

    const input = screen.getByPlaceholderText("Что нужно сделать?");
    const button = screen.getByRole("button", { name: /добавить/i });

    fireEvent.change(input, { target: { value: "New task" } });
    fireEvent.click(button);

    await screen.findByText("New task");
  });
});
