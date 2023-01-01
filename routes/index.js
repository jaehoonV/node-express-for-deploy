var express = require('express');
var router = express.Router();
const mysql = require('mysql');  // mysql 모듈 로드

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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', sql_data);
});

module.exports = router;

connection.end(); // DB 접속 종료