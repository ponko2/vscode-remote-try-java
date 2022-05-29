package com.example.demo.application.todo;

import com.example.demo.application.todo.common.TodoData;
import com.example.demo.application.todo.create.TodoCreateCommand;
import com.example.demo.application.todo.create.TodoCreateResult;
import com.example.demo.application.todo.delete.TodoDeleteCommand;
import com.example.demo.application.todo.get.TodoGetCommand;
import com.example.demo.application.todo.get.TodoGetResult;
import com.example.demo.application.todo.getall.TodoGetAllResult;
import com.example.demo.application.todo.update.TodoUpdateCommand;
import com.example.demo.domain.model.todo.Todo;
import com.example.demo.domain.model.todo.TodoFactory;
import com.example.demo.domain.model.todo.TodoId;
import com.example.demo.domain.model.todo.TodoRepository;
import com.example.demo.domain.model.todo.TodoTitle;
import org.springframework.beans.factory.annotation.Autowired;
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
  @Autowired
  public TodoApplicationServiceImpl(TodoFactory todoFactory, TodoRepository todoRepository) {
    this.todoFactory = todoFactory;
    this.todoRepository = todoRepository;
  }

  @Override
  public TodoGetResult get(TodoGetCommand command) {
    var todo =
        todoRepository
            .find(new TodoId(command.id()))
            .map(TodoData::new)
            .orElseThrow(() -> new TodoNotFoundException("タスクが見つかりませんでした。"));
    return new TodoGetResult(todo);
  }

  @Override
  public TodoGetAllResult getAll() {
    var todos = todoRepository.findAll().stream().map(TodoData::new).toList();
    return new TodoGetAllResult(todos);
  }

  @Transactional
  @Override
  public TodoCreateResult create(TodoCreateCommand command) {
    var title = new TodoTitle(command.title());
    var todo = todoFactory.create(title);
    todoRepository.save(todo);

    return new TodoCreateResult(todo.id().value());
  }

  @Transactional
  @Override
  public void update(TodoUpdateCommand command) {
    var todo =
        todoRepository
            .find(new TodoId(command.id()))
            .orElseThrow(() -> new TodoNotFoundException("タスクが見つかりませんでした。"));

    // TODO: もっとDDDっぽい処理にする
    todoRepository.save(new Todo(todo.id(), new TodoTitle(command.title()), command.completed()));
  }

  @Transactional
  @Override
  public void delete(TodoDeleteCommand command) {
    var todo =
        todoRepository
            .find(new TodoId(command.id()))
            .orElseThrow(() -> new TodoNotFoundException("タスクが見つかりませんでした。"));

    todoRepository.delete(todo);
  }
}
