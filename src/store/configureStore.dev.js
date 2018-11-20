/**
 * Created Date: Wednesday December 6th 2017
 * @Author: Burning
 * ------------------------------
 * Last Modified: Wednesday December 6th 2017 10:13 pm
 * Modified By: Burning
 * ------------------------------
 * Copyright (c) XFE
 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import api from '../middleware/api';
import dataCache from '../middleware/dataCache';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const logger = createLogger({
    duration: true,
    diff: false,
  });

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, api, dataCache, logger)
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}
