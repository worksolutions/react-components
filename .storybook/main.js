const webpack = require("../webpack");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", { name: "@storybook/preset-scss" }],
  webpackFinal: (options) => {
    const babelRule = options.module.rules[0];
    babelRule.exclude = /(node_modules[\/\\](?!(@worksolutions))).*/;
    options.module.rules[9].exclude = /src[\/\\](.*)/;
    options.module.rules = [...webpack.loaders, ...options.module.rules];
    options.plugins = [...webpack.plugins, ...options.plugins];
    return options;
  },
  babel: async (options) => {
    options.plugins.push([webpack.babelPlugin, { displayName: true }]);
    return options;
  },
};