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
    createLog.insertLog(req, res, 'MOVE MINESWEEPER PAGE', 'MOVE');
    res.render('minesweeper');
    return false;
  }
})

let sql_mine_history = "SELECT SEQ, CONVERT(SCORE, FLOAT) AS SCORE, CLICK_CNT, PLAY_TIME, NAME, DATE_FORMAT(REGDAY,'%Y년 %m월 %d일') AS REGDAY FROM MINESWEEPER ORDER BY SCORE DESC, REGDAY; ";
router.post('/', (req, res) => {
    let sql_data_mine;
    maria.query(sql_mine_history, function (err, results) {
      if (err) {
          console.log(err);
          res.render('error', {error: err});
      }
      sql_data_mine = results;
      console.log(req.body.today);
      res.json(sql_data_mine);
    });
  })

router.post('/save', (req, res) => {
  let sql_mine_insert = "INSERT INTO MINESWEEPER(SEQ,SCORE,CLICK_CNT,PLAY_TIME,NAME,EMAIL,REGDAY) "
  + "VALUES( NEXTVAL(MINE_SEQ), ?, ?, ?, ?, ?, CURRENT_DATE()); ";

  maria.query(sql_mine_insert,
              [req.body.save_score, req.body.save_click_cnt, req.body.save_play_time, req.session.username, req.session.email], 
              function (err, result) {
      if (err) {
        console.log(err);
        res.render('error', {error: err});
      } else{
        createLog.insertLog(req, res, 'MINESWEEPER RECORD INSERTED', 'ACT');
        res.redirect('/minesweeper');
      }
    });
  })

// 404 Error Handling
router.all('*',(req, res, next) => {
    res.status(404).render('error',{error: 404});
});

module.exports = router;