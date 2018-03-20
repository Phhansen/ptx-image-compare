exports.config = {
  namespace: "fitui",
  outputTargets: [
    {
      type: "dist",
      serviceWorker: false,
    },
  ]
};

exports.devServer = {
  root: "www",
  watchGlob: "**/**"
};
