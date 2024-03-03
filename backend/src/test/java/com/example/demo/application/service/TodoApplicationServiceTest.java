package com.example.demo.application.service;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;

import com.example.demo.application.command.TodoGetCommand;
import com.example.demo.application.result.TodoGetResult;
import com.example.demo.application.result.TodoResult;
import com.example.demo.application.service.impl.TodoApplicationServiceImpl;
import com.example.demo.domain.model.Todo;
import com.example.demo.domain.model.TodoId;
import com.example.demo.domain.model.TodoTitle;
import com.example.demo.domain.repository.TodoRepository;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class TodoApplicationServiceTest {

  @InjectMocks private TodoApplicationServiceImpl todoApplicationService;
  @Mock private TodoRepository todoRepository;

  @Test
  void testGet() {
    final var id = new TodoId("018b3284-099f-7889-921b-63f020991177");
    final var todo = new Todo(id, new TodoTitle("foo"), false);
    doReturn(Optional.of(todo)).when(todoRepository).find(any(TodoId.class));

    final TodoGetResult actual = todoApplicationService.get(new TodoGetCommand(id.value()));
    final TodoGetResult expected = new TodoGetResult(new TodoResult(todo));

    assertThat(actual, is(expected));
  }
}
