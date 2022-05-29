/*
 * This file was generated by the Gradle 'init' task.
 */

plugins { id("com.example.demo.java-application-conventions") }

dependencies {
  implementation("org.springframework.boot:spring-boot-starter-validation")
  implementation("org.springframework.boot:spring-boot-starter-web")
  implementation(project(":application"))
  developmentOnly("org.springframework.boot:spring-boot-devtools")
  annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
}

tasks.register<Copy>("processFrontendResources") {
  group = "Frontend"
  description = "Process frontend resources"
  dependsOn(project(":frontend").tasks.named("assembleFrontend"))
  from(file("${project(":frontend").projectDir}/dist"))
  into(file("${project.buildDir}/resources/main/public"))
}

tasks.named<ProcessResources>("processResources").configure {
  dependsOn(tasks.named("processFrontendResources"))
}
