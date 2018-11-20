// catch 404 and forward to error handler
export const fzfHandler = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  console.error('err url: ', req.url);
  res.render('common/error', {
    error: err,
  });
  next(err);
};

// error handler
export const errorHandler = (err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.error('err handler msg: ', err.message);
  res.render('common/error', {
    error: err,
  });
};
