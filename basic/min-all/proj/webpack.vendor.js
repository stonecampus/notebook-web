
const join = require('path').join;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

const devConfig = require('./etc/dev-config');

process.traceDeprecation = true;

module.exports = (env = {}) => {
  const isProd = devConfig.isProd;
  const isDev = devConfig.isDev;
  const srcDir = devConfig.webpackSource;

  return {
    entry: {
      vendor: join(srcDir, 'js', 'vendor.js'),
    },
    output: {
      path: devConfig.vendorDestination,
      publicPath: devConfig.webpackPublicPath,
      filename: '[name].bundle.js'
    },
    plugins: [
      new ExtractTextPlugin('[name].css')
    ],

    module: {
      rules: [{
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: 'jQuery'
        }, {
          loader: 'expose-loader',
          options: '$'
        }]
      }, {
        test: require.resolve('lodash'),
        use: [{
          loader: 'expose-loader',
          options: '_'
        }]
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract([ 'css-loader' ])
      }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract([ 'css-loader', 'less-loader' ]),
      }, {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }]
    },
    devServer: {
      historyApiFallback: true,
      noInfo: true
    },
    performance: {
      hints: false
    },
    devtool: isProd
      ? 'hidden-source-map'
      : 'cheap-module-eval-source-map'
  };
};

