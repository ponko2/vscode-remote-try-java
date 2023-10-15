package com.example.demo.infrastructure.persistence.todo;

import com.example.demo.domain.model.todo.Todo;
import com.example.demo.domain.model.todo.TodoId;
import com.example.demo.domain.model.todo.TodoRepository;
import com.example.demo.domain.model.todo.TodoTitle;
import com.example.demo.infrastructure.persistence.datamodel.TodoDataModel;
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
