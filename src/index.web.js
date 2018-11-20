/*
 * @Created Date: Monday April 2nd 2018
 * @Author: Burning
 * ------------------------------
 * @Last Modified by:: Burning
 * @Last Modified time: Tuesday, 3rd April 2018 6:57:46 pm
 * ------------------------------
 * Copyright (c) XFE
 */

import React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { LocaleProvider } from 'antd';
// eslint-disable-next-line camelcase
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import { Provider } from 'react-redux';
import Immutable from 'seamless-immutable';
import routes from './routes';
import configureStore from './store/configureStore';
import AppLogin from './common/appLogin';
import { readStorageState } from './common/stateCahce';
import './css/global.css';
import './css/global.less';

// import 'antd/dist/antd.min.css';

const store = configureStore(Immutable(readStorageState()));
const history = syncHistoryWithStore(hashHistory, store);

AppLogin.init(store, history);

history.listen((ev) => {
  const path = ev.pathname;
  console.log(`%cpath: ${path}`, 'color:#03A9F4;font-weight: bold');
});

match({ routes, history: hashHistory }, (error, redirectLocation, renderProps) => {
  let Root;
  if (renderProps) {
    Root = <Router {...renderProps} />;
  } else {
    Root = <Router history={history} routes={routes} />;
    if (window.location.hash !== '#/') {
      history.replace('/exception/404');
    }
  }

  render(
    // eslint-disable-next-line camelcase
    <LocaleProvider locale={zh_CN}>
      <Provider store={store}>
        {Root}
      </Provider>
    </LocaleProvider>,
    document.getElementById('app-root'),
  );
});
