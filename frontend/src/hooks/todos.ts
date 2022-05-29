import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { api } from "../api";
import {
  TodoIndexResponseModel,
  TodoPatchRequestModel,
  TodoPostResponseModel,
} from "../models/todos";

const fetchTodos = async (): Promise<TodoIndexResponseModel> => {
  return api.get("/api/todos").json();
};

export function useTodos<TData = TodoIndexResponseModel, TError = Error>(
  select?: (todos: TodoIndexResponseModel) => TData
): UseQueryResult<TData, TError> {
  return useQuery("todos", fetchTodos, { select });
}

export function useTodosCount(): UseQueryResult<number, Error> {
  return useTodos((data) => data.todos.length);
}

export function useCompletedCount(): UseQueryResult<number, Error> {
  return useTodos((data) => data.todos.filter((todo) => todo.completed).length);
}

const addTodo = async (title: string): Promise<TodoPostResponseModel> => {
  return api.post("/api/todos", { json: { title } }).json();
};

export function useAddTodo(): UseMutationResult<
  TodoPostResponseModel,
  Error,
  string,
  { previousData?: TodoIndexResponseModel }
> {
  const queryClient = useQueryClient();
  return useMutation(addTodo, {
    async onMutate(newTitle) {
      await queryClient.cancelQueries("todos");
      const previousData =
        queryClient.getQueryData<TodoIndexResponseModel>("todos");
      if (previousData) {
        queryClient.setQueryData<TodoIndexResponseModel>("todos", {
          ...previousData,
          todos: [
            ...previousData.todos,
            { id: Math.random().toString(), title: newTitle, completed: false },
          ],
        });
      }
      return { previousData };
    },
    onError(error, variables, context) {
      if (context?.previousData) {
        queryClient.setQueryData("todos", context.previousData);
      }
    },
    onSettled() {
      void queryClient.invalidateQueries("todos");
    },
  });
}

const deleteTodo = async (id: string): Promise<void> => {
  await api.delete(`/api/todos/${id}`);
};

export function useDeleteTodo(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();
  return useMutation(deleteTodo, {
    onSettled() {
      void queryClient.invalidateQueries("todos");
    },
  });
}

const editTodo = async ({
  id,
  title,
  completed,
}: TodoPatchRequestModel): Promise<void> => {
  await api.patch(`/api/todos/${id}`, { json: { title, completed } });
};

export function useEditTodo(): UseMutationResult<
  void,
  Error,
  TodoPatchRequestModel,
  { previousData?: TodoIndexResponseModel }
> {
  const queryClient = useQueryClient();
  return useMutation(editTodo, {
    async onMutate(newTodo) {
      await queryClient.cancelQueries("todos");
      const previousData =
        queryClient.getQueryData<TodoIndexResponseModel>("todos");
      if (previousData) {
        queryClient.setQueryData<TodoIndexResponseModel>("todos", {
          ...previousData,
          todos: previousData.todos.map((todo) => {
            if (todo.id === newTodo.id) {
              return newTodo;
            }
            return todo;
          }),
        });
      }
      return { previousData };
    },
    onError(error, variables, context) {
      if (context?.previousData) {
        queryClient.setQueryData("todos", context.previousData);
      }
    },
    onSettled() {
      void queryClient.invalidateQueries("todos");
    },
  });
}

const toggleTodo = async (data: TodoPatchRequestModel): Promise<void> => {
  await editTodo({ ...data, completed: !data.completed });
};

export function useToggleTodo(): UseMutationResult<
  void,
  Error,
  TodoPatchRequestModel,
  { previousData?: TodoIndexResponseModel }
> {
  const queryClient = useQueryClient();
  return useMutation(toggleTodo, {
    async onMutate(newTodo) {
      await queryClient.cancelQueries("todos");
      const previousData =
        queryClient.getQueryData<TodoIndexResponseModel>("todos");
      if (previousData) {
        queryClient.setQueryData<TodoIndexResponseModel>("todos", {
          ...previousData,
          todos: previousData.todos.map((todo) => {
            if (todo.id === newTodo.id) {
              return { ...todo, completed: !todo.completed };
            }
            return todo;
          }),
        });
      }
      return { previousData };
    },
    onError(error, variables, context) {
      if (context?.previousData) {
        queryClient.setQueryData("todos", context.previousData);
      }
    },
    onSettled() {
      void queryClient.invalidateQueries("todos");
    },
  });
}

const toggleAllTodo = async (
  todos: TodoPatchRequestModel[] = []
): Promise<void> => {
  const completed = !todos.every((todo) => todo.completed);
  await Promise.all(todos.map((todo) => editTodo({ ...todo, completed })));
};

export function useToggleAllTodo(): UseMutationResult<void, Error, void> {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<TodoIndexResponseModel>("todos");
  return useMutation(() => toggleAllTodo(data?.todos ?? []), {
    onSettled() {
      void queryClient.invalidateQueries("todos");
    },
  });
}

const clearCompleted = async (
  todos: TodoPatchRequestModel[] = []
): Promise<void> => {
  await Promise.all(
    todos.filter(({ completed }) => completed).map(({ id }) => deleteTodo(id))
  );
};

export function useClearCompleted(): UseMutationResult<void, Error, void> {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<TodoIndexResponseModel>("todos");
  return useMutation(() => clearCompleted(data?.todos ?? []), {
    onSettled() {
      void queryClient.invalidateQueries("todos");
    },
  });
}
