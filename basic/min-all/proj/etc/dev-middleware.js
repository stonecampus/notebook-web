'use strict';

const resolve = require('path').resolve;
const devConfig = require('./dev-config');

module.exports = function (app, env) {
  env = env || process.env;
  const projectRoot = devConfig.projectRoot;

  require('scdev/tooling/express-webpack-browsersync')(app, {
    devConfig: devConfig,
    webpack: require('../webpack.config.js')(env),
    browserSync: {
      port: 9001,
      proxy: 'localhost:' + 9000,
      ui: { port: 9002 },
      open: false,
      files: [
        {
          match: [
            resolve(projectRoot, 'postcss.config.js')
          ]
        }
      ]
    }
  });
};
