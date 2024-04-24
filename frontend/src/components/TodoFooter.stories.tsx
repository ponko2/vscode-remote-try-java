import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { TodoFooter } from "./TodoFooter";

const history = createMemoryHistory({ initialEntries: ["/"] });

const meta = {
  component: TodoFooter,
  decorators: [
    (Story) => {
      const rootRoute = createRootRoute({ component: () => <Story /> });
      const routeTree = rootRoute.addChildren([
        createRoute({ getParentRoute: () => rootRoute, path: "/" }),
        createRoute({ getParentRoute: () => rootRoute, path: "/active" }),
        createRoute({ getParentRoute: () => rootRoute, path: "/completed" }),
      ]);
      const router = createRouter({ routeTree, history });
      return <RouterProvider router={router} />;
    },
  ],
} satisfies Meta<typeof TodoFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    clearCompletedTodos: fn(),
    todosCount: 1,
    completedTodosCount: 1,
  },
} satisfies Story;

export const HasCompleted = {
  args: {
    ...Basic.args,
    todosCount: 2,
    completedTodosCount: 1,
  },
} satisfies Story;
