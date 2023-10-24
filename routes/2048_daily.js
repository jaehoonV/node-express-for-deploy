let express = require('express');
let router = express.Router();

let createLog = require('../public/script/createLog.js');
let authCheck = require('../public/script/authCheck.js');
// mariaDB Connection
const maria = require('../ext/conn_mariaDB');

router.use(express.static("public"));

router.get('/', (req, res) => {
    if (!authCheck.isOwner(req, res)) {  // login page
        res.redirect('/login');
        return false;
    } else {
        createLog.insertLog(req, res, 'MOVE 2048Daily PAGE', 'MOVE');
        res.render('2048_daily');
        return false;
    }
})

router.post('/save', (req, res) => {
  let sql_mine_insert = "INSERT INTO GAME_RECORD(SEQ,SCORE,EMAIL,USERNAME,REGDAY) "
    + "VALUES( NEXTVAL(GAME_SEQ), ?, ?, ?, CURRENT_DATE()); ";

  maria.query(sql_mine_insert,
    [req.body.save_score, req.session.email, req.session.username],
    function (err, result) {
      if (err) {
        console.log(err);
        res.render('error', { error: err });
      } else {
        createLog.insertLog(req, res, '2048DAILY RECORD INSERTED', 'ACT');
        res.redirect('/2048_daily');
      }
    });
})

// 404 Error Handling
router.all('*', (req, res, next) => {
  res.status(404).render('error', { error: 404 });
});

module.exports = router;