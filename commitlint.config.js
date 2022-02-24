module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-max-length": [2, "always", 50],
    "subject-case": [0],
  },
  ignores: [
    (commit) =>
      /^Signed-off-by: dependabot\[bot] <support@github\.com>$/m.test(commit),
  ],
};
