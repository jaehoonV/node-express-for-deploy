let express = require('express');
let router = express.Router();

let createLog = require('../public/script/createLog.js');
let authCheck = require('../public/script/authCheck.js');
// mariaDB Connection
const maria = require('../ext/conn_mariaDB.js');

router.use(express.static("public"));

/* Log */
let sql_log = "SELECT SEQ, EMAIL, USERNAME, EVENT, EVENT_TYPE, EVENT_IP, DATE_FORMAT(REGDAY, '%Y-%m-%d %T') AS REGDAY FROM EVENT_LOG ORDER BY SEQ DESC; ";
let sql_log_act = "SELECT SEQ, EMAIL, USERNAME, EVENT, EVENT_TYPE, EVENT_IP, DATE_FORMAT(REGDAY, '%Y-%m-%d %T') AS REGDAY FROM EVENT_LOG WHERE EVENT_TYPE = 'ACT' ORDER BY SEQ DESC; ";
let sql_log_move = "SELECT SEQ, EMAIL, USERNAME, EVENT, EVENT_TYPE, EVENT_IP, DATE_FORMAT(REGDAY, '%Y-%m-%d %T') AS REGDAY FROM EVENT_LOG WHERE EVENT_TYPE = 'MOVE' ORDER BY SEQ DESC; ";
let sql_member = "SELECT MEMBER_SEQ, EMAIL, USERNAME, MASTER_YN, USE_YN FROM MEMBER WHERE EMAIL != ? ORDER BY MEMBER_SEQ ASC; ";

router.get('/', (req, res) => {
  if (!authCheck.isOwner(req, res)) {  // login page
    res.redirect('/login');
    return false;
  } else {
    let master_yn = {"master_yn" : authCheck.isMaster(req, res)};
    
    createLog.insertLog(req, res, 'MOVE LOG PAGE', 'MOVE');
    res.render('logPage', master_yn);
    return false;
  }
})

router.post('/', (req, res) => {
  let useremail = authCheck.getUseremail(req, res);
  let sql_data_log;
  maria.query(sql_log + sql_log_act + sql_log_move + sql_member, [useremail], function (err, results) {
    if (err) {
      console.log(err);
      res.render('error', { error: err });
    }
    sql_data_log = {
      "results_log": results[0],
      "results_log_act": results[1],
      "results_log_move": results[2],
      "results_member": results[3]
    }
    res.json(sql_data_log);
  });
})

router.post('/updateMaster', (req, res) => {
  let sql_update_member = "UPDATE MEMBER SET MASTER_YN = ? WHERE MEMBER_SEQ = ?";
  let log_text = "";
  if(req.body.val == 'Y'){
    log_text += "GRANT MASTER_YN " + req.body.username;
  }else{
    log_text += "REVOKE MASTER_YN " + req.body.username;
  }
  
  
    maria.query(sql_update_member, [req.body.val, req.body.member_seq], function (err, result) {
      if (err) {
        console.log(err);
        res.render('error', {error: err});
      } else{
        createLog.insertLog(req, res, log_text, 'ACT');

        let done_chk = {
          "chk" : "Y"
        }
        res.json(done_chk);
      }
  });
})

router.post('/updateUse', (req, res) => {
  let sql_update_use = "UPDATE MEMBER SET USE_YN = ? WHERE MEMBER_SEQ = ?";
  let log_text = "";
  if(req.body.val == 'Y'){
    log_text += "GRANT USE_YN " + req.body.username;
  }else{
    log_text += "REVOKE USE_YN " + req.body.username;
  }
  
  
    maria.query(sql_update_use, [req.body.val, req.body.member_seq], function (err, result) {
      if (err) {
        console.log(err);
        res.render('error', {error: err});
      } else{
        createLog.insertLog(req, res, log_text, 'ACT');

        let done_chk = {
          "chk" : "Y"
        }
        res.json(done_chk);
      }
  });
})

// 404 Error Handling
router.all('*', (req, res, next) => {
  res.status(404).render('error', { error: 404 });
});

module.exports = router;