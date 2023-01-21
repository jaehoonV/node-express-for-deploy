var express = require('express');
var router = express.Router();

// mariaDB Connection
// const maria = require('../ext/conn_mariaDB');
// maria.connect();   // DB 접속

/* lotto */
/* 전체 통계 */
let sql_lo = "SELECT ROUND, NUM1, NUM2, NUM3, NUM4, NUM5, NUM6, NUMB, PRIZE1, PRIZE1CNT, PRIZE2, PRIZE2CNT, DATE_FORMAT(ROUND_DATE,'%Y년 %m월 %d일') AS ROUND_DATE, FORMAT(PRIZE1, 0) AS PRIZE1_, FORMAT(PRIZE2, 0) AS PRIZE2_ FROM `LOTTO` ORDER BY ROUND DESC; ";
/* 번호별 횟수 */
let sql_lo_num_cnt = "SELECT * FROM V_LOTTO_CNT_SUM ORDER BY NUM_CNT DESC, NUM ASC; ";

/* 최근 10회차 번호별 횟수 */
let sql_lo_recently10_num_cnt = "SELECT TEMP.NUM AS NUM, SUM(TEMP.NUM_CNT) AS NUM_CNT FROM (" +
  "SELECT NUM1 AS NUM, COUNT(NUM1) AS NUM_CNT FROM `V_RECENTLY10_LOTTO` GROUP BY NUM UNION ALL " +
  "SELECT NUM2 AS NUM, COUNT(NUM2) AS NUM_CNT FROM `V_RECENTLY10_LOTTO` GROUP BY NUM UNION ALL " +
  "SELECT NUM3 AS NUM, COUNT(NUM3) AS NUM_CNT FROM `V_RECENTLY10_LOTTO` GROUP BY NUM UNION ALL " +
  "SELECT NUM4 AS NUM, COUNT(NUM4) AS NUM_CNT FROM `V_RECENTLY10_LOTTO` GROUP BY NUM UNION ALL " +
  "SELECT NUM5 AS NUM, COUNT(NUM5) AS NUM_CNT FROM `V_RECENTLY10_LOTTO` GROUP BY NUM UNION ALL " +
  "SELECT NUM6 AS NUM, COUNT(NUM6) AS NUM_CNT FROM `V_RECENTLY10_LOTTO` GROUP BY NUM UNION ALL " +
  "SELECT NUMB AS NUM, COUNT(NUMB) AS NUM_CNT FROM `V_RECENTLY10_LOTTO` GROUP BY NUM) TEMP GROUP BY NUM ORDER BY NUM_CNT DESC, NUM ASC; "; 

/* 평균보다 많이 나온 번호 */
let sql_lo_avg_up = "SELECT * FROM V_LOTTO_CNT_SUM WHERE NUM_CNT >= GET_AVG_LOTTO_CNT() ORDER BY NUM_CNT DESC, NUM ASC; ";

/* 평균보다 적게 나온 번호 */
let sql_lo_avg_down = "SELECT * FROM V_LOTTO_CNT_SUM WHERE NUM_CNT < GET_AVG_LOTTO_CNT() ORDER BY NUM_CNT DESC, NUM ASC; ";

/* 많이 나온 번호(25%) */
let sql_lo_avg_top = "SELECT * FROM V_LOTTO_CNT_SUM WHERE NUM_CNT >= GET_AVG_LOTTO_CNT_TOP() ORDER BY NUM_CNT DESC, NUM ASC; ";

/* 적게 나온 번호(25%) */
let sql_lo_avg_bottom = "SELECT * FROM V_LOTTO_CNT_SUM WHERE NUM_CNT <= GET_AVG_LOTTO_CNT_BOTTOM() ORDER BY NUM_CNT DESC, NUM ASC; ";

router.get('/', (req, res) => {
  res.render('lotto');
})

router.post('/', (req, res) => {
  let sql_data_lo;
  maria.query(sql_lo + sql_lo_num_cnt + sql_lo_recently10_num_cnt + sql_lo_avg_up + sql_lo_avg_down + sql_lo_avg_top + sql_lo_avg_bottom, function (err, results) {
    if (err) {
        console.log(err);
        res.render('error', {error: err});
    }
    sql_data_lo = {
      "results_lo" : results[0],
      "results_lo_num_cnt" : results[1],
      "results_lo_recently10_num_cnt" : results[2],
      "results_lo_avg_up" : results[3],
      "results_lo_avg_down" : results[4],
      "results_lo_top25" : results[5],
      "results_lo_bottom25" : results[6]
    }
    res.json(sql_data_lo);
  });
})

router.post('/save', (req, res) => {
  console.log(req.body);
  let sql_lo_insert = "INSERT INTO LOTTO(ROUND,NUM1,NUM2,NUM3,NUM4,NUM5,NUM6,NUMB,PRIZE1,PRIZE1CNT,PRIZE2,PRIZE2CNT,ROUND_DATE,REGDAY,REGID) "
  + "VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_DATE(), ?); ";

  maria.query(sql_lo_insert,
              [req.body.round, req.body.num1, req.body.num2, req.body.num3, req.body.num4, req.body.num5, req.body.num6, req.body.numB, req.body.prize1, req.body.prize1cnt, req.body.prize2, req.body.prize2cnt, req.body.round_date, req.body.regid], 
              function (err, result) {
    if (err) {
      console.log(err);
      res.render('error', {error: err});
    } else{
      console.log("1 record inserted!");
      res.render('lotto');
    }
  });
})

router.post('/extraction', (req, res) => {

  let sql_lo_ext_sel = "SELECT B.ROUND, B.NUM1, B.NUM2, B.NUM3, B.NUM4, B.NUM5, B.NUM6, C.NUMB, B.CNT, "
    + "CASE WHEN C.NUMB IN (" + req.body.num1 + ", " + req.body.num2 + ", " + req.body.num3 + ", " + req.body.num4 + ", " + req.body.num5 + ", " + req.body.num6 + ") THEN '3등' "
    + "WHEN B.CNT = 5 THEN '2등' WHEN B.CNT = 6 THEN '1등' ELSE '4등' END AS RANK "
    + "FROM (SELECT A.ROUND, A.NUM1, A.NUM2, A.NUM3, A.NUM4, A.NUM5, A.NUM6, COUNT(A.ROUND) AS CNT FROM "
    + "(SELECT * FROM LOTTO WHERE NUM1 IN (" + req.body.num1 + ", " + req.body.num2 + ", " + req.body.num3 + ", " + req.body.num4 + ", " + req.body.num5 + ", " + req.body.num6 + ") "
    + "UNION ALL "
    + "SELECT * FROM LOTTO WHERE NUM2 IN (" + req.body.num1 + ", " + req.body.num2 + ", " + req.body.num3 + ", " + req.body.num4 + ", " + req.body.num5 + ", " + req.body.num6 + ") "
    + "UNION ALL "
    + "SELECT * FROM LOTTO WHERE NUM3 IN (" + req.body.num1 + ", " + req.body.num2 + ", " + req.body.num3 + ", " + req.body.num4 + ", " + req.body.num5 + ", " + req.body.num6 + ") "
    + "UNION ALL "
    + "SELECT * FROM LOTTO WHERE NUM4 IN (" + req.body.num1 + ", " + req.body.num2 + ", " + req.body.num3 + ", " + req.body.num4 + ", " + req.body.num5 + ", " + req.body.num6 + ") "
    + "UNION ALL "
    + "SELECT * FROM LOTTO WHERE NUM5 IN (" + req.body.num1 + ", " + req.body.num2 + ", " + req.body.num3 + ", " + req.body.num4 + ", " + req.body.num5 + ", " + req.body.num6 + ") "
    + "UNION ALL "
    + "SELECT * FROM LOTTO WHERE NUM6 IN (" + req.body.num1 + ", " + req.body.num2 + ", " + req.body.num3 + ", " + req.body.num4 + ", " + req.body.num5 + ", " + req.body.num6 + ")) A "
    + "GROUP BY A.ROUND, A.NUM1, A.NUM2, A.NUM3, A.NUM4, A.NUM5, A.NUM6) B, LOTTO C WHERE B.CNT > 3 AND B.ROUND = C.ROUND ";
  
  maria.query(sql_lo_ext_sel, function (err, result) {
    if (err) {
      console.log(err);
      res.render('error', {error: err});
    } else{
      res.json(result);
    }
  });
})

module.exports = router;

// maria.end(); // DB 접속 종료