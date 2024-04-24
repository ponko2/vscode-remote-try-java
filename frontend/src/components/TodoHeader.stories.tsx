import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { TodoHeader } from "./TodoHeader";

const meta = {
  component: TodoHeader,
} satisfies Meta<typeof TodoHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    createTodo: fn(),
    toggleAllTodos: fn(),
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
