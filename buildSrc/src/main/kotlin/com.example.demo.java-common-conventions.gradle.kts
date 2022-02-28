/*
 * This file was generated by the Gradle 'init' task.
 */

import net.ltgt.gradle.errorprone.errorprone

plugins {
  // Apply the java Plugin to add support for Java.
  java

  checkstyle

  id("com.diffplug.spotless")
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

dependencyManagement {
  imports {
    mavenBom("org.springframework.boot:spring-boot-dependencies:2.6.4")
  }
}

dependencies {
  constraints {
    // Define dependency versions as constraints
    implementation("org.apache.commons:commons-text:1.9")
  }

  testImplementation("org.springframework.boot:spring-boot-starter-test")
  compileOnly("com.google.code.findbugs:jsr305:3.0.2")
  compileOnly("org.projectlombok:lombok")
  annotationProcessor("org.projectlombok:lombok")
  errorprone("com.google.errorprone:error_prone_core:2.11.0")
  errorprone("com.uber.nullaway:nullaway:0.9.5")
}

checkstyle {
  configProperties = mapOf(
    "org.checkstyle.google.suppressionfilter.config" to rootProject.file("config/checkstyle/suppressions.xml"),
    "org.checkstyle.google.suppressionxpathfilter.config" to rootProject.file("config/checkstyle/suppressions-xpath.xml"),
  )
  maxWarnings = 0
  toolVersion = "9.3"
}

spotless {
  if (System.getenv("CI") != "true") {
    ratchetFrom("origin/main")
  }
  java {
    importOrder()
    removeUnusedImports()
    googleJavaFormat()
  }
  kotlinGradle {
    ktfmt()
  }
}

tasks.withType<JavaCompile>().configureEach {
  options.errorprone {
    option("NullAway:AnnotatedPackages", "com.example")
  }
}

tasks.named<JavaCompile>("compileJava").configure {
  options.errorprone {
    error("NullAway")
  }
}

tasks.named<JavaCompile>("compileTestJava").configure {
  options.errorprone {
    disable("UnicodeInCode")
  }
}

tasks.named<Test>("test") {
  // Use JUnit Platform for unit tests.
  useJUnitPlatform()
}
