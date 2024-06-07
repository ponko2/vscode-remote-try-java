package com.example.demo.adapter.rest.response;

import io.swagger.v3.oas.annotations.media.Schema;

/** TodoPostResponse. */
public record TodoPostResponse(
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED) String createdTodoId) {}
