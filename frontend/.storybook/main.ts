import { dirname, join } from "path";
import type { StorybookConfig } from "@storybook/react-vite";

const getAbsolutePath = (packageName: string): any =>
  dirname(require.resolve(join(packageName, "package.json")));

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-links"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};

export default config;
