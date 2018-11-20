// import React from 'react';

import routerConfig from './route.config/index';
import AppLogin from './common/appLogin';

if (typeof require.ensure !== 'function') {
  require.ensure = (dependencies, callback) => {
    callback(require);
  };
}

const routes = {
  path: '/',
  component: require('./layouts/Root'),
  indexRoute: {
    onEnter: (nextState, replace) => {
      replace('/user/login');
    },
  },
  childRoutes: [],
};

routerConfig.forEach((routerItem) => {
  if (routerItem.children && routerItem.children.length > 0) {
    routes.childRoutes.push({
      path: routerItem.path,
      component: routerItem.layout,
      childRoutes: routerItem.children.map(x => ({
        path: x.path,
        onEnter: !x.disableCheckLogin ? AppLogin.checkStoreLoginStatus() : null,
        component: x.component,
      })),
    });
  }
});

export default routes;
