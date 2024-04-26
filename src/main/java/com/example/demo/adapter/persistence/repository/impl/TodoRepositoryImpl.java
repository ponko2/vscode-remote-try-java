package com.example.demo.adapter.persistence.repository.impl;

import com.example.demo.adapter.persistence.mapper.TodoMapper;
import com.example.demo.adapter.persistence.model.TodoDataModel;
import com.example.demo.domain.model.Todo;
import com.example.demo.domain.model.TodoId;
import com.example.demo.domain.model.TodoTitle;
import com.example.demo.domain.repository.TodoRepository;
import java.util.Collection;
import java.util.Optional;
import org.springframework.stereotype.Repository;

/** TodoRepositoryImpl. */
@Repository
public class TodoRepositoryImpl implements TodoRepository {

  private final TodoMapper todoMapper;

  /**
   * TodoRepositoryImpl.
   *
   * @param todoMapper Todo mapper
   */
  public TodoRepositoryImpl(final TodoMapper todoMapper) {
    this.todoMapper = todoMapper;
  }

  @Override
  public Collection<Todo> findAll() {
    return todoMapper.findAll().stream().map(this::toModel).toList();
  }

  @Override
  public Optional<Todo> find(final TodoId id) {
    return todoMapper.findById(id.value()).map(this::toModel);
  }

  @Override
  public void save(final Todo todo) {
    todoMapper
        .findById(todo.id().value())
        .ifPresentOrElse(
            found -> {
              final var data = transfer(todo, found);
              todoMapper.update(data);
            },
            () -> {
              final var data = toDataModel(todo);
              todoMapper.insert(data);
            });
  }

  @Override
  public void delete(final Todo todo) {
    final var data = toDataModel(todo);
    todoMapper.delete(data);
  }

  private Todo toModel(final TodoDataModel from) {
    return new Todo(new TodoId(from.id()), new TodoTitle(from.title()), from.completed());
  }

  private TodoDataModel toDataModel(final Todo from) {
    return new TodoDataModel(from.id().value(), from.title().value(), from.completed());
  }

  private TodoDataModel transfer(final Todo from, final TodoDataModel model) {
    return new TodoDataModel(model.id(), from.title().value(), from.completed());
  }
}
