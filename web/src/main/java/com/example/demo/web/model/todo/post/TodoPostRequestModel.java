package com.example.demo.web.model.todo.post;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/** TodoPostRequestModel. */
public record TodoPostRequestModel(@NotBlank @Size(max = 255) String title) {}
