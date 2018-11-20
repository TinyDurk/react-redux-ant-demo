/*
 * @Created Date: Thursday April 19th 2018
 * @Author: Burning
 * ------------------------------
 * @Last Modified by:: Burning
 * @Last Modified time: Thursday, 19th April 2018 4:32:34 pm
 * ------------------------------
 * Copyright (c) XFE
 */

export const CACHE = 'CACHE';
export const CACHE_STATE = 'CACHE_STATE';

/* eslint-disable no-unused-vars */
export default store => next => (action) => {
  if (typeof action[CACHE] === 'undefined') {
    return next(action);
  }
  const state = store.getState();
  sessionStorage.setItem(CACHE_STATE, JSON.stringify(state));
  return null;
};
