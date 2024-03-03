package com.example.demo.adapter.rest.response;

import com.example.demo.application.result.TodoResult;
import io.swagger.v3.oas.annotations.media.Schema;

/** TodoResponse. */
public record TodoResponse(
    @Schema(required = true) String id,
    @Schema(required = true) String title,
    @Schema(required = true) boolean completed) {

  public TodoResponse(final TodoResult todo) {
    this(todo.id(), todo.title(), todo.completed());
  }
}
