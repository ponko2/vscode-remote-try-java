import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TodoHeader } from "./TodoHeader";

describe("<TodoHeader/>", () => {
  // Temporary workaround for https://github.com/vitest-dev/vitest/issues/1430
  afterEach(() => {
    cleanup();
  });

  it("Todoを追加", async () => {
    const user = userEvent.setup();
    const createTodoSpy = vi.fn();
    const toggleAllTodosSpy = vi.fn();

    render(
      <TodoHeader
        completedTodosCount={0}
        createTodo={createTodoSpy}
        todosCount={0}
        toggleAllTodos={toggleAllTodosSpy}
      />,
    );

    const input = screen.getByRole("textbox");
    await user.clear(input);
    await user.type(input, "foo");

    expect(input).toHaveValue("foo");

    await user.type(input, "{Enter}");

    expect(input).toHaveValue("");
    expect(createTodoSpy).toHaveBeenCalledWith("foo");
    expect(toggleAllTodosSpy).not.toHaveBeenCalled();
  });

  it("全てのTodoを切り替え", async () => {
    const user = userEvent.setup();
    const createTodoSpy = vi.fn();
    const toggleAllTodosSpy = vi.fn();

    render(
      <TodoHeader
        completedTodosCount={1}
        createTodo={createTodoSpy}
        todosCount={1}
        toggleAllTodos={toggleAllTodosSpy}
      />,
    );

    await user.click(screen.getByRole("checkbox"));

    expect(createTodoSpy).not.toHaveBeenCalled();
    expect(toggleAllTodosSpy).toHaveBeenCalledTimes(1);
  });
});
