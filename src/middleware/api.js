/*
 * @Created Date: Tuesday April 3rd 2018
 * @Author: Burning
 * ------------------------------
 * @Last Modified by:: Burning
 * @Last Modified time: Sunday, 8th April 2018 7:36:36 pm
 * ------------------------------
 * Copyright (c) XFE
 */

import axios from 'axios';
import { notification } from 'antd';
import config from '../config/env';

const isClient = typeof window !== 'undefined';
const API_ROOT = config.apiDomain;

const log4Api = (url, exData) => {
  if (isClient) {
    console.log('logger: ', url + exData);
  }
};

export function callServerApi(endpoint, params, normalizeFunc, noErrNotify) {
  const data = {
    ...params,
    extraFixedData: 'add your extra Fixed data here'
  };
  const url = isClient && endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint;
  const axiosMethod = 'POST';
  const bt = Date.now();

  return new Promise((resolve, reject) => (
    axios({
      method: axiosMethod,
      url,
      data: JSON.stringify(data),
      timeout: 10000,
    })
      .then(
        (response) => {
          if (response.data.ret !== 1) {
            log4Api(url, {
              bt, tt: Date.now() - bt, ok: 0, ret: response.data.ret,
            });

            if (!noErrNotify) {
              notification.error({
                message: response.data.msg,
                description: response.data.detail
              });
            }
            return reject(response.data);
          }

          window.console.log('%ccallServerApi: %o', 'color:#03A9F4;font-weight: bold', response.data);
          return resolve(normalizeFunc ? normalizeFunc(response.data) : response.data);
        },
        (res) => {
          const httpCode = res.response.status;
          if (httpCode === 401) {
            window.localStorage.clear();
            window.location.hash = '#/';
          }
        }
      )
      .catch((err) => {
        if (err.config && err.config.timeout) {
          log4Api(url, {
            bt, tt: Date.now() - bt, ok: 0, err: 'timeout',
          });
        }

        const rErr = { msg: JSON.stringify(err) };
        return reject(rErr);
      })
  ));
}

export const API = 'API';

/* eslint-disable no-unused-vars */
export default store => next => (action) => {
  const serverAPI = action[API];
  if (typeof serverAPI === 'undefined') {
    return next(action);
  }

  const {
    type,
    endpoint,
    params,
    normalizeFunc,
    success,
    fail,
    noErrNotify
  } = serverAPI;

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint.');
  }
  if (typeof params !== 'object') {
    throw new Error('Specify a object params.');
  }
  if (!(typeof type === 'string')) {
    throw new Error('Expected action type to be strings.');
  }
  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[API];

    return finalAction;
  }

  const requestType = `${type}_REQ`;
  const successType = `${type}_SUC`;
  const failureType = `${type}_FAI`;

  const { auth } = store.getState();

  const _params = {
    ...params,
    token: 'your fixed token here, if needed',
  };

  next(actionWith({ type: requestType }));

  return callServerApi(endpoint, _params, normalizeFunc, noErrNotify)
    .then((response) => {
      const nextAction = actionWith({
        response,
        type: successType,
      });
      const nextActionResult = next(nextAction);
      success && success(nextAction);
      return nextActionResult;
    })
    .catch((err) => {
      const msg = err.msg || '网络错误，请稍后再试';
      const nextAction = actionWith({
        type: failureType,
        msg,
        ...err,
      });
      next(nextAction);
      fail && fail(nextAction);
      return Promise.reject(err);
    });
};
