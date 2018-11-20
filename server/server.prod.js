import path from 'path';
import express from 'express';
import app from './app';
import * as errorMiddleware from './middleware/error';
import router from './routes';
// import './middleware/logger';

const port = process.env.port || 3000;

app.set('views', path.resolve(__dirname, '../dist/views/prod'));
app.use('/v2', express.static(path.join(__dirname, '../dist/client')));

app.use(router);

// 404 and error handler
app.use(errorMiddleware.fzfHandler);
app.use(errorMiddleware.errorHandler);

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log('\n==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
    console.log('==>NODE_ENV=%s XNG_ENV=%s CODE_VERSION=%s', process.env.NODE_ENV, process.env.XNG_ENV, process.env.CODE_VERSION);
  }
});
