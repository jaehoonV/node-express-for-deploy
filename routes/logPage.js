let express = require('express');
let router = express.Router();

let createLog = require('../public/script/createLog.js');
let authCheck = require('../public/script/authCheck.js');
// mariaDB Connection
const maria = require('../ext/conn_mariaDB.js');

router.use(express.static("public"));

/* Log */
let sql_log = "SELECT SEQ, EMAIL, USERNAME, EVENT, EVENT_IP, REGDAY FROM EVENT_LOG ORDER BY SEQ DESC; ";

router.get('/', (req, res) => {
  if (!authCheck.isOwner(req, res)) {  // login page
    res.redirect('/login');
    return false;
  } else {
    let master_yn = {"master_yn" : authCheck.isMaster(req, res)};

    createLog.insertLog(req, res, 'MOVE LOG PAGE');
    res.render('logPage', master_yn);
    return false;
  }
})

router.post('/', (req, res) => {
  let sql_data_log;
  maria.query(sql_log, function (err, results) {
    if (err) {
      console.log(err);
      res.render('error', { error: err });
    }
    sql_data_log = {
      "results_log": results
    }
    res.json(sql_data_log);
  });
})

// 404 Error Handling
router.all('*', (req, res, next) => {
  res.status(404).render('error', { error: 404 });
});

module.exports = router;