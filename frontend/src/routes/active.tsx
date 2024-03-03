import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { TodoList } from "../components/TodoList";
import {
  activeTodosQueryOptions,
  useDeleteTodo,
  useToggleTodo,
  useUpdateTodo,
} from "../hooks/todos";

export const Route = createFileRoute("/active")({
  component: ActiveComponent,
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(activeTodosQueryOptions()),
});

function ActiveComponent() {
  const { data: todos = [] } = useSuspenseQuery(activeTodosQueryOptions());
  const deleteTodo = useDeleteTodo();
  const toggleTodo = useToggleTodo();
  const updateTodo = useUpdateTodo();
  return (
    <TodoList
      deleteTodo={deleteTodo.mutate}
      todos={todos}
      toggleTodo={toggleTodo.mutate}
      updateTodo={updateTodo.mutate}
    />
  );
}
