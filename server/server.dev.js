// Provide custom regenerator runtime and core-js
require('babel-polyfill');

// Node babel source map support
require('source-map-support').install();

// Javascript require hook
require('babel-register')({
  presets: ['es2015', 'react', 'stage-2'],
  plugins: ['add-module-exports'],
});

require('asset-require-hook')({
  name: '/[hash].[ext]',
  extensions: ['jpg', 'png', 'gif', 'webp'],
  limit: 1000,
});

const API_POINT_TEST = 'https://test-api.demo.cn';
const API_POINT_ONLINE = 'https://api.demo.cn';
const DEV_DOMAIN = 'http://localhost';

const fs = require('fs');
const path = require('path');
// express = require('express'),
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const proxy = require('express-http-proxy');
const app = require('./app');
const errorMiddleware = require('./middleware/error');
const webpackConfig = require('../webpack/dev.config');
const router = require('./routes');

const port = process.env.port || 3000;
const compiler = webpack(webpackConfig);

function mkdir(dirpath, dirname) {
  // 判断是否是第一次调用
  if (typeof dirname === 'undefined') {
    if (fs.existsSync(dirpath)) {
      return;
    }
    mkdir(dirpath, path.dirname(dirpath));
  } else {
    // 判断第二个参数是否正常，避免调用时传入错误参数
    if (dirname !== path.dirname(dirpath)) {
      mkdir(dirpath);
      return;
    }
    if (fs.existsSync(dirname)) {
      fs.mkdirSync(dirpath);
    } else {
      mkdir(dirname, path.dirname(dirname));
      fs.mkdirSync(dirpath);
    }
  }
}

// Webpack hook event to write tpl file into `/views/dev` from `/views/tpl` due to server render
compiler.plugin('emit', (compilation, callback) => {
  const { assets } = compilation;
  let file;
  let data;

  Object.keys(assets).forEach((key) => {
    if (key.match(/\.pug$/)) {
      file = path.resolve(__dirname, key);
      data = assets[key].source();
      // node fs.writeFileSync can't open file or directory that isn't exist
      const pathname = file.replace(/(.*)[\\,/](.*\.pug)/, '$1');
      if (!fs.existsSync(pathname)) {
        mkdir(pathname);
      }
      fs.writeFileSync(file, data);
    }
  });
  callback();
});

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
  },
}));

app.use(webpackHotMiddleware(compiler));

app.set('views', path.join(__dirname, '../dist/views/dev'));

app.use('/proxy', proxy(process.env.API_ENV === 'online' ? API_POINT_ONLINE : API_POINT_TEST));

// app.use('/resource', express.static(path.join(__dirname, '../client/resource')))

app.use(router);
// 404 and error handler
app.use(errorMiddleware.fzfHandler);
app.use(errorMiddleware.errorHandler);

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log('\n==> 🌎  Listening on port %s. Open up %s:%s/ in your browser.', port, DEV_DOMAIN, port);
    console.log('==>NODE_ENV=%s CODE_VERSION=%s', process.env.NODE_ENV, process.env.CODE_VERSION);
  }
});
