package com.example.demo.web.model.todo.patch;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/** TodoPatchRequestModel. */
public record TodoPatchRequestModel(
    @NotBlank @Size(max = 255) String title, @NotNull Boolean completed) {}
