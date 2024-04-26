package com.example.demo.application.result;

import java.util.Collection;
import org.jspecify.annotations.NonNull;

/** TodoGetAllResult. */
public record TodoGetAllResult(Collection<@NonNull TodoResult> todos) {}
