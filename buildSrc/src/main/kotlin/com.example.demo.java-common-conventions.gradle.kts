/*
 * This file was generated by the Gradle 'init' task.
 */

import net.ltgt.gradle.errorprone.errorprone

fun library(alias: String) = extensions.getByType<VersionCatalogsExtension>().named("libs").findLibrary(alias).get()

plugins {
  // Apply the java Plugin to add support for Java.
  java

  checkstyle

  id("com.diffplug.spotless")
  id("com.github.spotbugs")
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
  annotationProcessor(library("immutables"))
  compileOnly(library("immutables-annotations"))
  compileOnly(library("jcip-annotations"))
  compileOnly(library("spotbugs-annotations"))
  testCompileOnly(library("jcip-annotations"))
  testCompileOnly(library("spotbugs-annotations"))
  testImplementation("org.springframework.boot:spring-boot-starter-test")
  testImplementation(library("hamcrest-optional"))
  errorprone(library("errorprone"))
  errorprone(library("nullaway"))
  spotbugsSlf4j(library("slf4j-simple"))
}

checkstyle {
  configProperties = mapOf(
    "org.checkstyle.google.suppressionfilter.config" to rootProject.file("config/checkstyle/suppressions.xml"),
    "org.checkstyle.google.suppressionxpathfilter.config" to rootProject.file("config/checkstyle/suppressions-xpath.xml"),
  )
  maxWarnings = 0
  toolVersion = "9.3"
}

spotbugs {
  excludeFilter.set(rootProject.file("config/spotbugs/exclude.xml"))
}

spotless {
  if (System.getenv("CI") != "true") {
    ratchetFrom("origin/main")
  }
  java {
    targetExclude("**/build/generated/**")
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
    disableWarningsInGeneratedCode.set(true)
    excludedPaths.set(".*/build/generated/.*")
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
    disable("NullAway")
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
