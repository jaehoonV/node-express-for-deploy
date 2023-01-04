var express = require('express');
var router = express.Router();

// mariaDB Connection
const maria = require('../ext/conn_mariaDB');
maria.connect();   // DB 접속

let sql = "SELECT EMAIL, USERNAME FROM `MEMBER`";
var sql_res = [];
var sql_data;
maria.query(sql, function (err, results) {
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

maria.end(); // DB 접속 종료