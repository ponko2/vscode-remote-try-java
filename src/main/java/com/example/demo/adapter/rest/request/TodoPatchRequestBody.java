package com.example.demo.adapter.rest.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/** TodoPatchRequestBody. */
public record TodoPatchRequestBody(
    @NotBlank @Size(max = 255) String title, @NotNull Boolean completed) {}
