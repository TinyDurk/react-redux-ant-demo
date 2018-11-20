const authCT = type => `@auth/${type}`;

/**
 * auth login
 */
export const APP_LOGIN = authCT('APP_LOGIN');
export const LOCAL_APP_LOGIN = authCT('LOCAL_APP_LOGIN');
export const LOG_OUT = authCT('LOG_OUT');
