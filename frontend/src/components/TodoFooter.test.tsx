import type { RouterHistory } from "@tanstack/react-router";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TodoFooter } from "./TodoFooter";

function buildRouter(element: JSX.Element, history: RouterHistory) {
  const rootRoute = createRootRoute({ component: () => element });
  const routeTree = rootRoute.addChildren([
    createRoute({ getParentRoute: () => rootRoute, path: "/" }),
    createRoute({ getParentRoute: () => rootRoute, path: "/active" }),
    createRoute({ getParentRoute: () => rootRoute, path: "/completed" }),
  ]);
  return createRouter({ routeTree, history });
}

describe("<TodoFooter/>", () => {
  // Temporary workaround for https://github.com/vitest-dev/vitest/issues/1430
  afterEach(() => {
    cleanup();
  });

  it("全てを表示", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    const router = buildRouter(
      <TodoFooter
        clearCompletedTodos={spy}
        completedTodosCount={1}
        todosCount={2}
      />,
      createMemoryHistory({ initialEntries: ["/active"] }),
    );

    render(<RouterProvider router={router} />);

    const button = await screen.findByText("All");

    expect(button).not.toHaveClass("border-red-700");

    await user.click(button);

    expect(button).toHaveClass("border-red-700");
    expect(spy).not.toHaveBeenCalled();
  });

  it("未完了のものを表示", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    const router = buildRouter(
      <TodoFooter
        clearCompletedTodos={spy}
        completedTodosCount={1}
        todosCount={2}
      />,
      createMemoryHistory({ initialEntries: ["/"] }),
    );

    render(<RouterProvider router={router} />);

    const button = await screen.findByText("Active");

    expect(button).not.toHaveClass("border-red-700");

    await user.click(button);

    expect(button).toHaveClass("border-red-700");
    expect(spy).not.toHaveBeenCalled();
  });

  it("完了したものを表示", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    const router = buildRouter(
      <TodoFooter
        clearCompletedTodos={spy}
        completedTodosCount={1}
        todosCount={2}
      />,
      createMemoryHistory({ initialEntries: ["/"] }),
    );

    render(<RouterProvider router={router} />);

    const button = await screen.findByText("Completed");

    expect(button).not.toHaveClass("border-red-700");

    await user.click(button);

    expect(button).toHaveClass("border-red-700");
    expect(spy).not.toHaveBeenCalled();
  });

  it("完了したものを削除", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    const router = buildRouter(
      <TodoFooter
        clearCompletedTodos={spy}
        completedTodosCount={1}
        todosCount={2}
      />,
      createMemoryHistory({ initialEntries: ["/"] }),
    );

    render(<RouterProvider router={router} />);

    await user.click(await screen.findByText("Clear completed"));

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
