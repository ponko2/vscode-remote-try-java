package com.example.demo.application.result;

import com.example.demo.domain.model.Todo;

/** TodoResult. */
public record TodoResult(String id, String title, boolean completed) {

  public TodoResult(final Todo todo) {
    this(todo.id().value(), todo.title().value(), todo.completed());
  }
}
