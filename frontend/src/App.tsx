import {
  createRouteConfig,
  Outlet,
  ReactRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import styles from "./App.module.css";
import { TodoFooter } from "./containers/organisms/TodoFooter";
import { TodoHeader } from "./containers/organisms/TodoHeader";
import { TodoList } from "./containers/organisms/TodoList";

const rootRoute = createRouteConfig({
  component: () => (
    <section className={styles.todoapp}>
      <TodoHeader />
      <Outlet />
      <TodoFooter />
    </section>
  ),
});

const indexRoute = rootRoute.createRoute({
  path: "/",
  component: () => <TodoList select={(data) => data.todos} />,
});

const activeRoute = rootRoute.createRoute({
  path: "/active",
  component: () => (
    <TodoList select={(data) => data.todos.filter((todo) => !todo.completed)} />
  ),
});

const completedRoute = rootRoute.createRoute({
  path: "/completed",
  component: () => (
    <TodoList select={(data) => data.todos.filter((todo) => todo.completed)} />
  ),
});

const routeConfig = rootRoute.addChildren([
  indexRoute,
  activeRoute,
  completedRoute,
]);

const router = new ReactRouter({ routeConfig });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}
