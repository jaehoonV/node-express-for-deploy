let results_lo; // 전 회차 기록
let results_lo_num_cnt; // 전 회차 통계
let results_lo_recently10; // 최근 10회차 통계
let results_lo_avg_up; // 평균 이상 통계
let results_lo_avg_down; // 평균 미만 통계
let results_lo_top25; // 많이 나온 번호(25%) 통계
let results_lo_bottom25; // 적게 나온 번호(25%) 통계

function init(){
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
        console.log(results_lo);
        console.log(results_lo_num_cnt);
        console.log(results_lo_recently10_num_cnt);
        console.log(results_lo_avg_up);
        console.log(results_lo_avg_down);
        console.log(results_lo_top25);
        console.log(results_lo_bottom25);
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

function history_toggle() {
    var style = $('#history').css("display");
    if (style == "none") {
        $('#history').css("display", "block");
    } else {
        $('#history').css("display", "none");
    }
}

function lotto_extraction() {
    let lotto = [];
    let i = 0;
    let err_cnt0 = 0;
    while (i < 6) {
        let num = Math.floor(Math.random() * 44) + 1;
        let bool = true;
        for (let j in lotto) {
            if (num == lotto[j]) {
                bool = false;
            }
        }
        /* for (let k in except_num_arr) {
            if (num == except_num_arr[k]) {
                bool = false;
            }
        } */
        if (bool) {
            lotto.push(num);
            i++;
        }
        if (err_cnt0++ > 100) {
            alert("조건을 다시 설정해주시기바랍니다.");
            break;
        }
    }

    // 정렬
    lotto.sort(function (a, b) {
        return a - b;
    });

    // 출력
    let output = "";
    for (let l = 0; l < 6; l++) {
        if (lotto[l] <= 10) {
            output += "<input class='ball10 ball_big1' value='" + lotto[l] + "'disabled>";
        } else if (lotto[l] <= 20) {
            output += "<input class='ball20 ball_big1' value='" + lotto[l] + "'disabled>";
        } else if (lotto[l] <= 30) {
            output += "<input class='ball30 ball_big1' value='" + lotto[l] + "'disabled>";
        } else if (lotto[l] <= 40) {
            output += "<input class='ball40 ball_big1' value='" + lotto[l] + "'disabled>";
        } else {
            output += "<input class='ball50 ball_big1' value='" + lotto[l] + "'disabled>";
        }
    }
    
    $('#temp').html(output);

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
            let output = '<div><span>' + json_data[i].ROUND + '회차 </span>'
                + include_check(lotto,json_data[i].NUM1)
                + include_check(lotto,json_data[i].NUM2)
                + include_check(lotto,json_data[i].NUM3)
                + include_check(lotto,json_data[i].NUM4)
                + include_check(lotto,json_data[i].NUM5)
                + include_check(lotto,json_data[i].NUM6)
                +'</div>';
            $('.history_result').append(output);
        }
    })
    .fail(function (xhr, status, errorThrown){
        alert("Ajax failed")
    })
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