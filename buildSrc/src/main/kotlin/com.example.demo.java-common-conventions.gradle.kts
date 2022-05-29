/*
 * This file was generated by the Gradle 'init' task.
 */

import net.ltgt.gradle.errorprone.errorprone

fun library(alias: String) = extensions.getByType<VersionCatalogsExtension>().named("libs").findLibrary(alias).get()

plugins {
  // Apply the java Plugin to add support for Java.
  java

  id("io.spring.dependency-management")
  id("net.ltgt.errorprone")
}

group = "com.example"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_17

configurations {
  compileOnly {
    extendsFrom(configurations.annotationProcessor.get())
  }
}

repositories {
  // Use Maven Central for resolving dependencies.
  mavenCentral()
}

dependencies {
  implementation(platform(library("spring-boot-dependencies")))
  testImplementation("org.springframework.boot:spring-boot-starter-test")
  errorprone(library("errorprone"))
}

tasks.withType<JavaCompile>().configureEach {
  options.errorprone {
    disableWarningsInGeneratedCode.set(true)
    excludedPaths.set(".*/build/generated/.*")
  }
}

tasks.named<JavaCompile>("compileTestJava").configure {
  options.errorprone {
    disable("UnicodeInCode")
  }
}

tasks.named<JavaCompile>("compileTestJava").configure {
  options.errorprone {
    disable("UnicodeInCode")
  }
}

tasks.withType<Test>().configureEach {
  // Use JUnit Platform for unit tests.
  useJUnitPlatform()
}

sourceSets.main {
  java.srcDirs("src/main/java", "build/generated/sources/annotationProcessor/java/main")
}
