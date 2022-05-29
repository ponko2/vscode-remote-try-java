import { TodoFooter as Component } from "../../components/organisms/TodoFooter";
import {
  useClearCompleted,
  useCompletedCount,
  useTodosCount,
} from "../../hooks/todos";

export const TodoFooter = (): JSX.Element => {
  const { data: todosCount = 0 } = useTodosCount();
  const { data: completedCount = 0 } = useCompletedCount();
  const clearCompleted = useClearCompleted();
  return (
    <Component
      todosCount={todosCount}
      completedCount={completedCount}
      clearCompleted={clearCompleted.mutate}
    ></Component>
  );
};
