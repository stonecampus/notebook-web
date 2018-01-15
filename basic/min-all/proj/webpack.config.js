
const join = require('path').join;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

// this includes src/config/index.js
const devConfig = require('./etc/dev-config');

module.exports = (env = {}) => {
  const isProd = devConfig.isProd;
  const isDev = devConfig.isDev; 

  return {
    entry: {
      immediate: join(devConfig.webpackSource, 'js', 'immediate.js'),
      app: join(devConfig.webpackSource, 'js', 'app.js')
    },
    output: {
      path: devConfig.webpackDestination,
      publicPath: devConfig.webpackPublicPath,
      filename: '[name].bundle.js'
    },
    plugins: [
      new ExtractTextPlugin('[name].css'),
      // new ExtractTextPlugin({
      //   filename: 'site.css'
      //   allChunks: true
      // }),
      new webpack.NoEmitOnErrorsPlugin(),

      isDev && new webpack.LoaderOptionsPlugin({ debug: true }),
      isDev && new webpack.HotModuleReplacementPlugin(),

      isProd && new webpack.LoaderOptionsPlugin({ minimize: true }),
      isProd && new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      isProd && new webpack.optimize.AggressiveMergingPlugin(),
      isProd && new webpack.optimize.UglifyJsPlugin(),

      env.ana && new BundleAnalyzerPlugin()
    ].filter((x) => x),

    module: {
      rules: [{
        test: /\.css$/,
        use: ExtractTextPlugin.extract([ 'css-loader' ])
      }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract([ 'css-loader', 'less-loader' ]),
      }, {
        test: /\.(png|jpg|gif|svg)$/,
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
