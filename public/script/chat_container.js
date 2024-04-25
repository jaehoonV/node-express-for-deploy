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
    let chat_result = "<div class='chat_list_top_div'><div><span>Test</spam></div>"
                    + "<div><ion-icon name='add-circle-outline' class='add_chat'></ion-icon></div></div>";
    for(let chat of chat_list){
        let CHAT_ROOM_NAME = chat.CHAT_ROOM_NAME;
        let MASTER_SEQ = chat.MASTER_SEQ;
        let MEMBER_SEQ = chat.MEMBER_SEQ;
        let MEMBER_NM = chat.MEMBER_NM;
        let CONTENTS = chat.CONTENTS;
        let REG_DATE = chat.REG_DATE;
        let UNREAD_CNT = chat.UNREAD_CNT;
        chat_result += "<div class='my_chat_list' data-seq='" + MASTER_SEQ + "'>"
                    + "<div class='chat_list_data1'>"
                    + "     <span class='chat_user'>" + MEMBER_NM + "</span>" 
                    + "     <span class='chat_reg_date'>" + REG_DATE + "</span>" 
                    + "</div>"
                    + "<div class='chat_list_data2'>"
                    + "     <span class='chat_summary'>" + CONTENTS + "</span>" ;
            if(UNREAD_CNT > 0){
            chat_result += "<span class='chat_unread_cnt'>" + UNREAD_CNT + "</span>";
            }
        chat_result += "</div></div>";  
    }

    $('#chat_list_container').html(chat_result);
}

$(document).on("click",".my_chat_list",function(e){ 
    e.preventDefault();
    $('.my_chat_list').each(function(index, item){
        $(item).removeClass('selected');
    });
    $(this).addClass('selected');
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
    let temp_reg_id = "";
    let temp_reg_day = "";

    for(let chat of chat_contents){
        let CONTENTS = chat.CONTENTS;
        let REG_ID = chat.REG_ID;
        let REG_DATE = chat.REG_DATE;
        let REG_DAY = chat.REG_DAY;
        let REG_TIME = chat.REG_TIME;
        let MINE_DIV = chat.MINE_DIV;
        let UNREAD_NUM = chat.UNREAD_NUM;
        let USERNAME = chat.USERNAME;

        if(temp_reg_day != REG_DAY){
            chat_result += "<div class='chat_reg_day_div'><span class='chat_reg_day'>" + REG_DAY +"</span></div>"; 
        }

        if(MINE_DIV == 'mine'){
            chat_result += "<div class='my_chat_box'>"; 
            if(UNREAD_NUM != 0){
                chat_result += "<em class='em_unread_cnt'>" + UNREAD_NUM +"</em>";
            }
            chat_result += "<em>" + REG_TIME +"</em>";
            chat_result += "<span>"+ CONTENTS + "</span>"
        }else{
            if(temp_reg_id != REG_ID){ // 사용자명 태그 생성
                chat_result += "<div class='chat_user_box'>" + USERNAME + "</div>"; 
            }
            chat_result += "<div class='chat_box'><span>" + CONTENTS + "</span>"
            if(UNREAD_NUM != 0){
                chat_result += "<em class='em_yellow'>" + UNREAD_NUM +"</em>";
            }
            chat_result += "<em>" + REG_TIME +"</em>";
        }
        chat_result += "</div>";
        temp_reg_id = REG_ID;
        temp_reg_day = REG_DAY;
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