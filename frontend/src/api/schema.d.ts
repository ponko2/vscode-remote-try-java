/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/api/todos": {
    get: operations["index"];
    post: operations["post"];
  };
  "/api/todos/{id}": {
    get: operations["get"];
    delete: operations["delete"];
    patch: operations["patch"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    TodoPostRequestBody: {
      title: string;
    };
    TodoPostResponse: {
      createdTodoId: string;
    };
    TodoPatchRequestBody: {
      title: string;
      completed: boolean;
    };
    TodoIndexResponse: {
      todos: components["schemas"]["TodoResponse"][];
    };
    TodoResponse: {
      id: string;
      title: string;
      completed: boolean;
    };
    TodoGetResponse: {
      todo: components["schemas"]["TodoResponse"];
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  index: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["TodoIndexResponse"];
        };
      };
    };
  };
  post: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["TodoPostRequestBody"];
      };
    };
    responses: {
      /** @description Created */
      201: {
        content: {
          "application/json": components["schemas"]["TodoPostResponse"];
        };
      };
    };
  };
  get: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["TodoGetResponse"];
        };
      };
    };
  };
  delete: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** @description No Content */
      204: {
        content: never;
      };
    };
  };
  patch: {
    parameters: {
      path: {
        id: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["TodoPatchRequestBody"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: never;
      };
    };
  };
}
