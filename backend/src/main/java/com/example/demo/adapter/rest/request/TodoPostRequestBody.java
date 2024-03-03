package com.example.demo.adapter.rest.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/** TodoPostRequestBody. */
public record TodoPostRequestBody(@NotBlank @Size(max = 255) String title) {}
