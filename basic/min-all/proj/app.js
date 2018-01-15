'use strict';

const path = require('path');
const join = path.join;
const envFile = process.env.DOT_ENV ?
  path.resolve(__dirname, process.env.DOT_ENV) : join(__dirname, '.env')
require('dotenv').config({ path: envFile });

const favicon = require('express-favicon');
const express = require('express');
const nunjucks = require('nunjucks');

const env = process.env;
const config = require('./src/config');

const app = express();

const cache = {};

app.set('port', Number(env.PORT) || 3000);

var njEnv = nunjucks.configure(join(__dirname, 'src', 'views'), {
  autoescape: true,
  express: app,
  watch: config.isDev
});
njEnv.addGlobal('JSON', JSON);
app.set('view engine', 'html');

app.use(favicon(join(config.rootDir, 'static', 'favicon.ico')));

if (config.isProd) {
  app.use(express.static(join(config.rootDir, 'static'), {
    etag: true,
    maxAge: config.maxAge
  }));
} else {
  if (config.isDev) require('./etc/dev-middleware')(app);

  app.use(express.static(join(config.rootDir, 'static')));
  app.use('/assets', express.static(join(config.rootDir, 'dist', 'vendor')));
  app.use('/assets', express.static(join(config.rootDir, 'dist', 'assets')));
}

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/plain-text', function (req, res) {
  res.render('plain-text');
});

app.get('/get', function (req, res) {
  res.send(cache[req.query.key]);
});

app.post('/set', function (req, res) {
  var query = req.query;
  Object.keys(query).forEach(function (key) {
    cache[key] = query[key];
  });
  res.status(200).end();
});

if (!config.isTest) {
  var port = app.get('port');
  app.listen(port, function () {
    console.log(`We are listening on port ${port}`);
  });
}

module.exports = app;
