import { Outlet, ReactLocation, Router } from "@tanstack/react-location";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import styles from "./App.module.css";
import { TodoFooter } from "./containers/organisms/TodoFooter";
import { TodoHeader } from "./containers/organisms/TodoHeader";
import { TodoList } from "./containers/organisms/TodoList";

const location = new ReactLocation();
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
      <Router
        location={location}
        routes={[
          {
            path: "/",
            element: <TodoList select={(data) => data.todos} />,
          },
          {
            path: "active",
            element: (
              <TodoList
                select={(data) => data.todos.filter((todo) => !todo.completed)}
              />
            ),
          },
          {
            path: "completed",
            element: (
              <TodoList
                select={(data) => data.todos.filter((todo) => todo.completed)}
              />
            ),
          },
        ]}
      >
        <section className={styles.todoapp}>
          <TodoHeader />
          <Outlet />
          <TodoFooter />
        </section>
      </Router>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}
