const SvgStorePlugin = require("external-svg-sprite-loader");

module.exports = {
  plugins: [new SvgStorePlugin({})],
  loaders: [
    {
      loader: SvgStorePlugin.loader,
      test: /\.svg$/,
    },
    //TODO: add raw-loader
  ],
  babelPlugin: "babel-plugin-styled-components",
};
