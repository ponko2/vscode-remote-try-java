package com.example.demo.domain.model.todo;

import java.util.Collection;
import java.util.Optional;

/** TodoRepository. */
public interface TodoRepository {
  Collection<Todo> findAll();

  Optional<Todo> find(TodoId id);

  void save(Todo todo);

  void delete(Todo todo);
}
