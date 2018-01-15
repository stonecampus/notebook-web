'use strict';

const path = require('path');
const sclib = require('sclib/node');

const env = process.env;

var config = require('sclib/lib/config')(env);
config = config.extend({
  port: config.num(env.PORT, 9000),
  maxAge: config.num(env.MAXAGE, 31557600000 / 24), // one 24th of a year
  rootDir: path.join(__dirname, '..', '..')
});

config.has('env', 'missing env');
config.hasNum('port', 'missing port');
config.assert(sclib.dirExists(config.rootDir), 'rootDir not exists');

module.exports = config;
