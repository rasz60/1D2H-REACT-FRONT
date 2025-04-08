const path = require("path");
const { override, addWebpackAlias } = require("customize-cra");

module.exports = override(
  addWebpackAlias({
    "@src": path.resolve(__dirname, "src"),
    "@style": path.resolve(__dirname, "src/assets/style"),
    "@js": path.resolve(__dirname, "src/assets/js"),
    "@compo": path.resolve(__dirname, "src/assets/components"),
    "@sections": path.resolve(__dirname, "src/assets/sections"),
    "@context": path.resolve(__dirname, "src/context"),
    "@utils": path.resolve(__dirname, "src/utils"),
  })
);
