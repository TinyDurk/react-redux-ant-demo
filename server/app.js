import 'babel-polyfill';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import favicon from 'serve-favicon';

const app = express();

// view engine setup
app.set('view engine', 'pug');

// get cookies via res.cookies
app.use(cookieParser());
app.use(favicon(path.resolve(__dirname, '../public/favicon.ico')));

export default app;
