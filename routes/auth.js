var express = require('express');
var router = express.Router();

router.use(express.static("public"));

let authCheck = require('../public/script/authCheck.js');
let template = require('../public/script/template.js');

// mariaDB Connection
const maria = require('../ext/conn_mariaDB');
maria.connect();   // DB 접속

let sql = "SELECT EMAIL, USERNAME FROM `MEMBER`";
var sql_data;
maria.query(sql, function (err, results) {
  if (err) {
      console.log(err);
      res.render('error', {error: err});
  }
  sql_data = {
      "results": results
  }
});

/* GET home page. */
router.get('/', (req, res) => {
  if (!authCheck.isOwner(req, res)) {  // login page
    res.redirect('/login');
    return false;
  } else {
    res.redirect('/main');
    return false;
  }
})

/* GET main page. */
router.get('/main', function(req, res, next) {
  if (!authCheck.isOwner(req, res)) {  // login page
    res.redirect('/login');
    return false;
  }
  res.render('index', sql_data);
});

// login page
router.get('/login', function (request, response) {
  var title = 'Login';
  var html = template.HTML(title,`
          <h2>로그인</h2>
          <form action="/login_process" method="post">
          <p><input class="login" type="text" name="email" placeholder="아이디"></p>
          <p><input class="login" type="password" name="password" placeholder="비밀번호"></p>
          <p><input class="btn" type="submit" value="로그인"></p>
          </form> 
      `, '');
  response.send(html);
});

// login process
router.post('/login_process', function (request, response) {
  var email = request.body.email;
  var password = request.body.password;
  if (email && password) {             // id와 pw가 입력되었는지 확인
    maria.query('SELECT * FROM `MEMBER` WHERE EMAIL = ? AND PASSWORD = ?', [email, password], function(error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {       // db에서의 반환값이 있으면 로그인 성공
              request.session.is_logined = true;      // 세션 정보 갱신
              request.session.email = email;
              request.session.save(function () {
                  response.redirect(`/`);
              });
          } else {              
              response.send(`<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); 
              document.location.href="/login";</script>`);    
          }            
      });
  } else {
      response.send(`<script type="text/javascript">alert("아이디와 비밀번호를 입력하세요!"); 
      document.location.href="/login";</script>`);    
  }
});

// 로그아웃
router.get('/logout', function (request, response) {
  request.session.destroy(function (err) {
      response.redirect('/');
  });
});

module.exports = router;