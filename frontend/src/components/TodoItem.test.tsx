import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TodoItem } from "./TodoItem";

describe("<TodoItem/>", () => {
  // Temporary workaround for https://github.com/vitest-dev/vitest/issues/1430
  afterEach(() => {
    cleanup();
  });

  it("Todoを修正後フォーカスアウト", async () => {
    const user = userEvent.setup();
    const deleteTodo = vi.fn();
    const toggleTodo = vi.fn();
    const updateTodo = vi.fn();

    render(
      <TodoItem
        deleteTodo={deleteTodo}
        todo={{
          id: "01FYH5XVSNVSXTSGB8KB858REF",
          title: "foo",
          completed: false,
        }}
        toggleTodo={toggleTodo}
        updateTodo={updateTodo}
      />,
    );

    await user.dblClick(screen.getByText("foo"));

    const input = screen.getByRole("textbox");
    await user.clear(input);
    await user.type(input, "bar");
    await user.click(document.body);

    expect(deleteTodo).not.toHaveBeenCalled();
    expect(toggleTodo).not.toHaveBeenCalled();
    expect(updateTodo).toHaveBeenCalledWith({
      id: "01FYH5XVSNVSXTSGB8KB858REF",
      title: "bar",
      completed: false,
    });
  });

  it("Todoを修正後エンター", async () => {
    const user = userEvent.setup();
    const deleteTodo = vi.fn();
    const toggleTodo = vi.fn();
    const updateTodo = vi.fn();

    render(
      <TodoItem
        deleteTodo={deleteTodo}
        todo={{
          id: "01FYH5XVSNVSXTSGB8KB858REF",
          title: "foo",
          completed: false,
        }}
        toggleTodo={toggleTodo}
        updateTodo={updateTodo}
      />,
    );

    await user.dblClick(screen.getByText("foo"));

    const input = screen.getByRole("textbox");
    await user.clear(input);
    await user.type(input, "{b}{a}{r}{Enter}");

    expect(deleteTodo).not.toHaveBeenCalled();
    expect(toggleTodo).not.toHaveBeenCalled();
    expect(updateTodo).toHaveBeenCalledWith({
      id: "01FYH5XVSNVSXTSGB8KB858REF",
      title: "bar",
      completed: false,
    });
  });

  it("Todoを空文字に修正して削除", async () => {
    const user = userEvent.setup();
    const deleteTodo = vi.fn();
    const toggleTodo = vi.fn();
    const updateTodo = vi.fn();

    render(
      <TodoItem
        deleteTodo={deleteTodo}
        todo={{
          id: "01FYH5XVSNVSXTSGB8KB858REF",
          title: "foo",
          completed: false,
        }}
        toggleTodo={toggleTodo}
        updateTodo={updateTodo}
      />,
    );

    await user.dblClick(screen.getByText("foo"));

    const input = screen.getByRole("textbox");
    await user.clear(input);
    await user.type(input, "{Enter}");

    expect(deleteTodo).toHaveBeenCalledWith("01FYH5XVSNVSXTSGB8KB858REF");
    expect(toggleTodo).not.toHaveBeenCalled();
    expect(updateTodo).not.toHaveBeenCalled();
  });

  it("Todoを削除ボタンで削除", async () => {
    const user = userEvent.setup();
    const deleteTodo = vi.fn();
    const toggleTodo = vi.fn();
    const updateTodo = vi.fn();

    render(
      <TodoItem
        deleteTodo={deleteTodo}
        todo={{
          id: "01G46BYCGQ1SGVGFMEXZ0DKZAY",
          title: "bar",
          completed: false,
        }}
        toggleTodo={toggleTodo}
        updateTodo={updateTodo}
      />,
    );

    await user.click(screen.getByRole("button"));

    expect(deleteTodo).toHaveBeenCalledWith("01G46BYCGQ1SGVGFMEXZ0DKZAY");
    expect(toggleTodo).not.toHaveBeenCalled();
    expect(updateTodo).not.toHaveBeenCalled();
  });

  it("Todoを切り替え", async () => {
    const user = userEvent.setup();
    const deleteTodo = vi.fn();
    const toggleTodo = vi.fn();
    const updateTodo = vi.fn();

    render(
      <TodoItem
        deleteTodo={deleteTodo}
        todo={{
          id: "01G46BZM28F68BCY7EP016G1EZ",
          title: "baz",
          completed: false,
        }}
        toggleTodo={toggleTodo}
        updateTodo={updateTodo}
      />,
    );

    await user.click(screen.getByRole("checkbox"));

    expect(deleteTodo).not.toHaveBeenCalled();
    expect(toggleTodo).toHaveBeenCalledWith({
      id: "01G46BZM28F68BCY7EP016G1EZ",
      title: "baz",
      completed: false,
    });
    expect(updateTodo).not.toHaveBeenCalled();
  });
});
