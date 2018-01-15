
const join = require('path').join;

const config = require('../src/config');

const projectRoot = config.rootDir;

module.exports = config.extend({
  projectRoot: projectRoot,
  distribution: join(projectRoot, 'dist'),
  // Webpack
  webpackSource: join(projectRoot, 'client'),
  webpackDestination: join(projectRoot, 'dist', 'assets'),
  vendorDestination: join(projectRoot, 'dist', 'vendor'),
  webpackPublicPath: '/assets/'
});
