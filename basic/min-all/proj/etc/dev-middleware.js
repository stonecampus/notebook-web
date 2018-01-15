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
      port: devConfig.port + 1,
      proxy: 'localhost:' + devConfig.port,
      ui: { port: devConfig.port + 2 },
      // online: false,
      // open: false,
      // notify: false,
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
