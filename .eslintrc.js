module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "ponko2",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // Import
    // https://github.com/benmosher/eslint-plugin-import/blob/master/README.md
    // ----------------------------------------------

    // Prohibit default exports
    "import/no-default-export": "error",

    // React
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/README.md
    // ----------------------------------------------

    // Prevent missing props validation in a React component definition
    "react/prop-types": "off",

    // TypeScript
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
    // ----------------------------------------------

    // Disallow usage of the any type
    "@typescript-eslint/no-explicit-any": "off",

    // Disallow unused variables
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: true },
    ],

    // Disallow variable declarations from shadowing variables declared in the outer scope
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],

    // Disallow the use of variables before they are defined
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": [
      "error",
      { functions: false, classes: true },
    ],
  },
};
