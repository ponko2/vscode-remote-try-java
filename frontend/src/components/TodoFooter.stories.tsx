import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { TodoFooter } from "./TodoFooter";

const history = createMemoryHistory({ initialEntries: ["/"] });

const meta: Meta<typeof TodoFooter> = {
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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    clearCompletedTodos: action("clearCompletedTodos"),
    todosCount: 1,
    completedTodosCount: 1,
  },
};

export const HasCompleted: Story = {
  args: {
    ...Basic.args,
    todosCount: 2,
    completedTodosCount: 1,
  },
};
