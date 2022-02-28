export default {
  "*": "secretlint",
  "*.{css,js,json,mjs,yml}": "prettier --write",
  "*.{gradle.kts,java}": () => "./gradlew spotlessApply",
};
