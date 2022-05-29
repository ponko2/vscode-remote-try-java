package com.example.demo.application.todo;

import com.example.demo.application.todo.create.TodoCreateCommand;
import com.example.demo.application.todo.create.TodoCreateResult;
import com.example.demo.application.todo.delete.TodoDeleteCommand;
import com.example.demo.application.todo.get.TodoGetCommand;
import com.example.demo.application.todo.get.TodoGetResult;
import com.example.demo.application.todo.getall.TodoGetAllResult;
import com.example.demo.application.todo.update.TodoUpdateCommand;

/** TodoApplicationService. */
public interface TodoApplicationService {
  TodoGetResult get(TodoGetCommand command);

  TodoGetAllResult getAll();

  TodoCreateResult create(TodoCreateCommand command);

  void update(TodoUpdateCommand command);

  void delete(TodoDeleteCommand command);
}
