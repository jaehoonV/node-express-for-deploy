var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var lottoRouter = require('./routes/lotto');
var usersRouter = require('./routes/users');
let minesweeperRouter = require('./routes/minesweeper');
let daily2048Router = require('./routes/2048_daily');
let myWorkListRouter = require('./routes/myWorkList');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.use(express.static("views"));
app.use(express.static("public"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/lotto', lottoRouter);
app.use('/users', usersRouter);
app.use('/minesweeper', minesweeperRouter);
app.use('/2048_daily', daily2048Router);
app.use('/my_work_list', myWorkListRouter);

// 404 Error Handling
app.all('*',(req, res, next) => {
  res.status(404).render('error',{error: 404});
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
