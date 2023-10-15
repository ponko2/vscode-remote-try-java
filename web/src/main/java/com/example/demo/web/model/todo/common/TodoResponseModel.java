package com.example.demo.web.model.todo.common;

import com.example.demo.application.todo.common.TodoData;

/** TodoResponseModel. */
public record TodoResponseModel(String id, String title, boolean completed) {
  public TodoResponseModel(final TodoData todo) {
    this(todo.id(), todo.title(), todo.completed());
  }
}
