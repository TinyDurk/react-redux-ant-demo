/*
* @Created Date: 2017-12-20 17:17:35
* @Author: Burning
* ------------------------------
 * @Last Modified by: Burning
 * @Last Modified time: 2018-11-20 11:46:47
* ------------------------------
* Copyright (c) XFE
*/

const configProd = {
  domain: 'https://demo.cn',
  apiDomain: 'https://api.demo.cn',
  publicPath: 'https://static.demo.cn/web'
};

const configDev = {
  domain: 'http://test-demo.cn',
  // apiDomain: 'https://test-api.demo.cn',
  apiDomain: `http://localhost:${process.env.port}/proxy`, // 用本地proxy做代理，不会跨域。需要代理的域名在server/server。dev.js的API_POINT_TEST
  publicPath: 'https://static.demo.cn/web_dev'
};

if (process.env.NODE_ENV === 'production') {
  module.exports = configProd;
} else {
  module.exports = configDev;
}
