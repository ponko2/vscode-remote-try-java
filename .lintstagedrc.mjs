export default {
  "*": "secretlint",
  "*.{css,json,scss,yml}": "prettier --write",
  "*.{js,jsx,mjs,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{gradle.kts,java}": () => "./gradlew spotlessApply",
};
