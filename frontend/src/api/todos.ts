/* eslint-disable new-cap */
import { client } from "./client";

export async function fetchTodos() {
  const { data, error } = await client.GET("/api/todos");
  if (!data) {
    throw new Error(error);
  }
  return data;
}

export async function createTodo(title: string) {
  const { data, error } = await client.POST("/api/todos", { body: { title } });
  if (!data) {
    throw new Error(error);
  }
  return data;
}

export async function updateTodo({
  id,
  title,
  completed,
}: {
  id: string;
  title: string;
  completed: boolean;
}) {
  const { data, error } = await client.PATCH("/api/todos/{id}", {
    params: { path: { id } },
    body: { title, completed },
  });
  if (!data) {
    throw new Error(error);
  }
  return data;
}

export async function deleteTodo(id: string) {
  const { data, error } = await client.DELETE("/api/todos/{id}", {
    params: { path: { id } },
  });
  if (!data) {
    throw new Error(error);
  }
  return data;
}
