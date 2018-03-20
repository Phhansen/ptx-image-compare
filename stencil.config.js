const postcss = require("@stencil/postcss");
const autoprefixer = require("autoprefixer");

exports.config = {
  namespace: "fit-image-compare",
  globalStyle: "src/global/variables.css",
  plugins: [
    postcss({
      plugins: [autoprefixer()]
    })
  ],
  outputTargets: [
    {
      type: "dist",
      serviceWorker: false,
    }
  ]
};

exports.devServer = {
  root: "www",
  watchGlob: "**/**"
};
