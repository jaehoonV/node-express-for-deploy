import * as basic from "./basic_scripts.js"

let service_key_input = document.getElementById("service-key");
let prev_btn = document.getElementById("prev_btn");
let enter_btn = document.getElementById("enter_btn");

service_key_input.addEventListener("keydown", (e) => handleKeyDown(e));
prev_btn.addEventListener("click", function (){
    basic.effect_hide("prev_btn");
    setTimeout(() => {
        document.getElementById("service-key").value = "";
        let location_options = document.getElementById("location_select").options;
        location_options[0].selected = true;
        let type_options = document.getElementById("type_select").options;
        type_options[0].selected = true;
        document.getElementById("weather-container").innerHTML = "";
        document.getElementById("service-key").classList.remove("hidden");
        document.getElementById("service-key").closest('.input-container').style.opacity = 1;
        document.getElementById("service-key").closest('.input-container').style.transform = 'translateY(0)';
    }, 500);
});

enter_btn.addEventListener("click", function (){
    weather_enter();
});

function handleKeyDown(event) {
    if (event.key === "Enter") {
        weather_enter();
    } 
}

function weather_enter(){
    let location = document.getElementById("location_select");
    let location_val = location.options[location.selectedIndex].value;
    let type = document.getElementById("type_select");
    let type_val = type.options[type.selectedIndex].value;
    let confirm_bool = false;
    if(location_val == '18' && type_val == '2'){
        confirm_bool = confirm("전체 지역은 실황만 조회가 가능합니다. \n전체 지역으로 실황 조회를 하시겠습니까?");
        if(confirm_bool != true){
            return;
        }
    }

    document.getElementById("service-key").closest('.input-container').style.opacity = 0;
    document.getElementById("service-key").closest('.input-container').style.transform = 'translateY(-300px)';
    setTimeout(() => {
        document.getElementById("service-key").classList.add("hidden");
        const serviceKey = document.getElementById("service-key").value;
        document.getElementById("weather-container").innerHTML = "<div class='loader'><span><i></i></span></div>";
        if(location_val == '18' || (confirm_bool && type_val == '2')){ // 전체
            type_val = 1;
            create_all_weather_table(serviceKey, type_val);
        } else{
            let loc_xy = basic.getLocXY(location_val);
            create_weather_table(serviceKey, loc_xy, type_val);
        }
    }, 500); // 애니메이션 시간과 일치하는 시간 설정
}

async function weather_service(key, loc_x, loc_y, type_val){
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        let url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'; /* 초단기 실황 조회 URL */
        let base_time = basic.getTime_weather_u();
        if(type_val == '2'){
            url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'; /* 단기 예보 조회 URL */
            base_time = basic.getTime_weather_v();
        }

        var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + key; /* Service Key */
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* page */
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /* 한 페이지 결과 수*/
        queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /* XML, JSON*/
        queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(basic.getToday()); /* 발표일자 */
        queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(base_time); /* 발표시각 */
        queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(loc_x); /* 예보지점 X 좌표 */
        queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(loc_y); /* 예보지점 Y 좌표 */

        console.log("url = " + url + queryParams);

        xhr.open('GET', url + queryParams);
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    setTimeout(() => {
                        resolve(this.response);
                    }, 100);
                } else {
                    reject(new Error('데이터를 가져오는 중 에러 발생: ' + this.statusText));
                }
            }
        };

        xhr.send('');
    });
}

async function create_all_weather_table(serviceKey, type_val){
    let dataForError;
    let error_check = false;

    let table = "<table id='weather_table' style='transform: translateY(200px);'><tr><th>지역</th><th>기온</th><th>1시간 강수량</th><th>습도</th><th>강수형태</th><th>풍향</th><th>풍속</th></tr>";
    for(let i = 1; i <= 17; i++){
        let loc_xy = basic.getLocXY(String(i));
        try {
            let data = await weather_service(serviceKey, loc_xy.x, loc_xy.y, type_val);
            dataForError = data;
            let parse_data = JSON.parse(data); 
            if(parse_data){
                let items = parse_data.response.body.items.item;
                let T1H = ""; // 기온
                let RN1 = ""; // 1시간 강수량
                let REH = ""; // 습도
                let PTY = ""; // 강수형태
                let VEC = ""; // 풍향
                let WSD = ""; // 풍속

                items.forEach(item => {
                    let category = item.category;
                    let obsrValue = item.obsrValue;
                    if(category == "T1H"){ // 기온
                        T1H = obsrValue;
                    } else if(category == "RN1"){ // 1시간 강수량
                        RN1 = obsrValue;
                    } else if(category == "REH"){ // 습도
                        REH = obsrValue;
                    } else if(category == "PTY"){ // 강수형태
                        PTY = obsrValue;
                    } else if(category == "VEC"){ // 풍향
                        VEC = obsrValue;
                    } else if(category == "WSD"){ // 풍속
                        WSD = obsrValue;
                    }
                });

                table += "<tr>";
                table += "<td>" + loc_xy.loc_nm + "</td>";
                table += "<td>" + T1H + "</td>";
                table += "<td>" + RN1 + "</td>";
                table += "<td>" + REH + "</td>";
                table += "<td>" + basic.getPtyName(PTY) + "</td>";
                table += "<td>" + VEC + "</td>";
                table += "<td>" + WSD + "</td>";
                table += "</tr>";
            }
        } catch (error){
            error_check = true;
            break;
        }
    }
    table += "</table>";

    if(error_check){
        let xmlParser = new DOMParser();
        let xmlDoc = xmlParser.parseFromString(dataForError, "text/xml"); // parseFromString() 메소드를 이용해 문자열을 파싱함. 
        let errMsg = xmlDoc.getElementsByTagName("errMsg")[0].textContent; 
        let returnAuthMsg = xmlDoc.getElementsByTagName("returnAuthMsg")[0].textContent; 
        
        let err_text = "<div id='err_text'>" + errMsg + " : " + returnAuthMsg + "</div>";

        document.getElementById("weather-container").innerHTML = err_text;
        basic.effect_show("err_text");
    }else{
        document.getElementById("weather-container").innerHTML = table;
        basic.effect_show("weather_table");
        basic.effect_transY("weather_table", 0);
    }
    basic.effect_show("prev_btn");
}

async function create_weather_table(serviceKey, loc_xy, type_val){
    let dataForError;

    try {
        let data = await weather_service(serviceKey, loc_xy.x, loc_xy.y, type_val);
        dataForError = data;
        let parse_data = JSON.parse(data); 
        if(parse_data){
            let location = document.getElementById("location_select");
            let location_val = location.options[location.selectedIndex].value;
            let loc_xy = basic.getLocXY(location_val);
            let items = parse_data.response.body.items.item;
            let table = "";
            if(type_val == '2'){
                table += "<table id='weather_table' style='transform: translateY(200px);'><tr><th>지역</th><th>예보일자</th><th>예보시간</th><th>기온</th></tr>";
                
                items.forEach(item => {
                    let fcstDate = item.fcstDate;
                    let fcstTime = item.fcstTime;
                    let fcstValue = item.fcstValue;
                    let category = item.category;
                    
                    if(category == "TMP"){ // 기온
                        table += "<tr>";
                        table += "<td>" + loc_xy.loc_nm + "</td>";
                        table += "<td>" + basic.dateForamt(fcstDate) + "</td>";
                        table += "<td>" + basic.func_time(fcstTime) + "</td>";
                        table += "<td>" + fcstValue + "</td>";
                        table += "</tr>";
                    }
                });
            } else{
                let T1H = ""; // 기온
                let RN1 = ""; // 1시간 강수량
                let REH = ""; // 습도
                let PTY = ""; // 강수형태
                let VEC = ""; // 풍향
                let WSD = ""; // 풍속
                table += "<table id='weather_table' style='transform: translateY(200px);'><tr><th>지역</th><th>기온</th><th>1시간 강수량</th><th>습도</th><th>강수형태</th><th>풍향</th><th>풍속</th></tr>";

                items.forEach(item => {
                    let category = item.category;
                    let obsrValue = item.obsrValue;
                    if(category == "T1H"){ // 기온
                        T1H = obsrValue;
                    } else if(category == "RN1"){ // 1시간 강수량
                        RN1 = obsrValue;
                    } else if(category == "REH"){ // 습도
                        REH = obsrValue;
                    } else if(category == "PTY"){ // 강수형태
                        PTY = obsrValue;
                    } else if(category == "VEC"){ // 풍향
                        VEC = obsrValue;
                    } else if(category == "WSD"){ // 풍속
                        WSD = obsrValue;
                    }
                });

                table += "<tr>";
                table += "<td>" + loc_xy.loc_nm + "</td>";
                table += "<td>" + T1H + "</td>";
                table += "<td>" + RN1 + "</td>";
                table += "<td>" + REH + "</td>";
                table += "<td>" + basic.getPtyName(PTY) + "</td>";
                table += "<td>" + VEC + "</td>";
                table += "<td>" + WSD + "</td>";
                table += "</tr>";
            }
            
            table += "</table>";

            document.getElementById("weather-container").innerHTML = table;
            basic.effect_show("weather_table");
            basic.effect_transY("weather_table", 0);
        }else{
            let errMsg = data.response.header.resultMsg;
            let returnAuthMsg = data.response.header.returnAuthMsg;
            let err_text = "<div id='err_text'>" + errMsg + " : " + returnAuthMsg + "</div>";

            document.getElementById("weather-container").innerHTML = err_text;
            basic.effect_show("err_text");
        }
        basic.effect_show("prev_btn");
    } catch (error){
        let xmlParser = new DOMParser();
        let xmlDoc = xmlParser.parseFromString(dataForError, "text/xml"); // parseFromString() 메소드를 이용해 문자열을 파싱함. 
        let errMsg = xmlDoc.getElementsByTagName("errMsg")[0].textContent; 
        let returnAuthMsg = xmlDoc.getElementsByTagName("returnAuthMsg")[0].textContent; 
        
        let err_text = "<div id='err_text'>" + errMsg + " : " + returnAuthMsg + "</div>";

        document.getElementById("weather-container").innerHTML = err_text;
        basic.effect_show("err_text");
        basic.effect_show("prev_btn");
    }
}
