/*
 * This file was generated by the Gradle 'init' task.
 */

plugins { id("com.example.demo.java-library-conventions") }

dependencies {
  api(project(":domain"))
  implementation("org.flywaydb:flyway-core")
  implementation("org.flywaydb:flyway-mysql")
  implementation(libs.spring.boot.mybatis)
  implementation(libs.sulky.ulid)
  runtimeOnly("mysql:mysql-connector-java")
}
