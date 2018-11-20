/*
 * @Created Date: Tuesday April 3rd 2018
 * @Author: Burning
 * ------------------------------
 * @Last Modified by:: Burning
 * @Last Modified time: Tuesday, 3rd April 2018 6:59:28 pm
 * ------------------------------
 * Copyright (c) XFE
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import Immutable from 'seamless-immutable';
import * as ActionTypes from '../const/ActionTypes';

const AUTH_INIT_STATE = {
  user: {
    feedback_msg: {},
  },
  status: '',
};

const auth = (state = Immutable(AUTH_INIT_STATE), action) => {
  switch (action.type) {
    case ActionTypes.LOG_OUT:
      return state.replace(AUTH_INIT_STATE);
    case `${ActionTypes.APP_LOGIN}_REQ`:
      return state.merge({
        status: 'logining',
      });
    case ActionTypes.LOCAL_APP_LOGIN:
      return state.merge({
        user: action.user,
        status: 'success',
      });
    case `${ActionTypes.APP_LOGIN}_SUC`:
      return state.merge({
        user: action.response.data,
        status: 'success',
      });
    case `${ActionTypes.APP_LOGIN}_FAI`:
      return state.merge({
        status: 'error',
      });
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  routing: routerReducer,
  auth
});

export default rootReducer;
