import { TodoHeader as Component } from "../../components/organisms/TodoHeader";
import {
  useAddTodo,
  useCompletedCount,
  useTodosCount,
  useToggleAllTodo,
} from "../../hooks/todos";

export function TodoHeader(): JSX.Element {
  const { data: todosCount = 0 } = useTodosCount();
  const { data: completedCount = 0 } = useCompletedCount();
  const addTodo = useAddTodo();
  const toggleAllTodo = useToggleAllTodo();
  return (
    <Component
      todosCount={todosCount}
      completedCount={completedCount}
      addTodo={addTodo.mutate}
      toggleAllTodo={toggleAllTodo.mutate}
    ></Component>
  );
}
