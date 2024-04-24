import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { TodoItem } from "./TodoItem";

const meta = {
  component: TodoItem,
  decorators: [
    (Story) => (
      <ul>
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof TodoItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
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
} satisfies Story;

export const Completed = {
  args: {
    ...Basic.args,
    todo: {
      id: "01FYH5XVSNVSXTSGB8KB858REF",
      title: "Hello, World!!",
      completed: true,
    },
  },
} satisfies Story;
