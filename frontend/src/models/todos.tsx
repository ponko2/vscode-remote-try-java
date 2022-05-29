export type TodoResponseModel = {
  id: string;
  title: string;
  completed: boolean;
};

export type TodoIndexResponseModel = {
  todos: TodoResponseModel[];
};

export type TodoPostRequestModel = {
  title: string;
};

export type TodoPostResponseModel = {
  id: string;
};

export type TodoPatchRequestModel = {
  id: string;
  title: string;
  completed: boolean;
};
