import { TodoItem } from "../../components/molecules/TodoItem";
import { TodoPatchRequestModel, TodoResponseModel } from "../../models/todos";
import styles from "./TodoList.module.css";

type Props = {
  todos: TodoResponseModel[];
  deleteTodo: (id: string) => void;
  editTodo: (data: TodoPatchRequestModel) => void;
  toggleTodo: (data: TodoPatchRequestModel) => void;
};

export function TodoList({
  todos,
  deleteTodo,
  editTodo,
  toggleTodo,
}: Props): JSX.Element {
  return (
    <section className={styles.todoList}>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            editTodo={editTodo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </section>
  );
}
