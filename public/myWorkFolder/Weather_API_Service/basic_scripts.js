/**
 * 현재 날짜를 YYYYMMDD 형식으로 반환한다.
 * @returns {String} ex) 20240101
 */
export function getToday() {
    const date = new Date();
    let getDay = date.getDate();
    const year = date.getFullYear();
    const month = ("0"+(1+date.getMonth())).slice(-2);
    const day = ("0" + getDay).slice(-2);
    console.log("현재 날짜 : ",`${year}${month}${day}`);

    return `${year}${month}${day}`;
}

/**
 * 현재 시간을 기준으로 단기예보의 예보시간을 반환한다. 
 * 단기예보 Basetime : 0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300 (1일 8회) 
 * 오늘 최저기온은 02시, 최고기온은 02시, 05시, 11시에 예보됨
 * @returns {String} ex) 0200
 */
export function getTime_weather_v() {
    let today = new Date();   
    let hours = today.getHours(); // 시
    let minutes = today.getMinutes(); // 분

    // 날짜와 시간을 문자열로 포맷팅
    const time = `${String(hours).padStart(2, '0')}${String(minutes).padStart(2, '0')}`;
    console.log("현재 시간 : ",time);

    if(time < 210){
        return "";
    }else if(time < 510){
        return "0200";
    }else if(time < 810){
        return "0500";
    }else if(time < 1110){
        return "0800";
    }else if(time < 1410){
        return "1100";
    }else if(time < 1710){
        return "1400";
    }else if(time < 2010){
        return "1700";
    }else if(time < 2310){
        return "2000";
    }else if(time < 2359){
        return "2300";
    }else{
        return "";
    }
}

/**
 * 현재 시간을 기준으로 초단기실황의 예보시간을 반환한다. 
 * 초단기실황 Basetime : 0000, 0100, 0200, ... (매시 정각) 
 * 초단기실황 API 제공 시간(~이후) : 00:30, 01:30, 02:30, ...
 * @returns {String} ex) 0200
 */
export function getTime_weather_u() {
    let today = new Date();   
    let hours = today.getHours(); // 시
    let minutes = today.getMinutes(); // 분
    let basetime = "";

    // 날짜와 시간을 문자열로 포맷팅
    const time = `${String(hours).padStart(2, '0')}${String(minutes).padStart(2, '0')}`;
    console.log("현재 시간 : ",time);

    if(minutes >= 35) basetime = today.getHours();
    else basetime = today.getHours()-1; // 35분전은 이전 시간대로 설정

    if(hours / 10 >= 1) basetime = String(basetime);
    else basetime = "0" + String(basetime);

    return basetime + "00";
}

/**
 * Json 타입인지 확인하여 boolean 값으로 반환한다.
 * @param {String} s Json타입인지 확인할 데이터
 * @returns {Boolean} ex) true
 */
export function IsJson(s) {
    try {
        var json = JSON.parse(s);
        return (typeof json === 'object');
    } catch (e) {
        return false;
    }
}

/**
 * 4자리로 구성된 시간, 분 데이터를 2자리로 반환한다.
 * @param {String} t 시간, 분 데이터
 * @returns {String} ex) 02
 */
export function func_time(t){
    let time = t.substring(0,2);
    return time;
}

/**
 * YYYYMMDD의 형식으로 구성된 날짜 데이터를 'YYYY년 MM월 DD일'로 반환한다.
 * @param {String} date_str 날짜 데이터
 * @returns {String} ex) 2024년 1월 1일
 */
export function dateForamt(date_str) {
    let yyyyMMdd = String(date_str);
    let year = yyyyMMdd.substring(0,4);
    let month = Number(yyyyMMdd.substring(4,6));
    let day = Number(yyyyMMdd.substring(6,8));

    return year + '년 ' + month + '월 ' + day + '일';
}

/**
 * 해당 id를 가진 요소의 투명도를 1로 설정한다.
 * @param {String} id 아이디
 */
export function effect_show(id) {
    let target = document.getElementById(id);
    if(target != null){
        target.style.visibility = 'visible';
        setTimeout(() => {
            target.style.opacity = 1;
        }, 10);
    }
}

/**
 * 해당 id를 가진 요소의 투명도를 0으로 설정한다.
 * @param {String} id 아이디
 */
export function effect_hide(id) {
    let target = document.getElementById(id);
    if(target != null){
        target.style.visibility = 'hidden';
        setTimeout(() => {
            target.style.opacity = 0;
        }, 10);
    }
}

/**
 * 해당 id를 가진 요소에 translateY를 val 만큼 적용시킨다.
 * @param {String} id 아이디
 * @param {String} val 값
 */
export function effect_transY(id, val) {
    let target = document.getElementById(id);
    if(target != null){
        setTimeout(() => {
            target.style.transform = 'translateY('+val+'px)';
        }, 10);
    }
}

/**
 * 위치번호의 X좌표와 Y좌표를 반환한다.
 * @param {String} loc 위치 번호
 * @returns {Map} ex) {'x' : 60, 'y' : 127}
 */
export function getLocXY(loc) {
    let x_ = 60;
    let y_ = 127;
    let loc_nm = "서울";

    switch(loc) {
        case '1': // 서울
            x_ = 60; y_ = 127; loc_nm = "서울"; break;
        case '2': // 춘천
            x_ = 73; y_ = 134; loc_nm = "춘천"; break;
        case '3': // 청주
            x_ = 69; y_ = 106; loc_nm = "청주"; break;
        case '4': // 강릉
            x_ = 92; y_ = 131; loc_nm = "강릉"; break;
        case '5': // 수원
            x_ = 60; y_ = 121; loc_nm = "수원"; break;
        case '6': // 안동
            x_ = 91; y_ = 106; loc_nm = "안동"; break;
        case '7': // 대전
            x_ = 67; y_ = 100; loc_nm = "대전"; break;    
        case '8': // 전주
            x_ = 63; y_ = 89; loc_nm = "전주"; break;
        case '9': // 대구
            x_ = 89; y_ = 90; loc_nm = "대구"; break;
        case '10': // 광주
            x_ = 58; y_ = 74; loc_nm = "광주"; break;
        case '11': // 울산
            x_ = 102; y_ = 84; loc_nm = "울산"; break;
        case '12': // 부산
            x_ = 98; y_ = 76; loc_nm = "부산"; break;
        case '13': // 목포
            x_ = 50; y_ = 67; loc_nm = "목포"; break;
        case '14': // 여수
            x_ = 73; y_ = 66; loc_nm = "여수"; break;
        case '15': // 제주도
            x_ = 53; y_ = 38; loc_nm = "제주도"; break;
        case '16': // 울릉도
            x_ = 127; y_ = 127; loc_nm = "울릉도"; break;
        case '17': // 백령도
            x_ = 21; y_ = 135; loc_nm = "백령도"; break;
        default: 
            break;
    }
    return {'x' : x_, 'y' : y_, 'loc_nm' : loc_nm};
}

/**
 * 강수형태 코드(PTY)를 명칭으로 반환한다.
 * @param {String} pty 강수형태 코드
 * @returns {String} ex) 비
 */
export function getPtyName(pty) {
    // 강수형태(PTY) 코드 : (초단기) 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7) 
    if(pty == '0'){
        return "없음";
    }else if(pty == '1'){
        return "비";
    }else if(pty == '2'){
        return "비/눈";
    }else if(pty == '3'){
        return "눈";
    }else if(pty == '5'){
        return "빗방울";
    }else if(pty == '6'){
        return "빗방울눈날림";
    }else if(pty == '7'){
        return "눈날림";
    }else{
        return "없음";
    }
}