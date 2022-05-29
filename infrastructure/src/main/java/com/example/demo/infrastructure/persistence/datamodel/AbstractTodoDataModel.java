package com.example.demo.infrastructure.persistence.datamodel;

import org.immutables.value.Value;

/** TodoDataModel. */
@Value.Modifiable
@Value.Style(
    get = {"get*", "is*"},
    typeAbstract = "Abstract*",
    typeModifiable = "*")
public interface AbstractTodoDataModel {
  String getId();

  String getTitle();

  boolean isCompleted();
}
