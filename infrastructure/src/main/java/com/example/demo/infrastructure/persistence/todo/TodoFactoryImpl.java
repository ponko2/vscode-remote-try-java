package com.example.demo.infrastructure.persistence.todo;

import com.example.demo.domain.model.todo.Todo;
import com.example.demo.domain.model.todo.TodoFactory;
import com.example.demo.domain.model.todo.TodoId;
import com.example.demo.domain.model.todo.TodoTitle;
import de.huxhorn.sulky.ulid.ULID;
import org.springframework.stereotype.Component;

/** TodoFactoryImpl. */
@Component
public class TodoFactoryImpl implements TodoFactory {
  private static final ULID ulid = new ULID();

  @Override
  public Todo create(final TodoTitle title) {
    return new Todo(new TodoId(ulid.nextULID()), title, false);
  }
}
