const postcss = require("@stencil/postcss");
const autoprefixer = require("autoprefixer");

exports.config = {
  namespace: "ptx-image-comparison",
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
