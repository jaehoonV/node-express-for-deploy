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
        createLog.insertLog(req, res, 'MOVE MYWORKLIST PAGE', 'MOVE');
        res.render('myWorkList');
        return false;
    }
})

// 404 Error Handling
router.all('*', (req, res, next) => {
    res.status(404).render('error',{ error: 404 });
});

module.exports = router;