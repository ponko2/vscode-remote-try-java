import { TodoList as Component } from "../../components/organisms/TodoList";
import {
  useDeleteTodo,
  useEditTodo,
  useTodos,
  useToggleTodo,
} from "../../hooks/todos";
import { TodoIndexResponseModel, TodoResponseModel } from "../../models/todos";

type Props = {
  select?: (data: TodoIndexResponseModel) => TodoResponseModel[];
};

export function TodoList({ select }: Props): JSX.Element {
  const { data: todos = [] } = useTodos(select);
  const editTodo = useEditTodo();
  const toggleTodo = useToggleTodo();
  const deleteTodo = useDeleteTodo();
  return (
    <Component
      todos={todos}
      editTodo={editTodo.mutate}
      toggleTodo={toggleTodo.mutate}
      deleteTodo={deleteTodo.mutate}
    />
  );
}
