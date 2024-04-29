let master_seq;

function init(seq){
    $.ajax({
        url : "/chat_container/",
        type : "POST",
        dataType : "JSON"
    })
    .done(function (json){
        let json_data = JSON.parse(JSON.stringify(json));
        let chat_list = json_data.results;
        let not_read_cnt = json_data.results_not_read_cnt[0].NOT_READ_CNT;
        let username = json_data.username;
        create_chat_list(chat_list, not_read_cnt, seq, username);
    })
    .fail(function (xhr, status, errorThrown){
        alert("Ajax failed")
    })
}

init();

function create_chat_list(chat_list, not_read_cnt, seq, username){
    let num = 1; // 순서
    let chat_result = "<div class='chat_list_top_div'><div class='chat_username'><span>" + username + "</span>";
    if(not_read_cnt > 0){
        chat_result += "<span class='not_read_cnt'>+ " + not_read_cnt + "</span></div>";
    }else{
        chat_result += "</div>";
    }
    chat_result += "<div><ion-icon name='add-circle-outline' class='add_chat'></ion-icon></div></div>"
                + "<div class='chat_list_div'>";
    for(let chat of chat_list){
        let CHAT_ROOM_NAME = chat.CHAT_ROOM_NAME;
        let MASTER_SEQ = chat.MASTER_SEQ;
        let MEMBER_SEQ = chat.MEMBER_SEQ;
        let MEMBER_NM = chat.MEMBER_NM;
        let CONTENTS = chat.CONTENTS;
        let USER_CNT = chat.USER_CNT;
        let REG_DATE = chat.REG_DATE;
        let UNREAD_CNT = chat.UNREAD_CNT;
        if(seq == MASTER_SEQ){
            chat_result += "<div class='my_chat_list selected' data-seq='" + MASTER_SEQ + "' data-num='" + num +"'>";
        }else{
            chat_result += "<div class='my_chat_list' data-seq='" + MASTER_SEQ + "' data-num='" + num +"'>";
        }
        chat_result += "<div class='chat_list_data1'>"

        if(USER_CNT > 1){ // 채팅 유저 수 표시
            USER_CNT++;
            if(CHAT_ROOM_NAME.length > 0){
                chat_result += "<span class='chat_user'>" + CHAT_ROOM_NAME + "<span class='chat_user_cnt'>" + USER_CNT + "</span></span>"; 
            }else{
                chat_result += "<span class='chat_user'>" + MEMBER_NM + "<span class='chat_user_cnt'>" + USER_CNT + "</span></span>";
            }
        }else{
            if(CHAT_ROOM_NAME.length > 0){
                chat_result += "<span class='chat_user'>" + CHAT_ROOM_NAME + "</span>"; 
            }else{
                chat_result += "<span class='chat_user'>" + MEMBER_NM + "</span>"; 
            }
        }

        if(REG_DATE) {
            chat_result += "<span class='chat_reg_date'>" + REG_DATE + "</span>"; 
        }
        chat_result += "</div>"
                    + "<div class='chat_list_data2'>";
        if(CONTENTS) {
            chat_result += "<span class='chat_summary'>" + CONTENTS + "</span>"; 
        }else{
            chat_result += "<span class='chat_summary'> </span>"; 
        }
        if(UNREAD_CNT > 0){
            chat_result += "<span class='chat_unread_cnt'>" + UNREAD_CNT + "</span>";
        }
        chat_result += "</div></div>"; 
        num++;
    }
    chat_result += "</div>";

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
        let UNREAD_NUM = chat.UNREAD_NUM;
        let MINE_DIV = chat.MINE_DIV;
        let USERNAME = chat.USERNAME;

        if(temp_reg_day != REG_DAY){
            chat_result += "<div class='chat_reg_day_div'><span class='chat_reg_day'>" + REG_DAY +"</span></div>"; 
            temp_reg_id = "";
        }

        if(MINE_DIV == 'sys'){
            chat_result += "<div class='system_box'><span class='system_box_span'>" + CONTENTS + "</span></div>"; 
        }else if(MINE_DIV == 'mine'){
            chat_result += "<div class='my_chat_box'>"; 
            chat_result += "<span>"+ CONTENTS + "</span>";
            chat_result += "<em>" + REG_TIME +"</em>";
            if(UNREAD_NUM != 0){
                chat_result += "<em class='em_unread_cnt'>" + UNREAD_NUM +"</em>";
            }
            chat_result += "<div class='chat_r'></div>"
        }else{
            if(temp_reg_id != REG_ID){ // 사용자명 태그 생성
                chat_result += "<div class='chat_user_box'>" + USERNAME + "</div>"; 
            }
            chat_result += "<div class='chat_box'><span>" + CONTENTS + "</span>"
            chat_result += "<em>" + REG_TIME +"</em>";
            if(UNREAD_NUM != 0){
                chat_result += "<em class='em_yellow'>" + UNREAD_NUM +"</em>";
            }
            chat_result += "<div class='chat_l'></div>"
        }
        
        
        chat_result += "</div>";
        temp_reg_id = REG_ID;
        temp_reg_day = REG_DAY;
    }

    $('#chat').html(chat_result);
    MoveFocus();
    setChatList();
}

function MoveFocus() {
    $('#chat_input').focus();
    $("#chat").scrollTop($("#chat").prop("scrollHeight"));
}

$('#chat_input').on("keydown", function(e){
    if(e.which==13){
        send_chat();
        setChatList();
    }
});

function setChatList(){
    setTimeout(() => {
        let seq = master_seq;
        init(seq);
    }, 200);
}

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
        setChat(seq);
    })
    .fail(function (xhr, status, errorThrown){
        alert("Ajax failed")
    })
}

$(document).on("click",".add_chat",function(e){ 
    e.preventDefault();
    $.ajax({
        url : "/chat_container/get_chat_users",
        type : "POST",
        dataType : "JSON"
    })
    .done(function (json){
        let json_data = JSON.parse(JSON.stringify(json));
        let chat_users = json_data.results;
        create_chat_users_list(chat_users);
    })
    .fail(function (xhr, status, errorThrown){
        alert("Ajax failed")
    })
})

function create_chat_users_list(chat_users){
    let user_result = "<ul class='create_chat_user_list_ul'>";

    for(let user of chat_users){
        let MEMBER_SEQ = user.MEMBER_SEQ;
        let EMAIL = user.EMAIL;
        let USERNAME = user.USERNAME;

        user_result += "<li class='chat_user_list_li' data-seq='" + MEMBER_SEQ + "'>" + USERNAME + "<input class='chat_user_list_chk' type='checkbox'><label></label></li>";
    }
    user_result += "</ul>";

    $('#create_chat_user_list').html(user_result);
    $("#create_chat_popup").css("display", "block");
    $("#overlay").css("display", "block");

}

$(document).on("click","#create_chat_btn",function(e){ 
    e.preventDefault();

    let chat_room_name = $("#create_chat_roomName").val();
    let chat_user_seq = [];
    let chat_user_name = "";
    $('.chat_user_list_li').each(function(index, item){
        let chk = $(item).find(".chat_user_list_chk").is(':checked');
        if(chk) {
            let seq = $(item).data('seq');
            chat_user_seq.push(seq);
            if(chat_user_name.length == 0){
                chat_user_name += $(item).text();
            }else{
                chat_user_name += (", " + $(item).text());
            }
        }
    });

    if(chat_user_seq.length == 0){
        alert("채팅할 유저를 선택해주세요!");
        return;
    }

    let chat_room_name_chk = true;
    if(chat_room_name.length == 0){
        chat_room_name_chk = confirm("채팅방 이름을 설정하지 않고 생성하겠습니까?");
    }

    if(chat_room_name_chk){
        $.ajax({
            url : "/chat_container/create",
            type : "POST",
            dataType : "JSON",
            data : {"chat_room_name" : chat_room_name,
                    "chat_user_seq" : chat_user_seq,
                    "chat_user_name" : chat_user_name}
        })
        .done(function (json){
            let json_data = JSON.parse(JSON.stringify(json));
            master_seq = json_data.master_seq;
            init(master_seq);
            setChat(master_seq);
        })
        .fail(function (xhr, status, errorThrown){
            alert("Ajax failed")
        })
        
        $('#create_chat_roomName').val('');
        $("#create_chat_popup").css("display", "none");
        $("#overlay").css("display", "none");
    }
    
})

$(document).on("click","#create_chat_close_btn, #overlay",function(e){ 
    e.preventDefault();
    $('#create_chat_roomName').val('');
    $("#create_chat_popup").css("display", "none");
    $("#overlay").css("display", "none");
})

$(document).on("click",".chat_user_list_li",function(e){ 
    e.preventDefault();
    let chk = $(this).find(".chat_user_list_chk").is(':checked');

    if(chk) $(this).find(".chat_user_list_chk").prop('checked',false);
    else $(this).find(".chat_user_list_chk").prop('checked',true);
})
