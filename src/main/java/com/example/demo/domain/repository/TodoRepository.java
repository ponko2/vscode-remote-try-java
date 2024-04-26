package com.example.demo.domain.repository;

import com.example.demo.domain.model.Todo;
import com.example.demo.domain.model.TodoId;
import java.util.Collection;
import java.util.Optional;

/** TodoRepository. */
public interface TodoRepository {

  Collection<Todo> findAll();

  Optional<Todo> find(TodoId id);

  void save(Todo todo);

  void delete(Todo todo);
}
