let express = require('express');
let router = express.Router();

// mariaDB Connection
const maria = require('../ext/conn_mariaDB');

router.use(express.static("public"));

router.get('/', (req, res) => {
    res.render('minesweeper');
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
    console.log(req.body);
    let sql_mine_insert = "INSERT INTO MINESWEEPER(SEQ,SCORE,CLICK_CNT,PLAY_TIME,NAME,REGDAY) "
    + "VALUES( NEXTVAL(MINE_SEQ), ?, ?, ?, ?, CURRENT_DATE()); ";
  
    maria.query(sql_mine_insert,
                [req.body.save_score, req.body.save_click_cnt, req.body.save_play_time, req.body.save_name], 
                function (err, result) {
      if (err) {
        console.log(err);
        res.render('error', {error: err});
      } else{
        console.log("1 record inserted!");
        res.redirect('/minesweeper');
      }
    });
  })

// 404 Error Handling
router.all('*',(req, res, next) => {
    res.status(404).render('error',{error: 404});
});

module.exports = router;