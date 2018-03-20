exports.config = {
  namespace: 'nixui',
  generateDistribution: true,
  serviceWorker: false
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
