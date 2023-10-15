package com.example.demo.infrastructure.persistence.todo;

import com.example.demo.domain.model.todo.Todo;
import com.example.demo.domain.model.todo.TodoFactory;
import com.example.demo.domain.model.todo.TodoId;
import com.example.demo.domain.model.todo.TodoTitle;
import com.fasterxml.uuid.Generators;
import java.util.UUID;
import org.springframework.stereotype.Component;

/** TodoFactoryImpl. */
@Component
public class TodoFactoryImpl implements TodoFactory {

  @Override
  public Todo create(final TodoTitle title) {
    final UUID uuid = Generators.timeBasedEpochGenerator().generate();
    return new Todo(new TodoId(uuid.toString()), title, false);
  }
}
