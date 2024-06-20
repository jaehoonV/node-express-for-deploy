$('#side_chat_container').addClass('li_active');

let master_seq;

/**
 * 채팅방 데이터를 조회한다.(초기 세팅)
 * @param {String} seq 채팅방 seq
 */
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
        refresh_not_read_cnt();
    })
    .fail(function (xhr, status, errorThrown){
        alert("Ajax failed");
    })
}

init();

/**
 * 채팅방 데이터를 세팅한다.
 * @param {Array} chat_list 채팅방 데이터
 * @param {String} not_read_cnt 읽지않은 전체 채팅수 
 * @param {String} seq 채팅방 seq
 * @param {String} username 사용자명
 */
function create_chat_list(chat_list, not_read_cnt, seq, username){
    let num = 1; // 순서
    let chat_result = "";
    for(let chat of chat_list){
        let CHAT_ROOM_NAME = chat.CHAT_ROOM_NAME;
        let MASTER_SEQ = chat.MASTER_SEQ;
        let MEMBER_SEQ = chat.MEMBER_SEQ;
        let MEMBER_NM = chat.MEMBER_NM;
        let FULL_MEMBER_NM = chat.FULL_MEMBER_NM;
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
                chat_result += "<span class='chat_user' title='" + FULL_MEMBER_NM + "'>" + CHAT_ROOM_NAME + "<span class='chat_user_cnt'>" + USER_CNT + "</span></span>"; 
            }else{
                chat_result += "<span class='chat_user' title='" + FULL_MEMBER_NM + "'>" + MEMBER_NM + "<span class='chat_user_cnt'>" + USER_CNT + "</span></span>";
            }
        }else{
            if(CHAT_ROOM_NAME.length > 0){
                chat_result += "<span class='chat_user' title='" + FULL_MEMBER_NM + "'>" + CHAT_ROOM_NAME + "</span>"; 
            }else{
                chat_result += "<span class='chat_user' title='" + FULL_MEMBER_NM + "'>" + MEMBER_NM + "</span>"; 
            }
        }

        if(REG_DATE) {
            chat_result += "<span class='chat_reg_date'>" + REG_DATE + "</span>"; 
        }
        chat_result += "</div>"
                    + "<div class='chat_list_data2'>";
        if(CONTENTS) {
            chat_result += "<span class='chat_summary'>" + escapeFunc(CONTENTS) + "</span>"; 
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

    $('.chat_list_div').html(chat_result);
}

$(document).on("click",".my_chat_list",function(e){ 
    e.preventDefault();
    $('.my_chat_list').each(function(index, item){
        $(item).removeClass('selected');
    });
    $(this).addClass('selected');

    if(master_seq == $(this).data('seq')){
        return;
    }
    master_seq = $(this).data('seq');
    setChat(master_seq, 1);
})

/**
 * 채팅 데이터를 조회한다.
 * @param {Array} seq 채팅방 seq
 * @param {String} div 후처리 구분
 */
function setChat(seq, div){ 
    $('#chat_input').val('');
    if(div == 1){
        $('#chat_container').css('visibility', 'hidden');
        $('#chat').css('padding', '0px');
        $('#chat').css('height', '0px');
    }
    
    $.ajax({
        url : "/chat_container/chat_contents",
        type : "POST",
        dataType : "JSON",
        data : {"master_seq" : seq}
    })
    .done(function (json){
        let json_data = JSON.parse(JSON.stringify(json));
        let chat_contents = json_data.results;
        create_chat_container(chat_contents, div);
    })
    .fail(function (xhr, status, errorThrown){
        alert("Ajax failed")
    })
}

/**
 * 채팅 데이터를 세팅한다. 
 * @param {Array} chat_contents 채팅 데이터
 * @param {String} div 후처리 구분
 */
function create_chat_container(chat_contents, div){
    $('#chat').html(""); // 채팅 초기화
    let chat_result = "";
    let temp_reg_id = "";
    let temp_reg_day = "";
    let temp_reg_time = "";

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
            chat_result += "<div class='system_box'><span class='system_box_span'>" + escapeFunc(CONTENTS) + "</span></div>"; 
        }else if(MINE_DIV == 'mine'){
            chat_result += "<div class='my_chat_box'>"; 
            chat_result += "<span>"+ escapeFunc(CONTENTS) + "</span>";
            chat_result += "<em>" + REG_TIME +"</em>";
            if(UNREAD_NUM != 0){
                chat_result += "<em class='em_unread_cnt'>" + UNREAD_NUM +"</em>";
            }
            chat_result += "<div class='chat_r'></div>"
        }else{
            if(temp_reg_id != REG_ID || temp_reg_time != REG_TIME){ // 사용자명 태그 생성 (사용자 ID가 다른 경우, 채팅 시간이 다른 경우)
                chat_result += "<div class='chat_user_box'>" + USERNAME + "</div>"; 
            }
            chat_result += "<div class='chat_box'><span>" + escapeFunc(CONTENTS) + "</span>"
            chat_result += "<em>" + REG_TIME +"</em>";
            if(UNREAD_NUM != 0){
                chat_result += "<em class='em_yellow'>" + UNREAD_NUM +"</em>";
            }
            chat_result += "<div class='chat_l'></div>"
        }
        
        
        chat_result += "</div>";
        temp_reg_id = REG_ID;
        temp_reg_day = REG_DAY;
        temp_reg_time = REG_TIME;
    }

    if(div == 0){
        $('#chat').html(chat_result);
        MoveFocus();
    }else{
        setTimeout(() => {
            $('#chat_container').css('visibility', 'visible');
            $('#chat').css('height', '602px');
            $('#chat').css('padding', '5px');
            $('#chat').html(chat_result);
            MoveFocus();
        }, 500);
    }
    
    if(div == 0){ // div가 0이면 채팅목록 전체 새로고침
        setChatList();
    }else{
        refresh_chat(); // 해당하는 채팅방 unread_cnt 제거
    }
    
}

function MoveFocus() {
    $('#chat_input').focus();
    $("#chat").scrollTop($("#chat").prop("scrollHeight"));
}

$('#chat_input').on("keydown", function(e){
    if (e.altKey && e.keyCode === 13) { // Alt key + Enter key is pressed
        $('#chat_input').blur();
        $('#chat_input').val($('#chat_input').val() + "\n");
        $('#chat_input').focus();
        e.preventDefault();
    }else if(e.which===13){
        e.preventDefault();
        if(!master_seq){
            return;
        }
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

function refresh_chat(){
    setTimeout(() => {
        let seq = master_seq;
        refresh_selected_chat_list(seq);
        refresh_not_read_cnt();
    }, 200);
}

/**
 * 선택된 채팅방의 읽지않은 채팅수를 제거한다. 
 * @param {String} seq 채팅방 seq
 */
function refresh_selected_chat_list(seq){
    $('.my_chat_list').each(function(index, item){
        if($(item).hasClass('selected')){
            $(item).find('.chat_unread_cnt').remove();
        }
    });
}

/**
 * 읽지않은 전체 채팅수를 조회하고 세팅한다. 
 */
function refresh_not_read_cnt(){
    $.ajax({
        url : "/chat_container/select_not_read_cnt",
        type : "POST",
        dataType : "JSON",
    })
    .done(function (json){
        let json_data = JSON.parse(JSON.stringify(json));
        let not_read_cnt = json_data.results.NOT_READ_CNT;

        if(not_read_cnt > 0){
            $('.not_read_cnt_span').html("<span class='not_read_cnt'>+ " + not_read_cnt + "</span>");
        }
        
    })
    .fail(function (xhr, status, errorThrown){
        alert("Ajax failed")
    })
}

/**
 * 채팅을 저장한다. 
 */
function send_chat(){
    let contents = $('#chat_input').val();
    if(contents.length > 0){
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
            setChat(seq, 0);
        })
        .fail(function (xhr, status, errorThrown){
            alert("Ajax failed")
        })
    }
    
}

$(document).on("click",".add_chat",function(e){ 
    e.preventDefault();
    select_chat_users_list();
})

/**
 * 전체 채팅 유저 목록을 조회한다. 
 */
function select_chat_users_list(){
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
}

/**
 * 전체 채팅 유저 목록을 세팅한다. 
 * @param {Array} chat_users 전체 채팅 유저
 */
function create_chat_users_list(chat_users){
    let user_result = "<ul class='create_chat_user_list_ul'>";

    for(let user of chat_users){
        let MEMBER_SEQ = user.MEMBER_SEQ;
        let EMAIL = user.EMAIL;
        let USERNAME = user.USERNAME;

        user_result += "<li class='chat_user_list_li' data-seq='" + MEMBER_SEQ + "'><span class='chat_user_name_span'>" + USERNAME + "</span><input class='chat_user_list_chk' type='checkbox'><label></label></li>";
    }
    user_result += "</ul>";

    $('#create_chat_user_list').html(user_result);
    effect_show("create_chat_popup");
    effect_show("overlay");

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
            setChat(master_seq, 0);
        })
        .fail(function (xhr, status, errorThrown){
            alert("Ajax failed")
        })
        
        $('#create_chat_roomName').val('');
        effect_hide("create_chat_popup");
        effect_hide("overlay");
    }
    
})

$(document).on("click","#create_chat_close_btn, #overlay",function(e){ 
    e.preventDefault();
    $('#create_chat_roomName').val('');
    effect_hide("create_chat_popup");
    effect_hide("overlay");
})

$(document).on("click",".chat_user_list_li",function(e){ 
    e.preventDefault();
    let chk = $(this).find(".chat_user_list_chk").is(':checked');

    if(chk) $(this).find(".chat_user_list_chk").prop('checked',false);
    else $(this).find(".chat_user_list_chk").prop('checked',true);
})

/**
 * 해당 id를 가진 요소의 투명도를 1로 설정한다.
 * @param {String} id 아이디
 */
function effect_show(id) {
    let target = $("#"+id);
    if(target != null){
        target.css("visibility", "visible");
        setTimeout(() => {
            target.css("opacity", "1");
        }, 10);
    }
}

/**
 * 해당 id를 가진 요소의 투명도를 0으로 설정한다.
 * @param {String} id 아이디
 */
function effect_hide(id) {
    let target = $("#"+id);
    if(target != null){
        target.css("visibility", "hidden");
        setTimeout(() => {
            target.css("opacity", "0");
        }, 10);
    }
}

/**
 * 해당 문자열의 특수문자 처리를 한다.
 * @param {String} str 특수문자 처리될 문자열
 * @returns {String} escapedStr 특수문자 처리된 문자열
 */
function escapeFunc(str) {
    // '<br>'을 제외하고 '<'와 '>'를 이스케이핑한다.
    let escapedStr = str.replace(/<(?!br\s*\/?>)[^>]*>/gi, function(match) {
        return match.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    });
    return escapedStr;
}
