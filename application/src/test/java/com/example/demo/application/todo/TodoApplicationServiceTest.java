package com.example.demo.application.todo;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;

import com.example.demo.application.todo.common.TodoData;
import com.example.demo.application.todo.get.TodoGetCommand;
import com.example.demo.application.todo.get.TodoGetResult;
import com.example.demo.domain.model.todo.Todo;
import com.example.demo.domain.model.todo.TodoId;
import com.example.demo.domain.model.todo.TodoRepository;
import com.example.demo.domain.model.todo.TodoTitle;
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
    var id = new TodoId("01FYH62GKVNWP6SJFJ8FMW89TW");
    var todo = new Todo(id, new TodoTitle("foo"), false);
    doReturn(Optional.of(todo)).when(todoRepository).find(any(TodoId.class));

    var actual = todoApplicationService.get(new TodoGetCommand(id.value()));
    var expected = new TodoGetResult(new TodoData(todo));

    assertThat(actual, is(expected));
  }
}
