plugins {
  alias(libs.plugins.frontend)
}

frontend {
  nodeDistributionProvided.set(true)
  packageJsonDirectory.set(rootProject.projectDir)
  assembleScript.set("-w frontend run build")
  installScript.set("ci")
}
