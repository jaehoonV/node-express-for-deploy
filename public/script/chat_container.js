let master_seq;

function init(){
    $.ajax({
        url : "/chat_container/",
        type : "POST",
        dataType : "JSON"
    })
    .done(function (json){
        let json_data = JSON.parse(JSON.stringify(json));
        let chat_list = json_data.results;
        create_chat_list(chat_list);
    })
    .fail(function (xhr, status, errorThrown){
        alert("Ajax failed")
    })
}

init();

function create_chat_list(chat_list){
    let chat_result = "";
    for(let chat of chat_list){
        let chat_room_name = chat.chat_room_name;
        let master_seq = chat.master_seq;
        let member_seq = chat.member_seq;
        let member_nm = chat.member_nm;
        let contents = chat.contents;
        let reg_date = chat.reg_date;
        chat_result += "<div class='my_chat_list' data-seq='" + master_seq + "'>"
                    + "<em class='chat_user'>" + member_nm + "</em>" 
                    + "<em class='chat_summary'>" + contents + "</em>" 
                    + "</div>"; 
    }

    $('#chat_list_container').html(chat_result);
}

$(document).on("click",".my_chat_list",function(e){ 
    e.preventDefault();
    master_seq = $(this).data('seq');
    setChat(master_seq);
})

function setChat(seq){
    $('#chat_input').val('');
    $.ajax({
        url : "/chat_container/chat_contents",
        type : "POST",
        dataType : "JSON",
        data : {"master_seq" : seq}
    })
    .done(function (json){
        let json_data = JSON.parse(JSON.stringify(json));
        let chat_contents = json_data.results;
        create_chat_container(chat_contents);
    })
    .fail(function (xhr, status, errorThrown){
        alert("Ajax failed")
    })
}

function create_chat_container(chat_contents){
    let chat_result = "";

    for(let chat of chat_contents){
        let reg_day = chat.reg_day;
        let reg_time = chat.reg_time;
        if(chat.mine_div == 'mine'){
            chat_result += "<div class='my_chat_box'>"; 
            if(chat.unread_num != 0){
                chat_result += "<em class='em_yellow'>" + chat.unread_num +"</em>";
            }
            chat_result += "<em>" + reg_time +"</em>";
            chat_result += "<span>"+ chat.contents + "</span>"
        }else{
            chat_result += "<div class='chat_box'><span>" + chat.contents + "</span>"
            if(chat.unread_num != 0){
                chat_result += "<em class='em_yellow'>" + chat.unread_num +"</em>";
            }
            chat_result += "<em>" + reg_time +"</em>";
        }
        chat_result += "</div>";
    }

    $('#chat').html(chat_result);
    MoveFocus();
}

function MoveFocus() {
    $('#chat_input').focus();
}

$('#chat_input').on("keydown", function(e){
    if(e.which==13){
        send_chat();
    }
});

function send_chat(){
    let contents = $('#chat_input').val();
    let seq = master_seq;
    $.ajax({
        url : "/chat_container/insert",
        type : "POST",
        dataType : "JSON",
        data : {"master_seq" : seq,
                "contents" : contents}
    })
    .done(function (json){
        let json_data = JSON.parse(JSON.stringify(json));
        let chk = json_data.chk;
        console.log(chk);
        setChat(seq);
    })
    .fail(function (xhr, status, errorThrown){
        alert("Ajax failed")
    })
}