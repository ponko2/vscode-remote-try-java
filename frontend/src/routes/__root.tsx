import { useSuspenseQueries, type QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import clsx from "clsx";
import { TodoFooter } from "../components/TodoFooter";
import { TodoHeader } from "../components/TodoHeader";
import {
  completedTodosCountQueryOptions,
  todosCountQueryOptions,
  useClearCompletedTodos,
  useCreateTodo,
  useToggleAllTodos,
} from "../hooks/todos";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  loader: (opts) =>
    Promise.all([
      opts.context.queryClient.ensureQueryData(todosCountQueryOptions()),
      opts.context.queryClient.ensureQueryData(
        completedTodosCountQueryOptions(),
      ),
    ]),
});

function RootComponent() {
  const [{ data: todosCount = 0 }, { data: completedTodosCount = 0 }] =
    useSuspenseQueries({
      queries: [todosCountQueryOptions(), completedTodosCountQueryOptions()],
    });
  const createTodo = useCreateTodo();
  const toggleAllTodos = useToggleAllTodos();
  const clearCompletedTodos = useClearCompletedTodos();
  return (
    <>
      <section
        className={clsx(
          "relative",
          "my-10",
          "divide-y",
          "divide-neutral-200",
          "bg-white",
          "shadow-2xl",
          "before:absolute",
          "before:inset-x-0",
          "before:bottom-0",
          "before:h-12",
          "before:shadow-[0_1px_1px_rgba(0,0,0,0.2),0_8px_0_-3px_#f5f5f5,0_9px_1px_-3px_rgba(0,0,0,0.2),0_16px_0_-6px_#f5f5f5,0_17px_2px_-6px_rgba(0,0,0,0.2)]",
        )}
      >
        <TodoHeader
          completedTodosCount={completedTodosCount}
          createTodo={createTodo.mutate}
          todosCount={todosCount}
          toggleAllTodos={toggleAllTodos.mutate}
        />
        <Outlet />
        <TodoFooter
          clearCompletedTodos={clearCompletedTodos.mutate}
          completedTodosCount={completedTodosCount}
          todosCount={todosCount}
        />
      </section>
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
