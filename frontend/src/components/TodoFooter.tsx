import type { LinkProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import { TodoButton } from "./TodoButton";

type Props = {
  todosCount: number;
  completedTodosCount: number;
  clearCompletedTodos: () => void;
};

export function TodoFooter({
  todosCount,
  completedTodosCount,
  clearCompletedTodos,
}: Props) {
  if (todosCount <= 0) {
    return null;
  }

  const activeCount = todosCount - completedTodosCount;

  const link = cva(
    [
      "m-1",
      "rounded",
      "border",
      "px-2",
      "py-1",
      "no-underline",
      "hover:border-red-400",
    ],
    {
      variants: {
        intent: {
          active: ["border-red-700"],
          inactive: ["border-transparent"],
        },
      },
    },
  );

  const links: LinkProps[] = [
    { to: "/", children: "All" },
    { to: "/active", children: "Active" },
    { to: "/completed", children: "Completed" },
  ];

  return (
    <footer
      className={clsx(
        "isolate",
        "grid",
        "grid-cols-2",
        "gap-2",
        "px-4",
        "py-2.5",
        "sm:grid-cols-3",
      )}
    >
      <span>
        <strong className="font-light">{activeCount ?? "No"}</strong>{" "}
        {activeCount === 1 ? "item" : "items"} left
      </span>
      <ul
        className={clsx(
          "order-last",
          "col-span-full",
          "text-center",
          "sm:order-none",
          "sm:col-auto",
        )}
      >
        {links.map(({ to, children }) => (
          <li className="inline" key={to}>
            <Link
              activeProps={{ className: link({ intent: "active" }) }}
              inactiveProps={{ className: link({ intent: "inactive" }) }}
              to={to}
            >
              {children}
            </Link>
          </li>
        ))}
      </ul>
      {!!completedTodosCount && (
        <TodoButton
          className={clsx(
            "cursor-pointer",
            "text-right",
            "no-underline",
            "hover:underline",
            "active:no-underline",
          )}
          onClick={clearCompletedTodos}
        >
          Clear completed
        </TodoButton>
      )}
    </footer>
  );
}
