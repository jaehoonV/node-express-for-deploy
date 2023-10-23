let results_log;
let results_log_act;
let results_log_move;

function init(){
    $.ajax({
        url : "/logPage/",
        type : "POST",
        dataType : "JSON",
        data : {"today" : new Date()}
    })
    .done(function (json){
        let json_data = JSON.parse(JSON.stringify(json));
        results_log = json_data.results_log;
        results_log_act = json_data.results_log_act;
        results_log_move = json_data.results_log_move;
        load_log();

    })
    .fail(function (xhr, status, errorThrown){
        alert("Ajax failed")
    })
}

init();

function load_log(){
    $('#log_container_page').pagination({
        dataSource: results_log,
        pageSize: 10,
        callback: function(data, pagination) {
            // template method of yourself
            var html = formatResult(data);
            $('#log_data_container').html(html);
        }
    })

    $('#log_act_container_page').pagination({
        dataSource: results_log_act,
        pageSize: 10,
        callback: function(data, pagination) {
            // template method of yourself
            var html = formatResult(data);
            $('#log_act_data_container').html(html);
        }
    })

    $('#log_move_container_page').pagination({
        dataSource: results_log_move,
        pageSize: 10,
        callback: function(data, pagination) {
            // template method of yourself
            var html = formatResult(data);
            $('#log_move_data_container').html(html);
        }
    })

    function formatResult(data) {
        let html = "<table class='table2'><th>SEQ</th><th>EMAIL</th><th>USERNAME</th><th>EVENT</th><th>EVENT_IP</th><th>REGDAY</th><tr>";
        for(let obj of data){
            html += "<td class='td_w45 f_8'>" + obj.SEQ  + "</td>";   
            html += "<td class='td_w45 f_8'>" + obj.EMAIL  + "</td>";   
            html += "<td class='td_w45 f_8'>" + obj.USERNAME  + "</td>";   
            html += "<td class='td_w45 f_8'>" + obj.EVENT  + "</td>";   
            html += "<td class='td_w45 f_8'>" + obj.EVENT_IP  + "</td>";   
            html += "<td class='td_w45 f_8'>" + obj.REGDAY  + "</td></tr>";        
        }
        html += "</table>";
        return html;
    }
}