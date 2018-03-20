exports.config = {
  namespace: 'fitui',
  generateDistribution: true,
  generateWWW: false,
  serviceWorker: false,
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
