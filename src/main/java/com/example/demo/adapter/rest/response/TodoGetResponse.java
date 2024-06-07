package com.example.demo.adapter.rest.response;

import io.swagger.v3.oas.annotations.media.Schema;

/** TodoResponse. */
public record TodoGetResponse(
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED) TodoResponse todo) {}
