import clsx from "clsx";
import type { components } from "../api/schema";
import { TodoItem } from "./TodoItem";

type Props = {
  todos: components["schemas"]["TodoResponse"][];
  deleteTodo: (id: string) => void;
  toggleTodo: (data: components["schemas"]["TodoResponse"]) => void;
  updateTodo: (data: components["schemas"]["TodoResponse"]) => void;
};

export function TodoList({ todos, deleteTodo, toggleTodo, updateTodo }: Props) {
  return (
    <section>
      <ul className={clsx("divide-y", "divide-neutral-200")}>
        {todos.map((todo) => (
          <TodoItem
            deleteTodo={deleteTodo}
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            updateTodo={updateTodo}
          />
        ))}
      </ul>
    </section>
  );
}
