module.exports = {
  root: true,
  extends: ["ponko2", "prettier"],
  overrides: [
    {
      files: ["commitlint.config.js"],
      rules: {
        "no-restricted-exports": "off",
      },
    },
  ],
};
