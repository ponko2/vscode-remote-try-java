package com.example.demo.adapter.rest.response;

import io.swagger.v3.oas.annotations.media.Schema;

/** TodoResponse. */
public record TodoGetResponse(@Schema(required = true) TodoResponse todo) {}
