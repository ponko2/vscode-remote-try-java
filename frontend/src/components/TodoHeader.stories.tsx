import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { TodoHeader } from "./TodoHeader";

const meta: Meta<typeof TodoHeader> = {
  component: TodoHeader,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    createTodo: action("createTodo"),
    toggleAllTodos: action("toggleAllTodos"),
    todosCount: 0,
    completedTodosCount: 0,
  },
};

export const HasActive: Story = {
  args: {
    ...Basic.args,
    todosCount: 1,
    completedTodosCount: 0,
  },
};

export const IsAllCompleted: Story = {
  args: {
    ...Basic.args,
    todosCount: 1,
    completedTodosCount: 1,
  },
};
