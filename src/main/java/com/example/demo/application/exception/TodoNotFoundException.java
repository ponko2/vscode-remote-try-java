package com.example.demo.application.exception;

/** TodoNotFoundException. */
public class TodoNotFoundException extends RuntimeException {

  private static final long serialVersionUID = 1L;

  public TodoNotFoundException(final String message) {
    super(message);
  }
}
