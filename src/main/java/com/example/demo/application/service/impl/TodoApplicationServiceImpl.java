package com.example.demo.application.service.impl;

import com.example.demo.application.command.TodoCreateCommand;
import com.example.demo.application.command.TodoDeleteCommand;
import com.example.demo.application.command.TodoGetCommand;
import com.example.demo.application.command.TodoUpdateCommand;
import com.example.demo.application.exception.TodoNotFoundException;
import com.example.demo.application.result.TodoCreateResult;
import com.example.demo.application.result.TodoGetAllResult;
import com.example.demo.application.result.TodoGetResult;
import com.example.demo.application.result.TodoResult;
import com.example.demo.application.service.TodoApplicationService;
import com.example.demo.domain.factory.TodoFactory;
import com.example.demo.domain.model.Todo;
import com.example.demo.domain.model.TodoId;
import com.example.demo.domain.model.TodoTitle;
import com.example.demo.domain.repository.TodoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** TodoApplicationServiceImpl. */
@Service
public class TodoApplicationServiceImpl implements TodoApplicationService {

  private final TodoFactory todoFactory;
  private final TodoRepository todoRepository;

  /**
   * TodoApplicationServiceImpl.
   *
   * @param todoFactory Todo factory
   * @param todoRepository Todo repository
   */
  public TodoApplicationServiceImpl(
      final TodoFactory todoFactory, final TodoRepository todoRepository) {
    this.todoFactory = todoFactory;
    this.todoRepository = todoRepository;
  }

  @Override
  public TodoGetResult get(final TodoGetCommand command) {
    final var todo =
        todoRepository
            .find(new TodoId(command.id()))
            .orElseThrow(() -> new TodoNotFoundException("タスクが見つかりませんでした。"));
    return new TodoGetResult(new TodoResult(todo));
  }

  @Override
  public TodoGetAllResult getAll() {
    final var todos = todoRepository.findAll().stream().map(TodoResult::new).toList();
    return new TodoGetAllResult(todos);
  }

  @Transactional
  @Override
  public TodoCreateResult create(final TodoCreateCommand command) {
    final var title = new TodoTitle(command.title());
    final var todo = todoFactory.create(title);
    todoRepository.save(todo);

    return new TodoCreateResult(todo.id().value());
  }

  @Transactional
  @Override
  public void update(final TodoUpdateCommand command) {
    final var todo =
        todoRepository
            .find(new TodoId(command.id()))
            .orElseThrow(() -> new TodoNotFoundException("タスクが見つかりませんでした。"));

    // TODO: もっとDDDっぽい処理にする
    todoRepository.save(new Todo(todo.id(), new TodoTitle(command.title()), command.completed()));
  }

  @Transactional
  @Override
  public void delete(final TodoDeleteCommand command) {
    final var todo =
        todoRepository
            .find(new TodoId(command.id()))
            .orElseThrow(() -> new TodoNotFoundException("タスクが見つかりませんでした。"));

    todoRepository.delete(todo);
  }
}
