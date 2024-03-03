import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { TodoList } from "../components/TodoList";
import {
  completedTodosQueryOptions,
  useDeleteTodo,
  useToggleTodo,
  useUpdateTodo,
} from "../hooks/todos";

export const Route = createFileRoute("/completed")({
  component: CompletedComponent,
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(completedTodosQueryOptions()),
});

function CompletedComponent() {
  const { data: todos = [] } = useSuspenseQuery(completedTodosQueryOptions());
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
