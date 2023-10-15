package com.example.demo.application.todo;

/** TodoNotFoundException. */
public class TodoNotFoundException extends RuntimeException {
  public TodoNotFoundException(final String message) {
    super(message);
  }
}
