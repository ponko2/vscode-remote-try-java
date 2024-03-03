import clsx from "clsx";
import type React from "react";

type Props = {
  todosCount: number;
  completedTodosCount: number;
  createTodo: (title: string) => void;
  toggleAllTodos: () => void;
};

export function TodoHeader({
  todosCount,
  completedTodosCount,
  createTodo,
  toggleAllTodos,
}: Props) {
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value.trim();
    if (event.key === "Enter") {
      if (newValue.length !== 0) {
        createTodo(newValue);
      }
      event.currentTarget.value = "";
    }
  }

  return (
    <header className={clsx("relative", "mt-32", "h-16")}>
      <h1
        className={clsx(
          "absolute",
          "bottom-16",
          "w-full",
          "pb-6",
          "text-center",
          "text-7xl/none",
          "font-extralight",
          "text-red-700",
          "[text-rendering:optimizeLegibility]",
        )}
      >
        todos
      </h1>
      <input
        className={clsx(
          "size-full",
          "py-4",
          "pl-14",
          "pr-4",
          "text-2xl",
          "shadow-inner",
          "placeholder:font-normal",
          "placeholder:italic",
          "placeholder:text-black/40",
          "focus:shadow",
          "focus:shadow-red-400",
          "focus:outline-none",
        )}
        onKeyDown={handleKeyDown}
        placeholder="What needs to be done?"
        type="text"
      />
      {!!todosCount && (
        <label>
          <input
            checked={completedTodosCount === todosCount}
            className={clsx("peer", "appearance-none")}
            onClick={toggleAllTodos}
            readOnly
            type="checkbox"
          />
          <span
            className={clsx(
              "absolute",
              "left-0",
              "top-0",
              "flex",
              "h-full",
              "w-12",
              "items-center",
              "justify-center",
              "text-[0]",
              "before:inline-block",
              "before:rotate-90",
              "before:px-7",
              "before:py-2.5",
              "before:text-2xl",
              "before:text-neutral-400",
              "before:content-['❯']",
              "peer-checked:before:text-neutral-700",
              "peer-focus:shadow",
              "peer-focus:shadow-red-400",
              "peer-focus:outline-none",
            )}
          >
            Mark all as complete
          </span>
        </label>
      )}
    </header>
  );
}
