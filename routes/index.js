var express = require('express');
var router = express.Router();

// mariaDB Connection
const maria = require('../ext/conn_mariaDB');
//maria.connect();   // DB 접속

let sql = "SELECT EMAIL, USERNAME, MASTER_YN FROM `MEMBER`";
var sql_data;
maria.query(sql, function (err, results) {
  if (err) {
      console.log(err);
  }
  sql_data = {
      "results": results
  }
});

router.use(express.static("public"));

/* GET home page. */
router.get('/main', function(req, res, next) {
  res.render('index', sql_data);
});

module.exports = router;
