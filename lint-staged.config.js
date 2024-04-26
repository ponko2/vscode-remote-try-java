export default {
  "*.{css,js,json,jsx,mjs,scss,ts,tsx,yml}": "prettier --write",
  "*.java": (filenames) =>
    `./mvnw spotless:apply -DspotlessFiles=${filenames.join(",")}`,
};
