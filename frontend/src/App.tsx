import {
  Outlet,
  RootRoute,
  Route,
  Router,
  RouterProvider,
} from "@tanstack/router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import styles from "./App.module.css";
import { TodoFooter } from "./containers/organisms/TodoFooter";
import { TodoHeader } from "./containers/organisms/TodoHeader";
import { TodoList } from "./containers/organisms/TodoList";

const rootRoute = new RootRoute({
  component: () => (
    <section className={styles["todoapp"]}>
      <TodoHeader />
      <Outlet />
      <TodoFooter />
    </section>
  ),
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <TodoList select={(data) => data.todos} />,
});

const activeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/active",
  component: () => (
    <TodoList select={(data) => data.todos.filter((todo) => !todo.completed)} />
  ),
});

const completedRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/completed",
  component: () => (
    <TodoList select={(data) => data.todos.filter((todo) => todo.completed)} />
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  activeRoute,
  completedRoute,
]);

const router = new Router({ routeTree });

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
