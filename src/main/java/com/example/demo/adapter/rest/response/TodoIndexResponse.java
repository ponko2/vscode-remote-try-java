package com.example.demo.adapter.rest.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.Collection;
import org.jspecify.annotations.NonNull;

/** TodoIndexResponse. */
public record TodoIndexResponse(
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED) Collection<@NonNull TodoResponse> todos) {}
