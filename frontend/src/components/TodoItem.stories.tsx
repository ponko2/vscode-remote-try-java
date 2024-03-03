import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { TodoItem } from "./TodoItem";

const meta: Meta<typeof TodoItem> = {
  component: TodoItem,
  decorators: [
    (Story) => (
      <ul>
        <Story />
      </ul>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    deleteTodo: action("deleteTodo"),
    toggleTodo: action("toggleTodo"),
    updateTodo: action("updateTodo"),
    todo: {
      id: "01FYH5XVSNVSXTSGB8KB858REF",
      title: "Hello, World!!",
      completed: false,
    },
  },
};

export const Completed: Story = {
  args: {
    ...Basic.args,
    todo: {
      id: "01FYH5XVSNVSXTSGB8KB858REF",
      title: "Hello, World!!",
      completed: true,
    },
  },
};
