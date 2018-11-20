/*
 * @Created Date: Monday April 2nd 2018
 * @Author: Burning
 * ------------------------------
 * @Last Modified by:: Burning
 * @Last Modified time: Tuesday, 3rd April 2018 6:57:57 pm
 * ------------------------------
 * Copyright (c) XFE
 */

const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const clientCommonConfig = require('./client.common.config');

module.exports = {
  devtool: 'eval-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    bundle: [
      './src/index.web.js', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
    ],
  },
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: '[name].js',
    chunkFilename: 'chunk.[name].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      /* {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        query: {
          configFile: './.eslintrc.js'
        },
        exclude: /node_modules/
      }, */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0', 'react-hmre'],
          plugins: [
            'add-module-exports',
            'transform-runtime',
            'transform-decorators-legacy'
          ],
          cacheDirectory: true
        }
      }, {
        test: /\.css$/,
        loaders: [
          'style-loader', 'css-loader'
        ]
      }, {
        test: /\.less$/,
        exclude: /global\.less/,
        loaders: [
          'style-loader',
          'css-loader?modules&camelCase&importLoaders=1&localIdentName=[local]__[hash:base64:8]',
          'less-loader'
        ]
      }, {
        test: /\.less$/,
        include: /global\.less/,
        loaders: [
          'style-loader', 'css-loader?importLoaders=1', 'less-loader'
        ]
      }, {
        test: /\.(jpg|png|gif|webp)$/,
        loader: 'url-loader?limit=1000'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.web.js', '.less'],
    modules: ['node_modules'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => module.resource && /(node_modules)/.test(module.resource)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'chunk-vendor',
      children: true,
      minChunks: (module, count) => count >= 2
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.API_ENV': JSON.stringify(process.env.API_ENV),
      'process.env.port': JSON.stringify(process.env.port)
    }),
    ...clientCommonConfig.getHtmlPlugins(),
    new ProgressBarPlugin({
      summary: false
    })
  ]
};
