/*
 * @Created Date: Tuesday April 3rd 2018
 * @Author: Burning
 * ------------------------------
 * @Last Modified by:: Burning
 * @Last Modified time: Tuesday, 3rd April 2018 6:58:02 pm
 * ------------------------------
 * Copyright (c) XFE
 */

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const clientCommonConfig = require('./client.common.config');

function getExternals() {
  return fs
    .readdirSync(path.resolve(__dirname, '../node_modules'))
    .filter(filename => !filename.includes('.bin'))
    .reduce((externals, filename) => {
      /* eslint-disable no-param-reassign */
      externals[filename] = `commonjs ${filename}`;

      return externals;
    }, {});
}

const clientConfig = {
  context: path.resolve(__dirname, '..'),
  entry: {
    bundle: './src/index.web.js'
    // vendor: ['react', 'react-dom', 'redux', 'react-redux', 'axios']
  },
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/chunk.[name].[chunkhash:8].js',
    publicPath: '/v2/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer]
            }
          }
        ]
      }, {
        test: /\.less$/,
        exclude: /global\.less/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              importLoaders: 2,
              localIdentName: '[hash:base64:4]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer]
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      }, {
        test: /\.less$/,
        include: /global\.less/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer]
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      }, {
        test: /\.(jpg|png|gif|webp)$/,
        loader: 'url-loader?limit=1000&name=img/[name].[ext]'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.less'],
    modules: ['node_modules'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: [
    //     'vendor', 'runtime'
    //   ],
    //   filename: 'js/[name].[chunkhash:8].js',
    //   minChunks: Infinity
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => module.resource && /(node_modules)/.test(module.resource)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'chunk-vendor',
      children: true,
      minChunks: (module, count) => count >= 2
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false, drop_console: true },
      comments: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.CODE_VERSION': JSON.stringify(process.env.CODE_VERSION)
    }),
    ...clientCommonConfig.getHtmlPlugins()
  ]
};

const serverConfig = {
  context: path.resolve(__dirname, '..'),
  entry: { server: './server/server.prod' },
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: '[name].js',
    libraryTarget: 'commonjs',
    chunkFilename: 'chunk.[name].js',
    publicPath: '/'
  },
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [
            'es2015', 'react', 'stage-0'
          ],
          plugins: ['add-module-exports', 'transform-decorators-legacy'],
          cacheDirectory: true
        }
      }, {
        test: /\.(jpg|png|gif|webp)$/,
        loader: 'url-loader?limit=1000&name=img/[name].[ext]'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  externals: getExternals(),
  resolve: {
    extensions: ['.js', '.json'],
    modules: ['node_modules']
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: false
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      comments: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.PLATFORM': JSON.stringify(process.env.PLATFORM)
    })
  ]
};

if (process.env.ANALYZER) {
  clientConfig.plugins.push(new BundleAnalyzer());
}

module.exports = [clientConfig, serverConfig];
