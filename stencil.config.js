const postcss = require("@stencil/postcss");
const autoprefixer = require("autoprefixer");

exports.config = {
  namespace: "ptx-image-comparison",
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
    },
    {
      type: "www"
    }
  ]
};

exports.devServer = {
  root: "www",
  watchGlob: "**/**"
};
