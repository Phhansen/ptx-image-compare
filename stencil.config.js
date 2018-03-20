exports.config = {
  namespace: 'fitui',
  generateDistribution: true,
  generateWWW: false,
  serviceWorker: false,
  globalStyle: "src/global/variables.css"
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
