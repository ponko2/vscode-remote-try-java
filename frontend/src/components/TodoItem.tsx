import { cva } from "class-variance-authority";
import clsx from "clsx";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import type { components } from "../api/schema";
import { TodoButton } from "./TodoButton";

type Props = {
  todo: components["schemas"]["TodoResponse"];
  deleteTodo: (id: string) => void;
  toggleTodo: (data: components["schemas"]["TodoResponse"]) => void;
  updateTodo: (data: components["schemas"]["TodoResponse"]) => void;
};

export function TodoItem({ todo, deleteTodo, toggleTodo, updateTodo }: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(todo.title);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      ref.current?.focus();
    }
  }, [editing]);

  function saveTodo(data: components["schemas"]["TodoResponse"]) {
    if (data.title.length === 0) {
      deleteTodo(data.id);
    } else {
      updateTodo(data);
    }
    setEditing(false);
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    saveTodo({ ...todo, title: event.target.value });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const title = event.currentTarget.value.trim();
    if (event.key === "Enter") {
      saveTodo({ ...todo, title });
    }
  }

  function handleDoubleClick() {
    setEditing(true);
  }

  const list = cva(["relative", "text-2xl", "h-16"], {
    variants: {
      intent: {
        primary: ["group"],
        editing: ["pl-11"],
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  });

  if (editing) {
    return (
      <li className={list({ intent: "editing" })}>
        <input
          className={clsx(
            "size-full",
            "border",
            "border-neutral-400",
            "px-4",
            "py-3",
            "shadow-inner",
            "focus:shadow",
            "focus:shadow-red-400",
            "focus:outline-none",
          )}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={ref}
          type="text"
          value={value}
        />
      </li>
    );
  }
  return (
    <li className={list()}>
      <input
        checked={todo.completed}
        className={clsx(
          "peer",
          "absolute",
          "inset-y-0",
          "my-auto",
          "size-12",
          "appearance-none",
          "outline-none",
        )}
        onChange={() => toggleTodo(todo)}
        type="checkbox"
      />
      <label
        className={clsx(
          "block",
          "h-full",
          "break-words",
          "bg-unchecked",
          "bg-left",
          "bg-no-repeat",
          "py-4",
          "pl-14",
          "pr-4",
          "font-normal",
          "leading-tight",
          "text-neutral-700",
          "transition-colors",
          "duration-500",
          "peer-checked:bg-checked",
          "peer-checked:text-neutral-400",
          "peer-checked:line-through",
          "peer-focus:shadow",
          "peer-focus:shadow-red-400",
          "peer-focus:outline-none",
        )}
        onDoubleClick={handleDoubleClick}
      >
        {todo.title}
      </label>
      <TodoButton
        className={clsx(
          "absolute",
          "inset-y-0",
          "right-2.5",
          "my-auto",
          "hidden",
          "size-10",
          "text-3xl",
          "text-neutral-400",
          "transition-colors",
          "duration-200",
          "ease-out",
          "after:block",
          "after:h-full",
          "after:content-['×']",
          "hover:text-red-400",
          "focus:text-red-400",
          "group-hover:block",
        )}
        onClick={() => deleteTodo(todo.id)}
      />
    </li>
  );
}
