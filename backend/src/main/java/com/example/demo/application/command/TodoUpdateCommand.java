package com.example.demo.application.command;

/** TodoUpdateCommand. */
public record TodoUpdateCommand(String id, String title, boolean completed) {}
