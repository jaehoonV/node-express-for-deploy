var express = require('express');
var router = express.Router();

router.use(express.static("public"));

let authCheck = require('../public/script/authCheck.js');
let template = require('../public/script/template.js');

// mariaDB Connection
const maria = require('../ext/conn_mariaDB');
maria.connect();   // DB 접속

let sql = "SELECT EMAIL, USERNAME, MASTER_YN FROM `MEMBER`";
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
  var html = template.HTML(title, `
  <div class="container">
  <div class="box signin">
     <h2>Already Have an Account ?</h2>
     <button class="signinBtn">Sign in</button>
  </div>
  <div class="box signup">
     <h2>Don't Have an Account ?</h2>
     <button class="signupBtn">Sign up</button>
  </div>
  <div class="formBx">
     <div class="form signinform">
        <form action="/login_process" method="post">
           <h3>Sign In</h3>
           <input type="text" name="email" placeholder="Email">
           <input type="password" name="password" placeholder="Password">
           <input type="submit" value="Login">
           <a href="#" class="forgot">Forgot Password</a>
        </form>
     </div>
     <div class="form signupform">
        <form action="/register" method="post" onsubmit="return check()">
           <h3>Sign Up</h3>
           <input type="text" id="username_for_regist" name="username" placeholder="Username">
           <input type="text" id="email_for_regist" name="email" placeholder="Email Address">
           <input type="password" id="pwd1" name="password" placeholder="Password">
           <input type="password" id="pwd2" class="check_password_input" name="confirm" placeholder="Confirm">
           <div class="alert">
           <div class="alert-success" id="alert-success"></div>
           <div class="alert-danger" id="alert-danger"></div>
           </div>
           <input type="submit" value="Register">
        </form>
     </div>
  </div>
</div>
<style>
  .alert{
    position: relative;
    top: -40px;
    left: 230px;
    width: 20px;
  }
  .alert-success{
    width:10px; 
    height:10px; 
    border-radius: 5px; 
    position: absolute;
    background: #47e34c;
  }
  .alert-danger{
    width:10px; 
    height:10px; 
    border-radius: 5px;
    position: absolute; 
    background: #eb1616;
  }
</style>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script>
  let signinBtn = document.querySelector('.signinBtn');
  let signupBtn = document.querySelector('.signupBtn');
  let body = document.querySelector('body');

  signupBtn.onclick = function(){
     body.classList.add('slide');
  }

  signinBtn.onclick = function(){
     body.classList.remove('slide');
  }

  $(function(){
    $(".alert-success").hide();
    $(".alert-danger").hide();
    $(".check_password_input").keyup(function(){
        var pwd1=$("#pwd1").val();
        var pwd2=$("#pwd2").val();
        if(pwd1 != "" || pwd2 != ""){
            if(pwd1 == pwd2){
                $(".alert-danger").fadeOut(500);
                $(".alert-success").fadeIn(500);
            }else{
                $(".alert-success").fadeOut(500);
                $(".alert-danger").fadeIn(500);
            }    
        }
    });
  });

  function check(){
    let username = $("#username_for_regist").val();
    let email = $("#email_for_regist").val();
    let pwd1 = $("#pwd1").val();
    let pwd2 = $("#pwd2").val();

    if (!username) { 
      alert("username을 확인하시기 바랍니다.");
      return false;
    }
  
    if (!email) { 
      alert("email을 확인하시기 바랍니다.");
      return false;
    }

    if(!pwd1 || !pwd2 || (pwd1 != pwd2)){
      alert("비밀번호를 확인하시기 바랍니다.");
      return false;
    }

    return true;
  }

</script>
      `, '');
  response.send(html);
});

// register
router.post('/register', function (request, response) {
  var username = request.body.username;
  var email = request.body.email;
  var password = request.body.password;
  var confirm = request.body.confirm;

  if(password == confirm){
    maria.query('SELECT * FROM `MEMBER` WHERE EMAIL = ? ', [email], function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {       // db에서의 반환값이 있으면 해당 이메일이 이미 등록된것
        response.send(`<script type="text/javascript">alert("이미 가입된 이메일입니다."); 
              document.location.href="/login";</script>`);
      } else {
        let sql_member_insert = "INSERT INTO MEMBER(USERNAME,EMAIL,PASSWORD) VALUES( ?, ?, ? ); ";
    
        maria.query(sql_member_insert,
          [username, email, password],
          function (err, result) {
            if (err) {
              console.log(err);
              res.render('error', { error: err });
            } else {
              console.log("Register success!");
              response.send(`<script type="text/javascript">alert("가입되었습니다!"); 
              document.location.href="/";</script>`);
            }
          });
      }
    });
  }else{
    response.send(`<script type="text/javascript">alert("비밀번호를 확인하시기 바랍니다."); 
              document.location.href="/login";</script>`);
  }
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
              request.session.username = results[0].USERNAME;

              if(results[0].MASTER_YN == 'Y'){ // 마스터권한
                request.session.is_master = true;
              }
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