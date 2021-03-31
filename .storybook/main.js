const path = require("path");

const webpack = require("../webpack");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-controls",
    { name: "@storybook/preset-scss" },
  ],
  webpackFinal: (options) => {
    const babelRule = options.module.rules[0];
    babelRule.exclude = /(node_modules[\/\\](?!(@worksolutions))).*/;
    options.module.rules[9].exclude = /src[\/\\](.*)/;
    options.module.rules = [...webpack.loaders, ...options.module.rules];
    options.plugins = [...webpack.plugins, ...options.plugins];
    options.resolve.modules = [...(options.resolve.modules || []), path.resolve(__dirname, "../src")];
    return options;
  },
  babel: async (options) => {
    const babelConfig = require("../babel.config.json");
    const styledComponentsIndex = babelConfig.plugins.indexOf("babel-plugin-styled-components");
    if (styledComponentsIndex !== -1) {
      babelConfig.plugins[styledComponentsIndex] = [
        "babel-plugin-styled-components",
        {
          minify: false,
          transpileTemplateLiterals: false,
          displayName: true,
          fileName: true,
        },
      ];
    }
    Object.assign(options, babelConfig);
    return options;
  },
};
