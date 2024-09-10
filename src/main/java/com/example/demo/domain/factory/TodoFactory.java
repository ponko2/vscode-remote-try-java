package com.example.demo.domain.factory;

import com.example.demo.domain.model.Todo;
import com.example.demo.domain.model.TodoTitle;

/** TodoFactory. */
public interface TodoFactory {

  /** Create. */
  public Todo create(TodoTitle title);
}
