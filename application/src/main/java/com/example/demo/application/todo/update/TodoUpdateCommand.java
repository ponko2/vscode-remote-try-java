package com.example.demo.application.todo.update;

/** TodoUpdateCommand. */
public record TodoUpdateCommand(String id, String title, boolean completed) {}
