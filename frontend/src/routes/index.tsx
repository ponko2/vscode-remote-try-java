import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { TodoList } from "../components/TodoList";
import {
  todosQueryOptions,
  useDeleteTodo,
  useToggleTodo,
  useUpdateTodo,
} from "../hooks/todos";

export const Route = createFileRoute("/")({
  component: IndexComponent,
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(todosQueryOptions()),
});

function IndexComponent() {
  const { data: todos = [] } = useSuspenseQuery(todosQueryOptions());
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
