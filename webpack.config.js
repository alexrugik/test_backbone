const path = require('path');
const webpack = require('webpack');
//const WebpackDevServer = require("webpack-dev-server");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['./app/react/index.js'],
  output: {
    path: path.resolve(__dirname, 'web'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.HotModuleReplacementPlugin({
      multiStep: true
    }),
    new CopyWebpackPlugin([
        {
          context: path.resolve(__dirname, 'app'),
          from: '*.html',
          to: path.resolve(__dirname, 'web')
        }],
      {
        copyUnmodified: true
      }
    ),

  ],
  module: {
    loaders: []
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'web'),
    outputPath: path.resolve(__dirname, 'app'),
    hot: true,
    watch: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    inline: true,
    historyApiFallback: true,
    compress: true,
    headers: { "X-Custom-Header": "yes" },
    stats: 'errors-only',
    port: 7777,
  }
};