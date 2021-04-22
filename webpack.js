const SvgStorePlugin = require("external-svg-sprite-loader");

module.exports = {
  plugins: [new SvgStorePlugin({})],
  loaders: [
    {
      loader: SvgStorePlugin.loader,
      test: /\.svg$/,
    },
  ],
  getStyledComponentsBabelPlugin: (env) =>
    env === "development"
      ? [
          "babel-plugin-styled-components",
          {
            minify: false,
            transpileTemplateLiterals: false,
            displayName: true,
            fileName: true,
          },
        ]
      : "babel-plugin-styled-components",
};
