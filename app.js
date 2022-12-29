var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql');  // mysql 모듈 로드
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const conn = {  // mysql 접속 설정
  host: 'svc.gksl2.cloudtype.app',
  port: '32059',
  user: 'root',
  password: '1032',
  database: 'color_memo'
};

let connection = mysql.createConnection(conn); // DB 커넥션 생성
connection.connect();   // DB 접속

let sql = "SELECT EMAIL, USERNAME FROM `MEMBER`";
var sql_res = [];
var sql_data;
connection.query(sql, function (err, results) {
  if (err) {
      console.log(err);
  }
  sql_data = {
      "results": results
  }
  console.log(sql_res);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static("views"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', sql_data);
})
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
