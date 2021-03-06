package com.example.demo.web.model.todo.post;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/** TodoPostRequestModel. */
public record TodoPostRequestModel(@NotBlank @Size(max = 255) String title) {}
