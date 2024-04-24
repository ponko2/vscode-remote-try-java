import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { TodoHeader } from "./TodoHeader";

const meta = {
  component: TodoHeader,
} satisfies Meta<typeof TodoHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    createTodo: action("createTodo"),
    toggleAllTodos: action("toggleAllTodos"),
    todosCount: 0,
    completedTodosCount: 0,
  },
} satisfies Story;

export const HasActive = {
  args: {
    ...Basic.args,
    todosCount: 1,
    completedTodosCount: 0,
  },
} satisfies Story;

export const IsAllCompleted = {
  args: {
    ...Basic.args,
    todosCount: 1,
    completedTodosCount: 1,
  },
} satisfies Story;
