const maria = require('mysql'); // mysql 모듈 로드

const connection = maria.createConnection({  // mysql 접속 설정
    host: 'svc.gksl2.cloudtype.app',
    port: '30383',
    user: 'root',
    password: '1032',
    database: 'color_memo',
    multipleStatements : true
});

module.exports = connection;
