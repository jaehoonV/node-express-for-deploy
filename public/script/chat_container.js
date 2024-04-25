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
        let CHAT_ROOM_NAME = chat.CHAT_ROOM_NAME;
        let MASTER_SEQ = chat.MASTER_SEQ;
        let MEMBER_SEQ = chat.MEMBER_SEQ;
        let MEMBER_NM = chat.MEMBER_NM;
        let CONTENTS = chat.CONTENTS;
        let REG_DATE = chat.REG_DATE;
        chat_result += "<div class='my_chat_list' data-seq='" + MASTER_SEQ + "'>"
                    + "<em class='chat_user'>" + MEMBER_NM + "</em>" 
                    + "<em class='chat_summary'>" + CONTENTS + "</em>"  
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
        let REG_DAY = chat.REG_DAY;
        let REG_TIME = chat.REG_TIME;
        if(chat.MINE_DIV == 'mine'){
            chat_result += "<div class='my_chat_box'>"; 
            if(chat.UNREAD_NUM != 0){
                chat_result += "<em class='em_yellow'>" + chat.UNREAD_NUM +"</em>";
            }
            chat_result += "<em>" + REG_TIME +"</em>";
            chat_result += "<span>"+ chat.CONTENTS + "</span>"
        }else{
            chat_result += "<div class='chat_box'><span>" + chat.CONTENTS + "</span>"
            if(chat.UNREAD_NUM != 0){
                chat_result += "<em class='em_yellow'>" + chat.UNREAD_NUM +"</em>";
            }
            chat_result += "<em>" + REG_TIME +"</em>";
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