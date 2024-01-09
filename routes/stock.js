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

    createLog.insertLog(req, res, 'MOVE STOCK PAGE', 'MOVE');
    res.render('stock', master_yn);
    return false;
  }
})

router.get('/popup', (req, res) => {
    if (!authCheck.isOwner(req, res)) {  // login page
        res.redirect('/login');
        return false;
    } else {
        let master_yn = {"master_yn" : authCheck.isMaster(req, res)};

        res.render('stock_popup', master_yn);
        return false;
    }
})

// 404 Error Handling
router.all('*', (req, res, next) => {
  res.status(404).render('error', { error: 404 });
});

module.exports = router;