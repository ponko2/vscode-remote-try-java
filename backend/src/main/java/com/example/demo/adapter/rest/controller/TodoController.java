package com.example.demo.adapter.rest.controller;

import com.example.demo.adapter.rest.request.TodoPatchRequestBody;
import com.example.demo.adapter.rest.request.TodoPostRequestBody;
import com.example.demo.adapter.rest.response.TodoGetResponse;
import com.example.demo.adapter.rest.response.TodoIndexResponse;
import com.example.demo.adapter.rest.response.TodoPostResponse;
import com.example.demo.adapter.rest.response.TodoResponse;
import com.example.demo.application.command.TodoCreateCommand;
import com.example.demo.application.command.TodoDeleteCommand;
import com.example.demo.application.command.TodoGetCommand;
import com.example.demo.application.command.TodoUpdateCommand;
import com.example.demo.application.exception.TodoNotFoundException;
import com.example.demo.application.service.TodoApplicationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@CrossOrigin
@RestController
@RequestMapping("api/todos")
public class TodoController {

  private final TodoApplicationService todoApplicationService;

  public TodoController(final TodoApplicationService todoApplicationService) {
    this.todoApplicationService = todoApplicationService;
  }

  /**
   * index.
   *
   * @return TodoIndexResponse
   */
  @GetMapping(
      consumes = MediaType.APPLICATION_JSON_VALUE,
      produces = MediaType.APPLICATION_JSON_VALUE)
  public TodoIndexResponse index() {
    final var result = todoApplicationService.getAll();
    final var todos =
        result.todos().stream()
            .map(v -> new TodoResponse(v.id(), v.title(), v.completed()))
            .toList();
    return new TodoIndexResponse(todos);
  }

  /**
   * get.
   *
   * @param id ID
   * @return TodoGetResponse
   */
  @GetMapping(
      path = "{id}",
      consumes = MediaType.APPLICATION_JSON_VALUE,
      produces = MediaType.APPLICATION_JSON_VALUE)
  public TodoGetResponse get(@PathVariable final String id) {
    try {
      final var command = new TodoGetCommand(id);
      final var result = todoApplicationService.get(command);
      final var todo = new TodoResponse(result.todo());
      return new TodoGetResponse(todo);
    } catch (final TodoNotFoundException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
    }
  }

  /**
   * post.
   *
   * @param request Request
   * @return TodoPostResponse
   */
  @PostMapping(
      consumes = MediaType.APPLICATION_JSON_VALUE,
      produces = MediaType.APPLICATION_JSON_VALUE)
  @ResponseStatus(HttpStatus.CREATED)
  public TodoPostResponse post(@Validated @RequestBody final TodoPostRequestBody request) {
    final var command = new TodoCreateCommand(request.title());
    final var result = todoApplicationService.create(command);
    return new TodoPostResponse(result.createdTodoId());
  }

  /**
   * patch.
   *
   * @param id ID
   * @param request Request
   */
  @PatchMapping(
      path = "{id}",
      consumes = MediaType.APPLICATION_JSON_VALUE,
      produces = MediaType.APPLICATION_JSON_VALUE)
  public void patch(
      @PathVariable final String id, @RequestBody final TodoPatchRequestBody request) {
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
  @DeleteMapping(
      path = "{id}",
      consumes = MediaType.APPLICATION_JSON_VALUE,
      produces = MediaType.APPLICATION_JSON_VALUE)
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
