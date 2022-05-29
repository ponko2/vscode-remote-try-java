package com.example.demo.application.todo;

/** TodoNotFoundException. */
public class TodoNotFoundException extends RuntimeException {
  public TodoNotFoundException(String message) {
    super(message);
  }
}
