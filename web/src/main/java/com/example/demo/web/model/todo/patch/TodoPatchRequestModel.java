package com.example.demo.web.model.todo.patch;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/** TodoPatchRequestModel. */
public record TodoPatchRequestModel(
    @NotBlank @Size(max = 255) String title, @NotNull Boolean completed) {}
