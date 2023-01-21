let results_lo; // 전 회차 기록
let results_lo_num_cnt; // 전 회차 통계
let results_lo_recently10; // 최근 10회차 통계
let results_lo_avg_up; // 평균 이상 통계
let results_lo_avg_down; // 평균 미만 통계
let results_lo_top25; // 많이 나온 번호(25%) 통계
let results_lo_bottom25; // 적게 나온 번호(25%) 통계

function init(){
    // 제외번호 버튼 출력
    let ex_num_output = "";
    for (let ex = 1; ex < 46; ex++) {
        ex_num_output += makeExBallFunc(ex);
    }

    $('#except_num').html(ex_num_output);

    $.ajax({
        url : "/lotto",
        type : "POST",
        dataType : "JSON",
        data : {"today" : new Date()}
    })
    .done(function (json){
        let json_data = JSON.parse(JSON.stringify(json));
        results_lo = json_data.results_lo;
        results_lo_num_cnt = json_data.results_lo_num_cnt;
        results_lo_recently10_num_cnt = json_data.results_lo_recently10_num_cnt;
        results_lo_avg_up = json_data.results_lo_avg_up;
        results_lo_avg_down = json_data.results_lo_avg_down;
        results_lo_top25 = json_data.results_lo_top25;
        results_lo_bottom25 = json_data.results_lo_bottom25;
        
        for(let i = 1; i <= 6; i++){
            lo_func(i);
        }
        lo_record();
        
    })
    .fail(function (xhr, status, errorThrown){
        alert("Ajax failed")
    })
}

init();

function lo_record(){
    let output = "";

    output += "<table class='table2'><th>회차</th><th>번호</th><th>번호</th><th>번호</th><th>번호</th><th>번호</th><th>번호</th>"
            + "<th>보너스번호</th><th>1등 당첨금</th><th>1등 당첨자수</th><th>2등 당첨금</th><th>2등 당첨자수</th><th>일자</th>";
    for(let obj of results_lo){
        if(obj.PRIZE1 > 2500000000 && obj.PRIZE1 < 5000000000){
            output += "<tr class='prize25up'>";
        } else if(obj.PRIZE1 > 5000000000){
            output += "<tr class='prize50up'>";
        } else {
            output += "<tr>";
        }
        output += "<td class='td_w45 f_8'>" + obj.ROUND  + "</td>";
        output += makeSmallBallFunc(obj.NUM1);        
        output += makeSmallBallFunc(obj.NUM2);        
        output += makeSmallBallFunc(obj.NUM3);        
        output += makeSmallBallFunc(obj.NUM4);        
        output += makeSmallBallFunc(obj.NUM5);        
        output += makeSmallBallFunc(obj.NUM6);        
        output += makeSmallBallFunc(obj.NUMB);        
        output += "<td class='td_w90 f_8'>" + obj.PRIZE1_ + "</td>";        
        output += "<td class='td_w80 f_8'>" + obj.PRIZE1CNT + "</td>";        
        output += "<td class='td_w90 f_8'>" + obj.PRIZE2_ + "</td>";        
        output += "<td class='td_w80 f_8'>" + obj.PRIZE2CNT + "</td>";        
        output += "<td class='td_w150 f_8'>" + obj.ROUND_DATE + "</td></tr>";        
    }
    output += "</table>";

    $('#history').html(output);
}

function lo_func(type){
    let output = "";
    let temp_arr;
    switch(type){
        case 1 : temp_arr = results_lo_num_cnt; break;
        case 2 : temp_arr = results_lo_recently10_num_cnt; break;
        case 3 : temp_arr = results_lo_avg_up; break;
        case 4 : temp_arr = results_lo_top25; break;
        case 5 : temp_arr = results_lo_avg_down; break;
        case 6 : temp_arr = results_lo_bottom25; break;
    }

    for(let obj of temp_arr){
        output += "<div class='div_wrap'>";
        output += makeBallFunc(obj.NUM);
        output += "<span> " + obj.NUM_CNT + "회 </span>"; 
        output += "</div>";      
    }

    switch(type){
        case 1 : $('#lo_cnt').html(output); break;
        case 2 : $('#10round_cnt').html(output); break;
        case 3 : $('#above_average').html(output); break;
        case 4 : $('#above_25').html(output); break;
        case 5 : $('#below_average').html(output); break;
        case 6 : $('#below_25').html(output); break;
    }
}

function makeSmallBallFunc(n){
    let output = "<td class='td_w50'>";
    if(n <= 10){
        output += "<input class='ball10 ball_small1' value=" + n + " disabled>";
    } else if(n <= 20){
        output += "<input class='ball20 ball_small1' value=" + n + " disabled>";
    } else if(n <= 30){
        output += "<input class='ball30 ball_small1' value=" + n + " disabled>";
    } else if(n <= 40){
        output += "<input class='ball40 ball_small1' value=" + n + " disabled>";
    } else if(n <= 50){
        output += "<input class='ball50 ball_small1' value=" + n + " disabled>";
    }
    output += "</td>";
    return output;
}

function makeBallFunc(n){
    let output = "";
    if(n <= 10){
        output += "<input class='ball10 ball' value=" + n + " disabled>";
    } else if(n <= 20){
        output += "<input class='ball20 ball' value=" + n + " disabled>";
    } else if(n <= 30){
        output += "<input class='ball30 ball' value=" + n + " disabled>";
    } else if(n <= 40){
        output += "<input class='ball40 ball' value=" + n + " disabled>";
    } else if(n <= 50){
        output += "<input class='ball50 ball' value=" + n + " disabled>";
    }
    return output;
}

function makeExBallFunc(n){
    let output = "";
    if(n <= 10){
        output += "<input type='button' class='ball10 ball ex_num' value=" + n + ">";
    } else if(n <= 20){
        output += "<input type='button' class='ball20 ball ex_num' value=" + n + ">";
    } else if(n <= 30){
        output += "<input type='button' class='ball30 ball ex_num' value=" + n + ">";
    } else if(n <= 40){
        output += "<input type='button' class='ball40 ball ex_num' value=" + n + ">";
    } else if(n <= 50){
        output += "<input type='button' class='ball50 ball ex_num' value=" + n + ">";
    }
    return output;
}

function history_toggle() {
    var style = $('#history').css("display");
    if (style == "none") {
        $('#history').css("display", "block");
    } else {
        $('#history').css("display", "none");
    }
}

// 제외 번호
let except_num_arr = [];

function lotto_extraction() {
    const select_op_val = $('#op_value').val();
    let lotto = [];
    let err_cnt0 = 0;
    let op_cnt = 0;

    // 번호 입력 처리
    $('.op_val').each(function(){
        let temp = $(this).val();
        if(!lotto.includes(temp) && temp > 0 && temp <= 45){
            lotto[op_cnt++] = Number(temp); // 숫자 처리 필수
        }
    });

    let i = op_cnt;

    switch (select_op_val) {
        case "0": // 랜덤 추출
            while (i < 6) {
                let num = Math.floor(Math.random() * 44) + 1;
                let bool = true;
                for (let j in lotto) {
                    if (num == lotto[j]) {
                        bool = false;
                    }
                }
                for (let k in except_num_arr) {
                    if (num == except_num_arr[k]) {
                        bool = false;
                    }
                }
                if (bool) {
                    lotto.push(num);
                    i++;
                }
                if (err_cnt0++ > 100) {
                    alert("조건을 다시 설정해주시기바랍니다.");
                    break;
                }
            }
        break;
        case "1": // 평균보다 많이 나온 번호
            lotto = option_extraction(i, results_lo_avg_up, lotto);
        break;
        case "2": // 많이 나온 번호(25%)
            lotto = option_extraction(i, results_lo_top25, lotto);
        break;
        case "3": // 평균보다 적게 나온 번호
            lotto = option_extraction(i, results_lo_avg_down, lotto);
        break;
        case "4": // 적게 나온 번호(25%)
            lotto = option_extraction(i, results_lo_bottom25, lotto);
        break;
        case "5": // 최근 10회차 번호
            lotto = option_extraction(i, results_lo_recently10_num_cnt, lotto);
        break;
    }

    // 정렬
    lotto.sort(function (a, b) {
        return a - b;
    });

    // 출력
    let output = "";
    for (let l = 0; l < 6; l++) {
        if (lotto[l] <= 10) {
            output += "<input class='ball10 ball_big1 tra-effect' value='" + lotto[l] + "'disabled>";
        } else if (lotto[l] <= 20) {
            output += "<input class='ball20 ball_big1 tra-effect' value='" + lotto[l] + "'disabled>";
        } else if (lotto[l] <= 30) {
            output += "<input class='ball30 ball_big1 tra-effect' value='" + lotto[l] + "'disabled>";
        } else if (lotto[l] <= 40) {
            output += "<input class='ball40 ball_big1 tra-effect' value='" + lotto[l] + "'disabled>";
        } else {
            output += "<input class='ball50 ball_big1 tra-effect' value='" + lotto[l] + "'disabled>";
        }
    }
    
    $('#pick_num').html(output);

    $('.history_result').html(''); // 초기화
    
    $.ajax({
        url : "/extraction",
        type : "POST",
        dataType : "JSON",
        data : {"num1" : lotto[0], "num2" : lotto[1], "num3" : lotto[2], "num4" : lotto[3], "num5" : lotto[4], "num6" : lotto[5]}
    })
    .done(function (json){
        let json_data = JSON.parse(JSON.stringify(json));
        for(let i = 0; i < json_data.length; i++){
            let output = '<div class="tra-effect"><span class="history_result_span">' + json_data[i].ROUND + '회차 </span>'
                + include_check(lotto,json_data[i].NUM1)
                + include_check(lotto,json_data[i].NUM2)
                + include_check(lotto,json_data[i].NUM3)
                + include_check(lotto,json_data[i].NUM4)
                + include_check(lotto,json_data[i].NUM5)
                + include_check(lotto,json_data[i].NUM6)
                + '<span>&nbsp;&nbsp;</span>'
                + include_check(lotto,json_data[i].NUMB)
                +'<span> ' + json_data[i].RANK + '</span></div>';
            $('.history_result').append(output);
        }
    })
    .fail(function (xhr, status, errorThrown){
        alert("Ajax failed")
    })
}

function option_extraction(i, option_arr, lotto){
    let option_lotto = lotto;
    let err_cnt0 = 0;
    while (i < 6) {
        let arr = option_arr[Math.floor(Math.random() * option_arr.length)];
        let bool = true;
        for (let j in option_lotto) {
            if (arr.NUM == option_lotto[j]) {
                bool = false;
            }
        }
        for (let k in except_num_arr) {
            if (arr.NUM == except_num_arr[k]) {
                bool = false;
            }
        }
        if (bool) {
            option_lotto.push(arr.NUM);
            i++;
        }
        if (err_cnt0++ > 100) {
            alert("조건을 다시 설정해주시기바랍니다.");
            break;
        }
    }
    return option_lotto;
}

function include_check(lotto, num){
    if(lotto.includes(num)){
        if (num <= 10) {
            return "<input class='ball10 ball' value='" + num + "'disabled>";
        } else if (num <= 20) {
            return "<input class='ball20 ball' value='" + num + "'disabled>";
        } else if (num <= 30) {
            return "<input class='ball30 ball' value='" + num + "'disabled>";
        } else if (num <= 40) {
            return "<input class='ball40 ball' value='" + num + "'disabled>";
        } else {
            return "<input class='ball50 ball' value='" + num + "'disabled>";
        }
    }
    return "<input class='ball10 ball not_include_ball' value='" + num + "'disabled>";
}

function save_num() {
    let newDiv = $("<div></div>");
    newDiv.append($('#pick_num').html());
    $('#save_box').append(newDiv);
 }

// 드롭다운 옵션
window.onload = function () {
    $('.optionItem').click(function () {
        $('#op_value').val($(this).val());
        $('.label').html($(this).html());
        $('.selectBox').removeClass('active');
    })

    $('.label').click(function () {
        if ($('.selectBox').hasClass('active')) {
            $('.selectBox').removeClass('active');
        } else {
            $('.selectBox').addClass('active');
        }
    });
}

// 제외번호
$(document).on("click",".ex_num",function(e){ 
    e.preventDefault();
    if ($(this).hasClass('ex_active')) {
        $(this).removeClass('ex_active');
        except_num_arr = except_num_arr.filter((element) => element !== this.value);
        $('#except_num_input').val(except_num_arr);
    } else {
        $(this).addClass('ex_active');
        except_num_arr.push(this.value);
        $('#except_num_input').val(except_num_arr);
    }
})