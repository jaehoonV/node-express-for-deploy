module.exports = {
    HTML: function (title, body, authStatusUI) {
      return `
      <!doctype html>
      <html>
      <head>    
        <title>${title}</title>
        <meta charset="utf-8">
        <style>
        @import url('https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap');
        * {
           margin: 0;
           padding: 0;
           box-sizing: border-box;
           font-family: 'Poppins', sans-serif;
        }
        
        body {
           display: flex;
           justify-content: center;
           align-items: center;
           min-height: 100vh;
           background: #53c4f8;
           transition: 1s;
        }
        
        .slide{
           background: #f56271;
        }
        
        .container{
           position: relative;
           width: 800px;
           height: 400px;
           background: rgba(0, 0, 0, 0.125);
           display: flex;
           justify-content: center;
           align-items: center;
           border-radius: 10px;
        }
        
        .container .box{
           position: relative;
           width: 50%;
           height: 100%;
           z-index: 10;
           display: flex;
           justify-content: center;
           align-items: center;
           flex-direction: column;
           padding: 40px;
        }
        
        .container .box h2{
           color: #fff;
           font-size: 1.2em;
           font-weight: 500;
           margin-bottom: 10px;
        }
        
        .container .box button{
           cursor: pointer;
           padding: 10px 20px;
           background: #fff;
           color: #333;
           font-size: 16px;
           font-weight: 500;
           border: none;
           outline: none;
           border-radius: 5px;
        }
        
        .formBx{
           position: absolute;
           left: 50px;
           width: 350px;
           height: 440px;
           background: #fff;
           z-index: 100;
           box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
           transition: 0.7s;
           transition-delay: 0.3s;
           overflow: hidden;
           border-radius: 10px;
        }
        
        .slide .formBx{
           left: 400px;
        }
        
        .formBx .form{
           position: absolute;
           top: 0;
           left: 0;
           width: 100%;
           height: 100%;
           display: flex;
           justify-content: center;
           align-items: center;
           transition: 0.5s;
           background: #fff;
        }
        
        .formBx .form.signupform{
           top: 100%;
           transition-delay: 0s;
        }
        
        .slide .formBx .form.signupform{
           top: 0;
           transition-delay: 0.8s;
        }
        
        .formBx .form.signinform{
           top: 0;
           transition-delay: 0.8s;
        }
        
        .slide .formBx .form.signinform{
           top: -100%;
           transition-delay: 0s;
        }
        
        .formBx .form form{
           display: flex;
           flex-direction: column;
           padding: 0 50px;
           width: 100%;
        }
        
        .formBx .form form h3{
           font-size: 1.4em;
           color: #333;
           margin-bottom: 20px;
           font-weight: 600;
        }
        
        .formBx .form form input{
           width: 100%;
           margin-bottom: 15px;
           padding: 10px;
           outline: none;
           font-size: 0.8em;
           border: 1px solid #333;
           letter-spacing: 0.1em;
           border-radius: 3px;
        }
        
        .formBx .form form input[type="submit"]{
           background: #53c4f8;
           border: none;
           color #fff;
           max-width: 100px;
           cursor: pointer;
           font-weight: 600;
        }
        
        .formBx .signupform form input[type="submit"]{
           background: #f56271;
        }
        
        .forgot{
           color: #333;
           letter-spacing: 0.05em;
           font-size: 0.8em;
        }
      </style>
      </head>
      <body>
        <div class="background">
          ${authStatusUI}
          ${body}
        </div>
      </body>
      </html>
      `;
    }
  }