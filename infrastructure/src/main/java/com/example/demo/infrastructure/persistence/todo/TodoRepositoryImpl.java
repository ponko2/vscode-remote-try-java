package com.example.demo.infrastructure.persistence.todo;

import com.example.demo.domain.model.todo.Todo;
import com.example.demo.domain.model.todo.TodoId;
import com.example.demo.domain.model.todo.TodoRepository;
import com.example.demo.domain.model.todo.TodoTitle;
import com.example.demo.infrastructure.persistence.datamodel.TodoDataModel;
import java.util.Collection;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/** TodoRepositoryImpl. */
@Repository
public class TodoRepositoryImpl implements TodoRepository {
  private TodoMapper todoMapper;

  /**
   * TodoRepositoryImpl.
   *
   * @param todoMapper Todo mapper
   */
  @Autowired
  public TodoRepositoryImpl(TodoMapper todoMapper) {
    this.todoMapper = todoMapper;
  }

  @Override
  public Collection<Todo> findAll() {
    return todoMapper.findAll().stream().map(this::toModel).toList();
  }

  @Override
  public Optional<Todo> find(TodoId id) {
    return todoMapper.findById(id.value().toString()).map(this::toModel);
  }

  @Override
  public void save(Todo todo) {
    todoMapper
        .findById(todo.id().value())
        .ifPresentOrElse(
            found -> {
              var data = transfer(todo, found);
              todoMapper.update(data);
            },
            () -> {
              var data = toDataModel(todo);
              todoMapper.insert(data);
            });
  }

  @Override
  public void delete(Todo todo) {
    var data = toDataModel(todo);
    todoMapper.delete(data);
  }

  private Todo toModel(TodoDataModel from) {
    return new Todo(new TodoId(from.getId()), new TodoTitle(from.getTitle()), from.isCompleted());
  }

  private TodoDataModel toDataModel(Todo from) {
    TodoDataModel to = TodoDataModel.create();
    to.setId(from.id().value());
    to.setTitle(from.title().value());
    to.setCompleted(from.completed());
    return to;
  }

  private TodoDataModel transfer(Todo from, TodoDataModel model) {
    TodoDataModel to = TodoDataModel.create().from(model);
    to.setTitle(from.title().value());
    to.setCompleted(from.completed());
    return to;
  }
}
