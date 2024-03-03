/* eslint-env node */

/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  root: true,
  extends: [
    "ponko2",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "prettier",
  ],
  plugins: ["react-refresh"],
  settings: {
    react: {
      version: "detect",
    },
    tailwindcss: {
      config: "frontend/tailwind.config.js",
    },
  },
  rules: {
    // React
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/README.md
    // ----------------------------------------------

    // Enforce consistent usage of destructuring assignment of props, state, and context
    "react/destructuring-assignment": "error",

    // Enforce a specific function type for function components
    "react/function-component-definition": [
      "error",
      {
        namedComponents: ["function-declaration", "function-expression"],
        unnamedComponents: "function-expression",
      },
    ],

    // Ensure destructuring and symmetric naming of useState hook value and setter variables
    "react/hook-use-state": "error",

    // Enforce boolean attributes notation in JSX
    "react/jsx-boolean-value": "error",

    // Disallow unnecessary JSX expressions when literals alone are sufficient or enforce JSX expressions on literals in JSX children or attributes
    "react/jsx-curly-brace-presence": "error",

    // Enforce shorthand or standard form for React fragments
    "react/jsx-fragments": "error",

    // Disallow `.bind()` or arrow functions in JSX props
    "react/jsx-no-bind": [
      "error",
      {
        ignoreDOMComponents: true,
        ignoreRefs: true,
        allowArrowFunctions: true,
        allowFunctions: false,
        allowBind: false,
      },
    ],

    // Disallows JSX context provider values from taking values that will cause needless rerenders
    "react/jsx-no-constructed-context-values": "error",

    // Disallow problematic leaked values from being rendered
    "react/jsx-no-leaked-render": "error",

    // Disallow unnecessary fragments
    "react/jsx-no-useless-fragment": "error",

    // Enforce PascalCase for user-defined JSX components
    "react/jsx-pascal-case": "error",

    // Enforce props alphabetical sorting
    "react/jsx-sort-props": "error",

    // Disallow when this.state is accessed within setState
    "react/no-access-state-in-setstate": "error",

    // Disallow usage of Array index in keys
    "react/no-array-index-key": "error",

    // Disallow usage of dangerous JSX properties
    "react/no-danger": "error",

    // Disallow `this` from being used in stateless functional components
    "react/no-this-in-sfc": "error",

    // Disallow creating unstable components inside components
    "react/no-unstable-nested-components": "error",

    // Enforce stateless components to be written as a pure function
    "react/prefer-stateless-function": "error",

    // Disallow extra closing tags for components without children
    "react/self-closing-comp": "error",

    // React Refresh
    // https://github.com/ArnaudBarre/eslint-plugin-react-refresh/blob/main/README.md
    // ----------------------------------------------
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/stylistic",
        "plugin:import/typescript",
        "prettier",
      ],
      rules: {
        // React
        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/README.md
        // ----------------------------------------------

        // Disallow missing props validation in a React component definition
        "react/prop-types": "off",

        // TypeScript
        // https://typescript-eslint.io/rules/
        // ----------------------------------------------

        // Enforce type definitions to consistently use either `interface` or `type`
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],

        // Disallow unused variables
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          { vars: "all", args: "after-used", ignoreRestSiblings: true },
        ],
      },
    },
    {
      files: ["*.ts", "*.tsx"],
      excludedFiles: ["vite.config.ts", "vitest.setup.ts"],
      extends: [
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
        "prettier",
      ],
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
      rules: {
        // TypeScript
        // https://typescript-eslint.io/rules/
        // ----------------------------------------------

        // Enforce consistent usage of type imports
        "@typescript-eslint/consistent-type-imports": "error",

        // Enforce the use of top-level import type qualifier when an import only has specifiers with inline type qualifiers
        "@typescript-eslint/no-import-type-side-effects": "error",
      },
    },
    {
      files: ["*.test.ts", "*.test.tsx"],
      extends: [
        "plugin:vitest/recommended",
        "plugin:testing-library/react",
        "prettier",
      ],
      rules: {
        // Vitest
        // https://github.com/veritem/eslint-plugin-vitest
        // ----------------------------------------------

        // Disallow alias methods
        "vitest/no-alias-methods": "error",

        // Disallow conditional expects
        "vitest/no-conditional-expect": "error",

        // Disallow disabled tests
        "vitest/no-disabled-tests": "warn",

        // Disallow using a callback in asynchronous tests and hooks
        "vitest/no-done-callback": "error",

        // Disallow focused tests
        "vitest/no-focused-tests": "error",

        // Disallow string interpolation in snapshots
        "vitest/no-interpolation-in-snapshots": "error",

        // Disallow importing from mocks directory
        "vitest/no-mocks-import": "error",

        // Disallow using `expect` outside of `it` or `test` blocks
        "vitest/no-standalone-expect": "error",

        // Disallow using `test` as a prefix
        "vitest/no-test-prefixes": "error",

        // Suggest using toBe()
        "vitest/prefer-to-be": "error",

        // Prefer using toContain()
        "vitest/prefer-to-contain": "error",

        // Suggest using toHaveLength()
        "vitest/prefer-to-have-length": "error",

        // Testing Library
        // https://github.com/testing-library/eslint-plugin-testing-library
        // ----------------------------------------------

        // Disallow the use of cleanup
        // Temporary workaround for https://github.com/vitest-dev/vitest/issues/1430
        "testing-library/no-manual-cleanup": "off",
      },
    },
    {
      files: ["*.stories.ts", "*.stories.tsx"],
      extends: ["plugin:storybook/recommended", "prettier"],
      rules: {
        "no-restricted-exports": "off",
      },
    },
    {
      files: ["*.config.js", "*.config.ts"],
      rules: {
        "no-restricted-exports": "off",
      },
    },
  ],
};
