export default {
  "*.{css,json,scss,yml}": "prettier --write",
  "*.{js,jsx,mjs,ts,tsx}": ["eslint --fix", "prettier --write"],
};
