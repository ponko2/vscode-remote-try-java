package com.example.demo.adapter.persistence.factory.impl;

import com.example.demo.domain.factory.TodoFactory;
import com.example.demo.domain.model.Todo;
import com.example.demo.domain.model.TodoId;
import com.example.demo.domain.model.TodoTitle;
import com.fasterxml.uuid.Generators;
import java.security.SecureRandom;
import java.util.UUID;
import org.springframework.stereotype.Component;

/** TodoFactoryImpl. */
@Component
public class TodoFactoryImpl implements TodoFactory {

  @Override
  public Todo create(final TodoTitle title) {
    final UUID uuid = Generators.timeBasedEpochRandomGenerator(new SecureRandom()).generate();
    return new Todo(new TodoId(uuid.toString()), title, false);
  }
}
