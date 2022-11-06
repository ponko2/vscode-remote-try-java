import { action } from "@storybook/addon-actions";
import type { Meta, StoryFn } from "@storybook/react";
import { TodoList } from "./TodoList";

export default {
  component: TodoList,
} as Meta<typeof TodoList>;

const Template: StoryFn<typeof TodoList> = (args) => (
  <TodoList
    {...args}
    deleteTodo={action("deleteTodo")}
    editTodo={action("editTodo")}
    toggleTodo={action("toggleTodo")}
  />
);

export const Basic = Template.bind({});

Basic.args = {
  todos: [
    {
      id: "01FYH5XVSNVSXTSGB8KB858REF",
      title: "foo",
      completed: false,
    },
    {
      id: "01G46BYCGQ1SGVGFMEXZ0DKZAY",
      title: "bar",
      completed: true,
    },
    {
      id: "01G46BZM28F68BCY7EP016G1EZ",
      title: "baz",
      completed: false,
    },
  ],
};
