export default {
  "*.{css,js,json,jsx,mjs,scss,ts,tsx,yml}": "prettier --write",
  "*.{gradle.kts,java}": () => "./gradlew spotlessApply",
};
