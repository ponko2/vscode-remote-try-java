package com.example.demo;

import static com.tngtech.archunit.library.Architectures.onionArchitecture;

import com.tngtech.archunit.junit.AnalyzeClasses;
import com.tngtech.archunit.junit.ArchTest;
import com.tngtech.archunit.lang.ArchRule;

@AnalyzeClasses(packages = "com.example.demo")
public class ArchitectureTest {

  @ArchTest
  static final ArchRule onion_architecture_is_respected =
      onionArchitecture()
          .domainModels("com.example.demo.domain.model..")
          .domainServices(
              "com.example.demo.domain.factory..",
              "com.example.demo.domain.repository..",
              "com.example.demo.domain.service..")
          .applicationServices("com.example.demo.application..")
          .adapter("persistence", "com.example.demo.adapter.persistence..")
          .adapter("rest", "com.example.demo.adapter.rest..");
}
