import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type { components } from "../api/schema";
import { createTodo, deleteTodo, fetchTodos, updateTodo } from "../api/todos";

export function todosQueryOptions() {
  return queryOptions({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    select: (data) => data.todos,
  });
}

export function activeTodosQueryOptions() {
  return queryOptions({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    select: (data) => data.todos.filter((todo) => !todo.completed),
  });
}

export function completedTodosQueryOptions() {
  return queryOptions({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    select: (data) => data.todos.filter((todo) => todo.completed),
  });
}

export function todosCountQueryOptions() {
  return queryOptions({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    select: (data) => data.todos.length,
  });
}

export function completedTodosCountQueryOptions() {
  return queryOptions({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    select: (data) => data.todos.filter((todo) => todo.completed).length,
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTodo,
    async onMutate(newTitle) {
      await queryClient.cancelQueries({
        queryKey: ["todos"],
      });
      const previousData = queryClient.getQueryData<
        components["schemas"]["TodoIndexResponse"]
      >(["todos"]);
      if (typeof previousData === "undefined") {
        return {};
      }
      queryClient.setQueryData<components["schemas"]["TodoIndexResponse"]>(
        ["todos"],
        {
          ...previousData,
          todos: [
            ...previousData.todos,
            { id: Math.random().toString(), title: newTitle, completed: false },
          ],
        },
      );
      return { previousData };
    },
    onError(_error, _variables, context) {
      if (context?.previousData) {
        queryClient.setQueryData(["todos"], context.previousData);
      }
    },
    onSettled() {
      void queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSettled() {
      void queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTodo,
    async onMutate(newTodo) {
      await queryClient.cancelQueries({
        queryKey: ["todos"],
      });
      const previousData = queryClient.getQueryData<
        components["schemas"]["TodoIndexResponse"]
      >(["todos"]);
      if (typeof previousData === "undefined") {
        return {};
      }
      queryClient.setQueryData<components["schemas"]["TodoIndexResponse"]>(
        ["todos"],
        {
          ...previousData,
          todos: previousData.todos.map((todo) => {
            if (todo.id === newTodo.id) {
              return newTodo;
            }
            return todo;
          }),
        },
      );
      return { previousData };
    },
    onError(_error, _variables, context) {
      if (context?.previousData) {
        queryClient.setQueryData(["todos"], context.previousData);
      }
    },
    onSettled() {
      void queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
}

async function toggleTodo({
  id,
  title,
  completed,
}: {
  id: string;
  title: string;
  completed: boolean;
}) {
  await updateTodo({ id, title, completed: !completed });
}

export function useToggleTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleTodo,
    async onMutate(newTodo) {
      await queryClient.cancelQueries({
        queryKey: ["todos"],
      });
      const previousData = queryClient.getQueryData<
        components["schemas"]["TodoIndexResponse"]
      >(["todos"]);
      if (typeof previousData === "undefined") {
        return {};
      }
      queryClient.setQueryData<components["schemas"]["TodoIndexResponse"]>(
        ["todos"],
        {
          ...previousData,
          todos: previousData.todos.map((todo) => {
            if (todo.id === newTodo.id) {
              return { ...todo, completed: !todo.completed };
            }
            return todo;
          }),
        },
      );
      return { previousData };
    },
    onError(_error, _variables, context) {
      if (context?.previousData) {
        queryClient.setQueryData(["todos"], context.previousData);
      }
    },
    onSettled() {
      void queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
}

async function toggleAllTodos(
  todos: components["schemas"]["TodoResponse"][] = [],
) {
  const completed = !todos.every((todo) => todo.completed);
  await Promise.all(todos.map((todo) => updateTodo({ ...todo, completed })));
}

export function useToggleAllTodos() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<
    components["schemas"]["TodoIndexResponse"]
  >(["todos"]);
  return useMutation({
    mutationFn: () => toggleAllTodos(data?.todos ?? []),
    onSettled() {
      void queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
}

async function clearCompletedTodos(
  todos: components["schemas"]["TodoResponse"][] = [],
) {
  await Promise.all(
    todos.filter(({ completed }) => completed).map(({ id }) => deleteTodo(id)),
  );
}

export function useClearCompletedTodos() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<
    components["schemas"]["TodoIndexResponse"]
  >(["todos"]);
  return useMutation({
    mutationFn: () => clearCompletedTodos(data?.todos ?? []),
    onSettled() {
      void queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
}
