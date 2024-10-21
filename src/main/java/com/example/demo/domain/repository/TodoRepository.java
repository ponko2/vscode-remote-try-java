package com.example.demo.domain.repository;

import com.example.demo.domain.model.Todo;
import com.example.demo.domain.model.TodoId;
import java.util.Collection;
import java.util.Optional;

/** TodoRepository. */
public interface TodoRepository {

  /** Find all. */
  Collection<Todo> findAll();

  /** Find. */
  Optional<Todo> find(TodoId id);

  /** Save. */
  void save(Todo todo);

  /** Delete. */
  void delete(Todo todo);
}
