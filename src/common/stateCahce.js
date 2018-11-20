const CACHE_STATE = 'CACHE_STATE';

export const readStorageState = () => {
  let storeInitState;
  const cacheState = sessionStorage.getItem(CACHE_STATE);
  if (cacheState) {
    storeInitState = JSON.parse(cacheState);
  }
  sessionStorage.removeItem(CACHE_STATE);
  return storeInitState;
};

export const filterCacheState = (state) => {
  // 如果有需要cache的数据都统一在此处定义
  const _state = {
    auth: state.auth
  };
  sessionStorage.setItem(CACHE_STATE, JSON.stringify(_state));
};
