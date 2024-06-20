var express = require('express');
var router = express.Router();

router.use(express.static("public"));

let authCheck = require('../public/script/authCheck.js');
// mariaDB Connection
const maria = require('../ext/conn_mariaDB');

/* GET home page. */
router.get('/main', function(req, res, next) {
  let sql = "SELECT EMAIL, USERNAME, MASTER_YN, USE_YN FROM `MEMBER` ORDER BY MEMBER_SEQ";
  let sql_data;
  maria.query(sql, function (err, results) {
    if (err) {
        console.log(err);
        res.render('error', {error: err});
    }
    sql_data = {
        "results": results
    }
  });
  res.render('index', sql_data);
});

/* POST main */
router.post('/main', function(req, res, next) {
  let master_yn = {"master_yn" : authCheck.isMaster(req, res)};
  res.json(master_yn);
});

module.exports = router;
