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
  let sql = "SELECT b.chat_room_name, b.master_seq, (SELECT USERNAME FROM color_memo.MEMBER WHERE EMAIL = e.user_id) AS member_nm, c.member_seq, d.contents, DATE_FORMAT(d.reg_date, '%Y-%m-%d') AS reg_date "
          + "FROM ex1.chat_member a "
          + "RIGHT OUTER JOIN ex1.chat_master b "
          + "ON a.master_seq = b.master_seq "
          + "RIGHT OUTER JOIN ex1.chat_member c "
          + "ON a.master_seq = c.master_seq "
          + "RIGHT OUTER JOIN ex1.v_chat_last_contents d "
          + "ON a.master_seq = d.master_seq "
          + "RIGHT OUTER JOIN ex1.chat_user e "
          + "ON c.member_seq = e.user_seq "
          + "WHERE a.member_seq = (SELECT user_seq FROM ex1.chat_user WHERE user_id = ?) "
          + "AND c.member_seq != (SELECT user_seq FROM ex1.chat_user WHERE user_id = ?) "
          + "ORDER BY reg_date ";
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
    let sql = "SELECT a.contents, a.reg_id, a.reg_date, DATE_FORMAT(a.reg_date, '%Y-%m-%d') reg_day, DATE_FORMAT(a.reg_date, '%h:%i') reg_time, "
            + "CASE WHEN reg_id = ? THEN 'mine' ELSE 'other' END mine_div, "
            + "COUNT(b.member_seq) - COUNT(b.read_date) unread_num "
            + "FROM ex1.chat_contents a, ex1.chat_read_history b "
            + "WHERE a.contents_seq = b.contents_seq AND a.master_seq = ? "
            + "GROUP BY a.contents, a.reg_id, a.reg_date "
            + "ORDER BY a.reg_date";
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
    const sql_contents_seq_select = "SELECT NEXTVAL(ex1.contents_seq) AS seq FROM DUAL;";
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
    const sql_chat_insert = "INSERT INTO ex1.chat_contents(master_seq, contents_seq, contents, reg_id, reg_date) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP);";
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
    const sql_chat_history_insert = "INSERT INTO ex1.chat_read_history(contents_seq, member_seq) SELECT ?, member_seq FROM ex1.chat_member WHERE master_seq = ?;";
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