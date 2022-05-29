package com.example.demo.application.todo.common;

import com.example.demo.domain.model.todo.Todo;

/** TodoData. */
public record TodoData(String id, String title, boolean completed) {
  public TodoData(Todo todo) {
    this(todo.id().value(), todo.title().value(), todo.completed());
  }
}
