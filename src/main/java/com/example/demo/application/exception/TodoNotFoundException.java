package com.example.demo.application.exception;

/** TodoNotFoundException. */
public class TodoNotFoundException extends RuntimeException {

  public TodoNotFoundException(final String message) {
    super(message);
  }
}
