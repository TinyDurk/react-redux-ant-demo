import storage from './storage';
import { acAppLoginViaAccount, acAppLoginViaLocal, acLogout } from '@/actions';

const LOCAL_LOG_INFO_KEY = '_LOGIN_';
const LOGIN_SUCCESS_NEXT_ROUTE = '/example/list';

export const getLocalLogInfo = () => storage.get(LOCAL_LOG_INFO_KEY);
export const setLogInfoToLocal = user => storage.set(LOCAL_LOG_INFO_KEY, user);
const clearLogInfo = () => storage.remove(LOCAL_LOG_INFO_KEY);

class AppLogin {
  store = null;

  history = null;

  hasLogined = false;

  init(store, history) {
    this.store = store;
    this.history = history;
    this.checkLocalLoginInfo();
  }

  checkLocalLoginInfo() {
    const lcoalLoginUserInfo = getLocalLogInfo();
    if (lcoalLoginUserInfo) {
      this.hasLogined = true;
      this.store.dispatch(acAppLoginViaLocal(lcoalLoginUserInfo));
    }
  }

  checkHasLogined() {
    return this.hasLogined;
  }

  goLoginSucNextRoute() {
    this.history.replace(LOGIN_SUCCESS_NEXT_ROUTE);
  }

  doLogin(userName, password) {
    this.store.dispatch(acAppLoginViaAccount(userName, password))
      .then((action) => {
        this.hasLogined = true;
        setLogInfoToLocal(action.response.data);
        this.goLoginSucNextRoute();
      });
  }

  logout() {
    this.store.dispatch(acLogout());
    clearLogInfo();
    this.history.replace('/');
  }

  checkStoreLoginStatus() {
    return (nextState, replace, next) => {
      const LOGIN_USER_INFO = this.store.getState().auth.user;
      if (LOGIN_USER_INFO && LOGIN_USER_INFO.token_expire > Date.now() / 1000) {
        next();
      } else {
        replace('/');
        next();
      }
    };
  }
}

export default new AppLogin();
