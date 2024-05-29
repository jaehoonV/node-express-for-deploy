let results_log;
let results_log_act;
let results_log_move;
let results_member;

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
        results_member = json_data.results_member;
        load_log();
        load_member();
        
    })
    .fail(function (xhr, status, errorThrown){
        alert("Ajax failed")
    })
}

init();

function load_log(){
    let output = formatResult(results_log);

    $('#log_data_container').html(output);
    $('#log_table').DataTable({
        order: [[0, 'desc']],
        pageLength: 25
    });

    function formatResult(data) {
        let html = "<table id='log_table'><thead><tr><th class='f_8'>SEQ</th><th class='f_8'>EMAIL</th><th class='f_8'>USERNAME</th><th class='f_8'>EVENT</th><th class='f_8'>EVENT_IP</th><th class='f_8'>REGDAY</th></tr></thead><tbody>";
        for(let obj of data){
            html += "<tr><td class='td_w45 f_6'>" + obj.SEQ  + "</td>";   
            html += "<td class='td_w45 f_6'>" + obj.EMAIL  + "</td>";   
            html += "<td class='td_w45 f_6'>" + obj.USERNAME  + "</td>";   
            html += "<td class='td_w45 f_6'>" + obj.EVENT  + "</td>";   
            html += "<td class='td_w45 f_6'>" + obj.EVENT_IP  + "</td>";   
            html += "<td class='td_w45 f_6'>" + obj.REGDAY  + "</td></tr>";        
        }
        html += "</tbody></table>";
        return html;
    }
}

function load_member(){
    let output = formatResult(results_member);

    $('#member_data_container').html(output);
    $('#member_table').DataTable({
        order: [[0, 'asc']],
        pageLength: 10
    });

    function formatResult(data) {
        let html = "<table id='member_table'><thead><tr><th class='f_10'>MEMBER_SEQ</th><th class='f_10'>EMAIL</th><th class='f_10'>USERNAME</th><th class='f_10'>Master Authority</th><th class='f_10'>Use Authority</th></tr></thead><tbody>";
        for(let obj of data){
            html += "<tr><td class='td_w45 f_8'>" + obj.MEMBER_SEQ  + "</td>";   
            html += "<td class='td_w45 f_8'>" + obj.EMAIL  + "</td>";   
            html += "<td class='td_w45 f_8'>" + obj.USERNAME  + "</td>";   

            if(obj.MEMBER_SEQ == '1'){
                html += "<td class='td_w45 td_center f_8'>Master</td>";
                html += "<td class='td_w45 td_center f_8'>Master</td></tr>";
            }else{
                if(obj.MASTER_YN == 'Y') html += "<td class='td_w45 td_center f_8'><button type='button' class='btn revoke_btn revoke_master_btn' data-memseq='" + obj.MEMBER_SEQ +"' data-username='" + obj.USERNAME +"'>Revoke</button></td>";
                else html += "<td class='td_w45 td_center f_8'><button type='button' class='btn grant_btn grant_master_btn' data-memseq='" + obj.MEMBER_SEQ +"' data-username='" + obj.USERNAME +"'>Grant</button></td>";

                if(obj.USE_YN == 'Y') html += "<td class='td_w45 td_center f_8'><button type='button' class='btn revoke_btn revoke_use_btn' data-memseq='" + obj.MEMBER_SEQ +"' data-username='" + obj.USERNAME +"'>Revoke</button></td></tr>";
                else html += "<td class='td_w45 td_center f_8'><button type='button' class='btn grant_btn grant_use_btn' data-memseq='" + obj.MEMBER_SEQ +"' data-username='" + obj.USERNAME +"'>Grant</button></td></tr>";
            }
        }
        html += "</tbody></table>";
        return html;
    }
}

$(document).on("click",".revoke_master_btn",function(e){ 
    e.preventDefault();
    let username = $(this).data('username');
    let confirm_label = `'${username}' 유저의 관리자 권한을 취소하시겠습니까?`;
    if (confirm(confirm_label)) {
        let memseq = $(this).data('memseq');

        $.ajax({
            url : "/logPage/updateMaster",
            type : "POST",
            dataType : "JSON",
            data : {"member_seq" : memseq,
                    "username" : username,
                    "val" : "N"}
        })
        .done(function (json){
            let json_data = JSON.parse(JSON.stringify(json));
            let chk = json_data.chk;
            init();
        })
        .fail(function (xhr, status, errorThrown){
            alert("Ajax failed")
        })
    }
})

$(document).on("click",".grant_master_btn",function(e){ 
    e.preventDefault();
    let username = $(this).data('username');
    let confirm_label = `'${username}' 유저의 관리자 권한을 부여하시겠습니까?`;
    if (confirm(confirm_label)) {
        let memseq = $(this).data('memseq');

        $.ajax({
            url : "/logPage/updateMaster",
            type : "POST",
            dataType : "JSON",
            data : {"member_seq" : memseq,
                    "username" : username,
                    "val" : "Y"}
        })
        .done(function (json){
            let json_data = JSON.parse(JSON.stringify(json));
            let chk = json_data.chk;
            init();
        })
        .fail(function (xhr, status, errorThrown){
            alert("Ajax failed")
        })
    }
})

$(document).on("click",".revoke_use_btn",function(e){ 
    e.preventDefault();
    let username = $(this).data('username');
    let confirm_label = `'${username}' 유저의 계정 사용 권한을 취소하시겠습니까?`;
    if (confirm(confirm_label)) {
        let memseq = $(this).data('memseq');

        $.ajax({
            url : "/logPage/updateUse",
            type : "POST",
            dataType : "JSON",
            data : {"member_seq" : memseq,
                    "username" : username,
                    "val" : "N"}
        })
        .done(function (json){
            let json_data = JSON.parse(JSON.stringify(json));
            let chk = json_data.chk;
            init();
        })
        .fail(function (xhr, status, errorThrown){
            alert("Ajax failed")
        })
    }
})

$(document).on("click",".grant_use_btn",function(e){ 
    e.preventDefault();
    let username = $(this).data('username');
    let confirm_label = `'${username}' 유저의 계정 사용 권한을 부여하시겠습니까?`;
    if (confirm(confirm_label)) {
        let memseq = $(this).data('memseq');

        $.ajax({
            url : "/logPage/updateUse",
            type : "POST",
            dataType : "JSON",
            data : {"member_seq" : memseq,
                    "username" : username,
                    "val" : "Y"}
        })
        .done(function (json){
            let json_data = JSON.parse(JSON.stringify(json));
            let chk = json_data.chk;
            init();
        })
        .fail(function (xhr, status, errorThrown){
            alert("Ajax failed")
        })
    }
})

