import * as ActionTypes from '@/const/ActionTypes';

export const acAppLoginViaAccount = (name, code) => ({
  API: {
    type: ActionTypes.APP_LOGIN,
    endpoint: '/account/sign_in',
    params: {
      name,
      code,
    },
  },
});

export const acAppLoginViaLocal = user => ({
  type: ActionTypes.LOCAL_APP_LOGIN,
  user,
});

export const acLogout = () => ({
  type: ActionTypes.LOG_OUT,
});
