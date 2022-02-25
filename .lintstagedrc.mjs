export default {
  "*": "secretlint",
  "*.{css,js,json,mjs}": "prettier --write",
  "*.java": () => "./gradlew spotlessApply",
};
