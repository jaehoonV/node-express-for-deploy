module.exports = {
    insertLog: function (req, res, event, event_type) {
        var requestIp = require('request-ip');

        // mariaDB Connection
        const maria = require('../../ext/conn_mariaDB');

        let sql_insert_log = "INSERT INTO EVENT_LOG(SEQ,EMAIL,USERNAME,EVENT,EVENT_TYPE,EVENT_IP,REGDAY) "
                        + "SELECT COALESCE(MAX(SEQ), 0) + 1, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP FROM color_memo.EVENT_LOG;";
        let req_email = "";
        let req_username = "";

        if(req.session){
            if (req.session.is_logined) {
                req_email = req.session.email;
                req_username = req.session.username;
            }
        }

        maria.query(sql_insert_log,
            [req_email, req_username, event, event_type, requestIp.getClientIp(req)], 
            function (err, log_result) {
            if (err) {
                console.log(err);
                res.render('error', {error: err});
            } else{
                console.log("'" + event + "' Log inserted!");
            }
        });
    }

}