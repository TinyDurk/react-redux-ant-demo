/**
 * @Created Date: Friday January 5th 2018
 * @Author: Burning
 * ------------------------------
 * @Last Modified by:: Burning
 * @Last Modified time: Friday, 5th January 2018 3:24:51 pm
 * ------------------------------
 * Copyright (c) XFE
 */

function getState(sessionKey, checkFunc) {
  let state;
  if (sessionStorage) {
    state = sessionStorage.getItem(sessionKey) || undefined;
  }
  if (state) {
    try {
      state = JSON.parse(state);
    } catch (e) {
      state = undefined;
    }
    if (checkFunc && checkFunc(state)) {
      sessionStorage.removeItem(sessionKey);
      return state;
    }
  }
  return undefined;
}

function clearState(sessionKey) {
  let state;
  if (sessionStorage) {
    state = sessionStorage.getItem(sessionKey) || undefined;
  }
  if (state) {
    sessionStorage.removeItem(sessionKey);
  }
}

function cacheState(sessionKey, state) {
  sessionStorage.setItem(sessionKey, JSON.stringify(state));
}

const sessionStateMgr = {
  getState,
  cacheState,
  clearState,
};

export default sessionStateMgr;
