package com.example.demo.domain.factory;

import com.example.demo.domain.model.Todo;
import com.example.demo.domain.model.TodoTitle;

/** TodoFactory. */
public interface TodoFactory {

  public Todo create(TodoTitle title);
}
