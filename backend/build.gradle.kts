import net.ltgt.gradle.errorprone.errorprone

plugins {
  java
  checkstyle
  alias(libs.plugins.boot)
  alias(libs.plugins.dependency)
  alias(libs.plugins.errorprone)
  alias(libs.plugins.spotbugs)
  alias(libs.plugins.spotless)
}

group = "com.example"

version = "0.0.1-SNAPSHOT"

java { sourceCompatibility = JavaVersion.VERSION_17 }

configurations { compileOnly { extendsFrom(configurations.annotationProcessor.get()) } }

repositories { mavenCentral() }

dependencies {
  implementation(libs.mybatis)
  implementation(libs.springdoc)
  implementation(libs.uuid)
  implementation("org.springframework.boot:spring-boot-starter-actuator")
  implementation("org.springframework.boot:spring-boot-starter-validation")
  implementation("org.springframework.boot:spring-boot-starter-web")
  implementation("org.flywaydb:flyway-core")
  implementation("org.flywaydb:flyway-mysql")
  developmentOnly("org.springframework.boot:spring-boot-devtools")
  compileOnly(libs.jcip)
  compileOnly(libs.jspecify)
  compileOnly(libs.spotbugs)
  runtimeOnly("com.mysql:mysql-connector-j")
  annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
  testImplementation("org.springframework.boot:spring-boot-starter-test")
  testImplementation(libs.archunit)
  testImplementation(libs.mybatis.test)
  errorprone(libs.errorprone)
  errorprone(libs.nullaway)
  spotbugsSlf4j(libs.slf4j)
}

checkstyle {
  configProperties =
      mapOf(
          "org.checkstyle.google.suppressionfilter.config" to
              rootProject.file("config/checkstyle/suppressions.xml"),
          "org.checkstyle.google.suppressionxpathfilter.config" to
              rootProject.file("config/checkstyle/suppressions-xpath.xml"),
      )
  maxWarnings = 0
  toolVersion = libs.versions.checkstyle.get()
}

spotbugs { excludeFilter.set(rootProject.file("config/spotbugs/exclude.xml")) }

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
  kotlinGradle { ktfmt() }
}

tasks.withType<JavaCompile> {
  options.encoding = "UTF-8"
  options.isFork = true
  options.errorprone {
    disableWarningsInGeneratedCode.set(true)
    excludedPaths.set(".*/build/generated/.*")
    option("NullAway:AnnotatedPackages", "com.example")
  }
}

tasks.compileJava { options.errorprone { error("NullAway") } }

tasks.compileTestJava {
  options.errorprone {
    disable("NullAway")
    disable("UnicodeInCode")
  }
}

tasks.withType<Test> { useJUnitPlatform() }

sourceSets.main {
  java.srcDirs("src/main/java", "build/generated/sources/annotationProcessor/java/main")
}

tasks.register<Copy>("processFrontendResources") {
  group = "Frontend"
  description = "Process frontend resources"
  dependsOn(project(":frontend").tasks.named("assembleFrontend"))
  from(project(":frontend").layout.projectDirectory.dir("dist"))
  into(layout.buildDirectory.dir("resources/main/static"))
}

tasks.processResources { dependsOn(tasks.named("processFrontendResources")) }
