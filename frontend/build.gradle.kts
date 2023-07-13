import org.siouan.frontendgradleplugin.infrastructure.gradle.AssembleTask
import org.siouan.frontendgradleplugin.infrastructure.gradle.InstallFrontendTask

plugins {
  alias(libs.plugins.frontend)
}

frontend {
  nodeVersion.set("18.16.1")
  packageJsonDirectory.set(rootProject.projectDir)
  assembleScript.set("-w frontend run build")
  cleanScript.set("-w frontend run clean")
  installScript.set("ci")
}

tasks.named<InstallFrontendTask>("installFrontend").configure {
  inputs.files(
    "package.json",
    "${rootProject.projectDir}/package.json",
    "${rootProject.projectDir}/package-lock.json"
  )
  outputs.dir("${rootProject.projectDir}/node_modules")
}

tasks.named<AssembleTask>("assembleFrontend").configure {
  inputs.files(
    "index.html",
    "package.json",
    "vite.config.ts",
    "${rootProject.projectDir}/package.json",
    "${rootProject.projectDir}/package-lock.json"
  )
  inputs.dir("src")
  outputs.dir("dist")
}
