package com.example.demo.application.todo.getall;

import com.example.demo.application.todo.common.TodoData;
import java.util.Collection;

/** TodoGetAllResult. */
public record TodoGetAllResult(Collection<TodoData> todos) {}
