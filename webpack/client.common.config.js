/*
* @Created Date: 2017-12-14 17:00:20
* @Author: Burning
* ------------------------------
 * @Last Modified by: Burning
 * @Last Modified time: 2018-11-20 10:51:56
* ------------------------------
* Copyright (c) XFE
*/

const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// if needed, add more
const ignoreFile = ['.DS_Store', '.idea', '.vscode', '.git'];
const rootPath = path.resolve(__dirname, '../');
const viewsDir = `${rootPath}/public/views`;

const isDev = process.env.NODE_ENV === 'development';

function getViewsFilesName(root) {
  function getAllFiles(subRoot) {
    const files = fs.readdirSync(subRoot);
    let res = [];
    files.forEach((fileName) => {
      const pathname = `${subRoot}/${fileName}`;
      const stat = fs.lstatSync(pathname);

      if (!stat.isDirectory()) {
        if (ignoreFile.indexOf(fileName) === -1) {
          res.push({
            chunkName: pathname.replace(/(.*)\/(\w+)\/(.*)/, '$2'),
            packedFilename: pathname.replace(/(.*\/views)\/(.*)/, '$2'),
            pathname: pathname.replace(rootPath, '.')
          });
        }
      } else {
        res = res.concat(getAllFiles(pathname));
      }
    });
    return res;
  }
  return getAllFiles(root);
}

function getHtmlPlugins() {
  const fileNamesMap = getViewsFilesName(viewsDir);
  return fileNamesMap.map((ele) => {
    const filename = isDev
      ? `../dist/views/dev/${ele.packedFilename}`
      : `${rootPath}/dist/views/prod/${ele.packedFilename}`;
    return new HtmlWebpackPlugin({
      filename,
      template: ele.pathname,
      // chunks: ['runtime', 'vendor', 'bundle'],
      // inlineCss: getInlineAssets(ele.chunkName, 'css'),
      // inlineJs: getInlineAssets(ele.chunkName, 'js'),
      envScript: `script(type= "text/javascript").
    window.nodeEnv="${process.env.NODE_ENV}";
    window.codeVersion="${process.env.CODE_VERSION}";`,
      inject: false
    });
  });
}

const clientCommonConfig = {
  // getPackEntry,
  getHtmlPlugins
};

module.exports = clientCommonConfig;
