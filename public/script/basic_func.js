export function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

/* make color td function */
export function make_color_td(val, num){
    if(val < 0){
        return "<td class='tag_minus_blue'>" + num + "</td>";
    }else if(val > 0){
        return "<td class='tag_plus_red'>" + num + "</td>";
    }else{
        return "<td class='tag_none'>" + num + "</td>";
    }
}
/* make color td function */

/* 틱 계산 */
export function tick_cal(price){
    let val = 1;
    if(price < 2000){
        val = 1;
    }else if(price >= 2000 && price < 5000){
        val = 5;
    }else if(price >= 5000 && price < 10000){
        val = 10;
    }else if(price >= 10000 && price < 20000){
        val = 10;
    }else if(price >= 20000 && price < 50000){
        val = 50;
    }else if(price >= 50000 && price < 100000){
        val = 100;
    }else if(price >= 100000 && price < 200000){
        val = 100;
    }else if(price >= 200000 && price < 500000){
        val = 500;
    }else if(price >= 500000){
        val = 1000;
    }
    return val;
}
/* 틱 계산 */

/* yyyymmdd => yyyy년 mm월 dd일 */
export function dateForamt(date_str)
{
    let yyyyMMdd = String(date_str);
    let year = yyyyMMdd.substring(0,4);
    let month = Number(yyyyMMdd.substring(4,6));
    let day = Number(yyyyMMdd.substring(6,8));

    return year + '년 ' + month + '월 ' + day + '일';
}
/* yyyymmdd => yyyy년 mm월 dd일 */

/* Date type => yyyy년 mm월 dd일 */
export function dateForamt2(date_)
{
    let new_date = new Date(date_);
    let year = new_date.getFullYear();
    let month = new_date.getMonth() + 1;
    let date = new_date.getDate();

    return year + '년 ' + pad(month, 2) + '월 ' + pad(date, 2) + '일';
}
/* Date type => yyyy년 mm월 dd일 */

/* getDefualtDate */
export function getDefualtDate(date) {
    let sel_day = '';
    let today = new Date();
    let todayForYesterday = new Date();
    let yesterday = new Date(todayForYesterday.setDate(todayForYesterday.getDate() - 1));
    let today_bool = false, yesterday_bool = false;
    let weekend_yn = "N";

    if(date != "") {
        let datatimeRegexp = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);

        if ( !datatimeRegexp.test(date)) { // 날짜 형식이 아닌 경우 현재 날짜로 세팅
            alert("날짜는 yyyy-mm-dd 형식으로 입력해주세요!!\n현재 날짜 기준으로 검색합니다.");
            today_bool = true;
        }

        if(today_bool){
            sel_day = new Date();
        }else{
            sel_day = new Date(date);
        }

        if(!today_bool && sel_day > today)  { // 날짜가 현재 날짜보다 클 경우 현재 날짜로 세팅
            alert("날짜는 현재 날짜보다 클 수 없습니다!!\n현재 날짜 기준으로 검색합니다.");
            sel_day = new Date();
            today_bool = true;
        }

        if( // 현재 날짜인 경우
            "".concat(sel_day.getFullYear(), pad(sel_day.getMonth() + 1, 2), pad(sel_day.getDate(), 2)) 
            == "".concat(today.getFullYear(), pad(today.getMonth() + 1, 2), pad(today.getDate(), 2))
        ){
            today_bool = true;
        }

        if( // 어제 날짜인 경우
            "".concat(sel_day.getFullYear(), pad(sel_day.getMonth() + 1, 2), pad(sel_day.getDate(), 2)) 
            == "".concat(yesterday.getFullYear(), pad(yesterday.getMonth() + 1, 2), pad(yesterday.getDate(), 2))
        ){
            yesterday_bool = true;
        }

    } else{ // 현재 날짜로 세팅
        sel_day = new Date();
        today_bool = true;
    }

    let cal_minus = 0;
    if(sel_day.getDay() == 0) {
        cal_minus += 2; // 일요일
        weekend_yn = "Y";
    } else if(sel_day.getDay() == 6) {
        cal_minus++; // 토요일
        weekend_yn = "Y";
    }
    if(today_bool){
        if(today.getHours() < 13 ){
            cal_minus+=2; // 현재 날짜이며 13시 이전 (-2일)
        }else{
            cal_minus++; // 현재 날짜이며 13시 이후 (-1일)
        }
    }

    if(yesterday_bool && today.getHours() < 13 ){
        cal_minus++; // 어제 날짜이며 13시 이전 (-1일)
    }

    if(cal_minus > 2) cal_minus = 2; // 날짜 계산이 2일을 초과하면 2로 세팅

    let defualt_date = new Date(sel_day.setDate(sel_day.getDate() - cal_minus));
    let format_defualt_date = "".concat(defualt_date.getFullYear(), pad(defualt_date.getMonth() + 1, 2), pad(defualt_date.getDate(), 2));

    return {'format_defualt_date' : format_defualt_date, 'weekend_yn' : weekend_yn};
}

/* searchGoldenCross */
export function searchGoldenCross(date_list, average_5, average_20, average_60, average_120){
    let goldenCrossList = [];
    let goldenCrossDate = [];
    for(let i = 1; i < date_list.length - 2; i++){
        if(average_5[i] > average_20[i] && average_5[i - 1] < average_20[i - 1]){ // 5일선이 20일선 돌파
            if(average_5[i + 1] > average_20[i + 1] && average_5[i + 2] > average_20[i + 2]){ // 다음날, 다다음날까지 돌파
                if(average_5[i] > average_60[i] && average_20[i] > average_60[i]){ // 60일선 위
                    goldenCrossDate.push(date_list[i]);
                    goldenCrossList.push([date_list[i],average_5[i]]);
                }
            }
        }
    }
    console.log("골든크로스 발생일 = " + goldenCrossDate);
    return goldenCrossList;
}
/* searchGoldenCross */

/* searchDeadCross */
export function searchDeadCross(date_list, average_5, average_20, average_60, average_120){
    let deadCrossList = [];
    let deadCrossDate = [];
    for(let i = 1; i < date_list.length - 1; i++){
        if(average_5[i] < average_20[i] && average_5[i - 1] > average_20[i - 1]){ // 5일선이 20일선 아래로
            if(average_5[i + 1] < average_20[i + 1]){ // 다음날까지
                deadCrossDate.push(date_list[i]);
                deadCrossList.push([date_list[i],average_5[i]]);
            }
        }
    }
    console.log("데드크로스 발생일 = " + deadCrossDate);
    return deadCrossList;
}
/* searchDeadCross */

/* searchBTGoldenCross */
export function searchBTGoldenCross(date_list, baseLine, transitionLine){
    let goldenCrossList = [];
    let goldenCrossDate = [];
    for(let i = 1; i < date_list.length - 1; i++){
        if(transitionLine[i] > baseLine[i] && transitionLine[i - 1] < baseLine[i - 1] && transitionLine[i + 1] > baseLine[i + 1]){ // 전환선이 기준선 돌파
            goldenCrossDate.push(date_list[i]);
            goldenCrossList.push([date_list[i],transitionLine[i]]);
        }
    }
    console.log("BT 골든크로스 발생일 = " + goldenCrossDate);
    return goldenCrossList;
}
/* searchBTGoldenCross */

/* searchBTDeadCross */
export function searchBTDeadCross(date_list, baseLine, transitionLine){
    let deadCrossList = [];
    let deadCrossDate = [];
    for(let i = 2; i < date_list.length - 1; i++){
        if(transitionLine[i] < baseLine[i] && transitionLine[i - 1] > baseLine[i - 1] && transitionLine[i - 2] > baseLine[i - 2]){ // 전환선이 기준선 아래로
            deadCrossDate.push(date_list[i]);
            deadCrossList.push([date_list[i],transitionLine[i]]);
        }
    }
    console.log("BT 데드크로스 발생일 = " + deadCrossDate);
    return deadCrossList;
}
/* searchBTDeadCross */

/* searchDisparityGoldenCross */
export function searchDisparityGoldenCross(date_list, average_5, average_20, average_60, average_120){
    let goldenCrossList = [];
    let goldenCrossDate = [];
    for(let i = 1; i < date_list.length - 1; i++){
        let pre_disparity = (average_5[i - 1] / average_20[i - 1]) * 100; // 전날 5일선 20일선 이격도
        let disparity = (average_5[i] / average_20[i]) * 100; // 5일선 20일선 이격도
        if(disparity > 97 && pre_disparity <= 97){
            goldenCrossDate.push(date_list[i]);
            goldenCrossList.push([date_list[i],average_5[i]]);
        }
    }
    console.log("이격도골든크로스 발생일 = " + goldenCrossDate);
    return goldenCrossList;
}
/* searchDisparityGoldenCross */

/* searchDisparityDeadCross */
export function searchDisparityDeadCross(date_list, average_5, average_20, average_60, average_120){
    let deadCrossList = [];
    let deadCrossDate = [];
    for(let i = 1; i < date_list.length - 1; i++){
        let pre_disparity = (average_5[i - 1] / average_20[i - 1]) * 100; // 전날 5일선 20일선 이격도
        let disparity = (average_5[i] / average_20[i]) * 100; // 5일선 20일선 이격도
        if(disparity < 102 && pre_disparity >= 102){
            deadCrossDate.push(date_list[i]);
            deadCrossList.push([date_list[i],average_5[i]]);
        }
    }
    console.log("이격도데드크로스 발생일 = " + deadCrossDate);
    return deadCrossList;
}
/* searchDisparityDeadCross */

/* lineData */
export function lineData(candle_list) { return candle_list.map(d => { return { x: d.x, y: d.c} }) }
/* lineData */

/* lineData2 */
export function lineData2(candle_list, bb_list) { 
    let output_list = [];

    for(let i = 0; i < candle_list.length; i++){
        output_list.push({x: candle_list[i].x, y: bb_list[i]});
    }
    return output_list;
}
/* lineData2 */

/* lineData3 */
export function lineData3(candle_list, bb_list) { 
    let output_list = [];

    for(let i = 0; i < candle_list.length; i++){
        output_list.push([candle_list[i][0], bb_list[i]]);
    }
    return output_list;
}
/* lineData3 */

/* areaData */
export function areaData(candle_list, bb_up_list, bb_down_list) { 
    let output_list = [];

    for(let i = 0; i < candle_list.length; i++){
        output_list.push([candle_list[i][0], bb_down_list[i], bb_up_list[i]]);
    }
    return output_list;
}
/* areaData */

/* addCommas */
export function addCommas(n) { 
    const option = { maximumFractionDigits: 4};
    return n.toLocaleString('ko-KR', option);
}
/* addCommas */
