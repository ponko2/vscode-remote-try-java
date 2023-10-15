package com.example.demo.web.controller;

import com.example.demo.application.todo.TodoApplicationService;
import com.example.demo.application.todo.TodoNotFoundException;
import com.example.demo.application.todo.create.TodoCreateCommand;
import com.example.demo.application.todo.delete.TodoDeleteCommand;
import com.example.demo.application.todo.get.TodoGetCommand;
import com.example.demo.application.todo.update.TodoUpdateCommand;
import com.example.demo.web.model.todo.common.TodoResponseModel;
import com.example.demo.web.model.todo.get.TodoGetResponseModel;
import com.example.demo.web.model.todo.index.TodoIndexResponseModel;
import com.example.demo.web.model.todo.patch.TodoPatchRequestModel;
import com.example.demo.web.model.todo.post.TodoPostRequestModel;
import com.example.demo.web.model.todo.post.TodoPostResponseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/** TodoController. */
@RestController
@RequestMapping("api/todos")
public class TodoController {
  private final TodoApplicationService todoApplicationService;

  @Autowired
  public TodoController(final TodoApplicationService todoApplicationService) {
    this.todoApplicationService = todoApplicationService;
  }

  /**
   * index.
   *
   * @return TodoIndexResponseModel
   */
  @GetMapping
  public TodoIndexResponseModel index() {
    final var result = todoApplicationService.getAll();
    final var todos =
        result.todos().stream()
            .map(v -> new TodoResponseModel(v.id(), v.title(), v.completed()))
            .toList();
    return new TodoIndexResponseModel(todos);
  }

  /**
   * get.
   *
   * @param id ID
   * @return TodoGetResponseModel
   */
  @GetMapping("{id}")
  public TodoGetResponseModel get(@PathVariable final String id) {
    try {
      final var command = new TodoGetCommand(id);
      final var result = todoApplicationService.get(command);
      final var todo = new TodoResponseModel(result.todo());
      return new TodoGetResponseModel(todo);
    } catch (final TodoNotFoundException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
    }
  }

  /**
   * post.
   *
   * @param request Request
   * @return TodoPostResponseModel
   */
  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public TodoPostResponseModel post(@Validated @RequestBody final TodoPostRequestModel request) {
    final var command = new TodoCreateCommand(request.title());
    final var result = todoApplicationService.create(command);
    return new TodoPostResponseModel(result.createdTodoId());
  }

  /**
   * patch.
   *
   * @param id ID
   * @param request Request
   */
  @PatchMapping("{id}")
  public void patch(
      @PathVariable final String id, @RequestBody final TodoPatchRequestModel request) {
    try {
      final var command = new TodoUpdateCommand(id, request.title(), request.completed());
      todoApplicationService.update(command);
    } catch (final TodoNotFoundException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
    }
  }

  /**
   * delete.
   *
   * @param id ID
   */
  @DeleteMapping("{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable final String id) {
    try {
      final var command = new TodoDeleteCommand(id);
      todoApplicationService.delete(command);
    } catch (final TodoNotFoundException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
    }
  }
}
