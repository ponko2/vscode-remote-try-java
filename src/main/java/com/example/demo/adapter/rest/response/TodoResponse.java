package com.example.demo.adapter.rest.response;

import com.example.demo.application.result.TodoResult;
import io.swagger.v3.oas.annotations.media.Schema;

/** TodoResponse. */
public record TodoResponse(
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED) String id,
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED) String title,
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED) boolean completed) {

  /** TodoResponse. */
  public TodoResponse(final TodoResult todo) {
    this(todo.id(), todo.title(), todo.completed());
  }
}
