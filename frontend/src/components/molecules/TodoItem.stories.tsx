import { action } from "@storybook/addon-actions";
import type { Meta, StoryFn } from "@storybook/react";
import { TodoItem } from "./TodoItem";

export default {
  component: TodoItem,
  decorators: [
    (Story) => (
      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
        <Story />
      </ul>
    ),
  ],
} as Meta<typeof TodoItem>;

const Template: StoryFn<typeof TodoItem> = (args) => (
  <TodoItem
    {...args}
    editTodo={action("editTodo")}
    deleteTodo={action("deleteTodo")}
    toggleTodo={action("toggleTodo")}
  />
);

export const Basic = Template.bind({});

Basic.args = {
  todo: {
    id: "01FYH5XVSNVSXTSGB8KB858REF",
    title: "Hello, World!!",
    completed: false,
  },
};

export const Completed = Template.bind({});

Completed.args = {
  todo: {
    id: "01FYH5XVSNVSXTSGB8KB858REF",
    title: "Hello, World!!",
    completed: true,
  },
};
