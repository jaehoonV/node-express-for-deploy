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
  let sql = "SELECT D.CHAT_ROOM_NAME, D.MASTER_SEQ, D.MEMBER_NM, E.CONTENTS, "
          + "CASE WHEN CURRENT_DATE() = DATE_FORMAT(E.REG_DATE, '%Y-%m-%d') THEN DATE_FORMAT(E.REG_DATE, '%h:%i') "
          + "   WHEN DATE_FORMAT(CURRENT_DATE()-1, '%Y-%m-%d') = DATE_FORMAT(E.REG_DATE, '%Y-%m-%d') THEN 'Yesterday' "
          + "   ELSE DATE_FORMAT(E.REG_DATE, '%Y-%m-%d') END AS REG_DATE, "
          + "NVL(F.UNREAD_CNT, 0) AS UNREAD_CNT "
          + "FROM "
          + "   (SELECT A.CHAT_ROOM_NAME, A.MASTER_SEQ, GROUP_CONCAT(C.USERNAME ORDER BY B.MEMBER_SEQ separator ', ') AS MEMBER_NM "
          + "   FROM ex1.CHAT_MASTER A "
          + "       LEFT OUTER JOIN ex1.CHAT_MEMBER B ON A.MASTER_SEQ = B.MASTER_SEQ AND MEMBER_SEQ != (SELECT MEMBER_SEQ FROM color_memo.MEMBER WHERE EMAIL = ? ) "
          + "       LEFT OUTER JOIN color_memo.MEMBER C ON B.MEMBER_SEQ = C.MEMBER_SEQ "
          + "   WHERE A.MASTER_SEQ IN (SELECT MASTER_SEQ FROM ex1.CHAT_MEMBER WHERE MEMBER_SEQ = (SELECT MEMBER_SEQ FROM color_memo.MEMBER WHERE EMAIL = ? )) "
          + "   GROUP BY A.CHAT_ROOM_NAME, A.MASTER_SEQ ) D "
          + "   LEFT OUTER JOIN ex1.V_CHAT_LAST_CONTENTS_LIST E ON D.MASTER_SEQ = E.MASTER_SEQ "
          + "   LEFT OUTER JOIN (SELECT MASTER_SEQ, COUNT(CONTENTS_SEQ) UNREAD_CNT "
          + "       FROM ex1.V_CHAT_NOT_READ_CONTENTS "
          + "       WHERE MEMBER_SEQ = (SELECT MEMBER_SEQ FROM color_memo.MEMBER WHERE EMAIL = ? )) F "
          + "   ON D.MASTER_SEQ = F.MASTER_SEQ; ";
  let sql_data;
  maria.query(sql, [useremail, useremail, useremail], function (err, results) {
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

router.post('/chat_contents', async (req, res) => {
  let useremail = authCheck.getUseremail(req, res);
  try {

    // CHAT_READ_HISTORY 업데이트
    const sql_chat_history_update = "UPDATE ex1.CHAT_READ_HISTORY H "
                                  + "SET H.READ_DATE = CURRENT_TIMESTAMP "
                                  + "WHERE H.CONTENTS_SEQ IN ( "
                                  + "   SELECT A.CONTENTS_SEQ "
                                  + "   FROM ex1.CHAT_CONTENTS A, ex1.CHAT_READ_HISTORY B "
                                  + "   WHERE A.CONTENTS_SEQ = B.CONTENTS_SEQ AND A.MASTER_SEQ = ? " 
                                  + "     AND B.MEMBER_SEQ = (SELECT MEMBER_SEQ FROM color_memo.MEMBER WHERE EMAIL = ? ) "
                                  + "     AND B.READ_DATE IS NULL "
                                  + "   ) "
                                  + "   AND H.MEMBER_SEQ = (SELECT MEMBER_SEQ FROM color_memo.MEMBER WHERE EMAIL = ? );";
    await new Promise((resolve, reject) => {
      maria.query(sql_chat_history_update, [req.body.master_seq, useremail, useremail], function (err, result) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    // CHAT_CONTENTS 조회
    let sql_data;
    const sql_chat_contents = "SELECT A.CONTENTS, A.REG_ID, A.REG_DATE, DATE_FORMAT(A.REG_DATE, '%Y-%m-%d') AS REG_DAY, DATE_FORMAT(A.REG_DATE, '%h:%i') AS REG_TIME, "
                            + "CASE WHEN A.REG_ID = ? THEN 'mine' ELSE 'other' END AS MINE_DIV, "
                            + "COUNT(B.MEMBER_SEQ) - COUNT(B.READ_DATE) AS UNREAD_NUM, "
                            + "M.USERNAME "
                            + "FROM ex1.CHAT_CONTENTS A "
                            + "JOIN ex1.CHAT_READ_HISTORY B ON A.CONTENTS_SEQ = B.CONTENTS_SEQ AND A.MASTER_SEQ = ? "
                            + "LEFT JOIN color_memo.MEMBER M ON A.REG_ID = M.EMAIL "
                            + "GROUP BY A.CONTENTS, A.REG_ID, A.REG_DATE, M.USERNAME "
                            + "ORDER BY A.REG_DATE; "; 
    await new Promise((resolve, reject) => {
      maria.query(sql_chat_contents, [useremail, req.body.master_seq], function (err, results) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          sql_data = {
            "results" : results,
          }
          resolve(results);
        }
      });
    });

    res.json(sql_data);
  } catch (err) {
    console.log(err);
    res.render('error', { error: err });
  }
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
    const contents_seq = results[0].SEQ;

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