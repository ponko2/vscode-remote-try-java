package com.example.demo.web.model.todo.index;

import com.example.demo.web.model.todo.common.TodoResponseModel;
import java.util.Collection;

/** TodoIndexResponseModel. */
public record TodoIndexResponseModel(Collection<TodoResponseModel> todos) {}
