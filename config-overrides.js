const { override, fixBabelImports, addWebpackAlias, addDecoratorsLegacy } = require("customize-cra");
const path = require('path');

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd-mobile",
    libraryDirectory: "es",
    style: "css"
  }),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
    'track': path.resolve(__dirname, 'src/components/Track'),
  }),
  addDecoratorsLegacy(),
);
