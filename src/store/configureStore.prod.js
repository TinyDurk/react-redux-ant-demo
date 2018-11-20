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
import api from '../middleware/api';
import dataCache from '../middleware/dataCache';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, api, dataCache),
  );
}
