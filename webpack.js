const SvgStorePlugin = require("external-svg-sprite-loader");

module.exports = {
  plugins: [new SvgStorePlugin({})],
  loaders: [
    {
      loader: SvgStorePlugin.loader,
      test: /\.svg$/,
    },
  ],
  babelPlugin: "babel-plugin-styled-components",
};
