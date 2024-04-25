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
    let master_yn = {"master_yn" : authCheck.isMaster(req, res)};
    
    createLog.insertLog(req, res, 'CHAT PAGE', 'MOVE');
    res.render('chat_container', master_yn);
    return false;
  }
})

router.post('/', (req, res) => {
  console.log(req.body);
  let useremail = authCheck.getUseremail(req, res);
  let sql = "SELECT B.CHAT_ROOM_NAME, B.MASTER_SEQ, C.MEMBER_SEQ, E.USERNAME AS MEMBER_NM, D.CONTENTS, DATE_FORMAT(D.REG_DATE, '%Y-%m-%d') AS REG_DATE "
          + "FROM ex1.CHAT_MEMBER A "
          + "RIGHT OUTER JOIN ex1.CHAT_MASTER B "
          + "ON A.MASTER_SEQ = B.MASTER_SEQ "
          + "RIGHT OUTER JOIN ex1.CHAT_MEMBER C "
          + "ON A.MASTER_SEQ = C.MASTER_SEQ "
          + "RIGHT OUTER JOIN ex1.V_CHAT_LAST_CONTENTS_LIST D "
          + "ON A.MASTER_SEQ = D.MASTER_SEQ "
          + "RIGHT OUTER JOIN color_memo.MEMBER E "
          + "ON C.MEMBER_SEQ = E.MEMBER_SEQ "
          + "WHERE A.MEMBER_SEQ = (SELECT MEMBER_SEQ FROM color_memo.MEMBER WHERE EMAIL = ?) "
          + "AND C.MEMBER_SEQ != (SELECT MEMBER_SEQ FROM color_memo.MEMBER WHERE EMAIL = ?) "
          + "ORDER BY D.REG_DATE ";
  let sql_data;
  maria.query(sql, [useremail, useremail], function (err, results) {
    if (err) {
        console.log(err);
        res.render('error', {error: err});
    }
    sql_data = {
      "results" : results,
    }
    res.json(sql_data);
  });
})

router.post('/chat_contents', (req, res) => {
    console.log(req.body);
    let useremail = authCheck.getUseremail(req, res);
    let sql = "SELECT A.CONTENTS, A.REG_ID, A.REG_DATE, DATE_FORMAT(A.REG_DATE, '%Y-%m-%d') REG_DAY, DATE_FORMAT(A.REG_DATE, '%h:%i') REG_TIME, "
            + "CASE WHEN REG_ID = ? THEN 'mine' ELSE 'other' END MINE_DIV, "
            + "COUNT(B.MEMBER_SEQ) - COUNT(B.READ_DATE) UNREAD_NUM "
            + "FROM ex1.CHAT_CONTENTS A, ex1.CHAT_READ_HISTORY B "
            + "WHERE A.CONTENTS_SEQ = B.CONTENTS_SEQ AND A.MASTER_SEQ = ? "
            + "GROUP BY A.CONTENTS, A.REG_ID, A.REG_DATE "
            + "ORDER BY A.REG_DATE";
    let sql_data;
    maria.query(sql, [useremail, req.body.master_seq], function (err, results) {
      if (err) {
          console.log(err);
          res.render('error', {error: err});
      }
      sql_data = {
        "results" : results,
      }
      res.json(sql_data);
    });
  })

router.post('/insert', async (req, res) => {
  let useremail = authCheck.getUseremail(req, res);
  try {
    let chk = 'Y';

    // contents_seq 조회
    const sql_contents_seq_select = "SELECT NVL(MAX(CONTENTS_SEQ), 0) + 1 AS SEQ FROM ex1.CHAT_CONTENTS;";
    const result = await new Promise((resolve, reject) => {
      maria.query(sql_contents_seq_select, function (err, result) {
        if (err) {
          chk = 'N';
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    const results = JSON.parse(JSON.stringify(result));
    const contents_seq = results[0].seq;

    // chat_contents에 데이터 삽입
    const sql_chat_insert = "INSERT INTO ex1.CHAT_CONTENTS(MASTER_SEQ, CONTENTS_SEQ, CONTENTS, REG_ID, REG_DATE) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP);";
    await new Promise((resolve, reject) => {
      maria.query(sql_chat_insert, [req.body.master_seq, contents_seq, req.body.contents, useremail], function (err, result) {
        if (err) {
          chk = 'N';
          reject(err);
        } else {
          // 로그 삽입 및 리다이렉트
          createLog.insertLog(req, res, 'CHAT INSERTED', 'ACT');
          resolve(result);
        }
      });
    });

    // chat_read_history에 데이터 삽입
    const sql_chat_history_insert = "INSERT INTO ex1.CHAT_READ_HISTORY(CONTENTS_SEQ, MEMBER_SEQ) SELECT ?, MEMBER_SEQ FROM ex1.CHAT_MEMBER WHERE MASTER_SEQ = ?;";
    await new Promise((resolve, reject) => {
      maria.query(sql_chat_history_insert, [contents_seq, req.body.master_seq], function (err, result) {
        if (err) {
          chk = 'N';
          reject(err);
        } else {
          // 로그 삽입 및 리다이렉트
          createLog.insertLog(req, res, 'CHAT HISTORY INSERTED', 'ACT');
          resolve(result);
        }
      });
    });

    let done_chk = {
      "chk" : chk
    }

    res.json(done_chk);

  } catch (err) {
    console.log(err);
    res.render('error', { error: err });
  }
})

// 404 Error Handling
router.all('*',(req, res, next) => {
    res.status(404).render('error',{error: 404});
});

module.exports = router;