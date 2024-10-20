package com.example.demo.application.service;

import com.example.demo.application.command.TodoCreateCommand;
import com.example.demo.application.command.TodoDeleteCommand;
import com.example.demo.application.command.TodoGetCommand;
import com.example.demo.application.command.TodoUpdateCommand;
import com.example.demo.application.result.TodoCreateResult;
import com.example.demo.application.result.TodoGetAllResult;
import com.example.demo.application.result.TodoGetResult;

/** TodoApplicationService. */
public interface TodoApplicationService {

  /** Get. */
  TodoGetResult get(TodoGetCommand command);

  /** Get all. */
  TodoGetAllResult getAll();

  /** Create. */
  TodoCreateResult create(TodoCreateCommand command);

  /** Update. */
  void update(TodoUpdateCommand command);

  /** Delete. */
  void delete(TodoDeleteCommand command);
}
