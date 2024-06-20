import Queue from "./Class_queue.js"
import * as func from "./basic_func.js"

$('#side_stock').addClass('li_active');

const url = "https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo";
let popup_chart;
$('#likeItmsNm, #basDt').on("keydown", function(e){
    if(e.which==13){
        stockSearch();
    }
});

$('#select_btn').click(function () {
    stockSearch();
});

$('#select_btn2').click(function () {
    stockSearch2();
});

$(document).on("click",".view_chart",function(){
    monthChartSearch(this.dataset.itemnm, this.dataset.months);
    $('#pop_data_itemnm').val(this.dataset.itemnm);
    $('#pop_data_months').val(this.dataset.months);

    var url = "/stock/popup";
    var name = "stock_popup";
    var option = "width = 1800, height = 900, top = 30, left = 10, location = no"
    popup_chart = window.open(url, name, option);
})

function stockSearch(){
    $('#stock_table_div1').html('<div class="loader"><span><i></i></span></div>');

    let url_ = url;
    const serviceKey = $("#serviceKey").val() == "" ? "abPiIAX9s%2BDHXRnUd1X%2BRSPn3gr429SocWtL%2BLhIW3gLaY%2BV8DuQ6ypRPmmeoyfysHbBV0hh1EUSNCqKQR%2F74A%3D%3D" : $("#serviceKey").val();
    const numOfRows = $("#numOfRows").val() == "" ? "3000" : $("#numOfRows").val(); // 3000이면 모두 조회됨
    const pageNo = $("#pageNo").val() == "" ? "1" : $("#pageNo").val();
    const resultType = $("#resultType").val() == "" ? "json" : $("#resultType").val();

    let date_map = func.getDefualtDate($("#basDt").val());
    const basDt = date_map.format_defualt_date;
    const weekend_yn = date_map.weekend_yn;
    const likeItmsNm = $("#likeItmsNm").val();

    url_ += "?serviceKey=" + serviceKey;
    url_ += "&numOfRows=" + numOfRows;
    url_ += "&pageNo=" + pageNo;
    url_ += "&resultType=" + resultType;
    url_ += "&basDt=" + basDt;
    if (likeItmsNm != "") url_ += "&likeItmsNm=" + likeItmsNm;

    console.log(url_);

    let format_basDt = basDt.substring(0, 4) + '년' + basDt.substring(4, 6) + '월' + basDt.substring(6, 8) + '일';

    fetch(url_)
        .then(res => res.json())
        .then(data => makeDataTable(data, format_basDt, weekend_yn));
}

function stockSearch2(){
    $('#stock_table_div2').html('<div class="loader"><span><i></i></span></div>');

    let url_ = url;
    const serviceKey = $("#serviceKey").val() == "" ? "abPiIAX9s%2BDHXRnUd1X%2BRSPn3gr429SocWtL%2BLhIW3gLaY%2BV8DuQ6ypRPmmeoyfysHbBV0hh1EUSNCqKQR%2F74A%3D%3D" : $("#serviceKey").val();
    const numOfRows = $("#numOfRows").val() == "" ? "3000" : $("#numOfRows").val(); // 3000이면 모두 조회됨
    const pageNo = $("#pageNo").val() == "" ? "1" : $("#pageNo").val();
    const resultType = $("#resultType").val() == "" ? "json" : $("#resultType").val();

    let beginBasDt_map = func.getDefualtDate($("#beginBasDt").val());
    let endBasDt_map = func.getDefualtDate($("#endBasDt").val());
    const beginBasDt = beginBasDt_map.format_defualt_date;
    const endBasDt = endBasDt_map.format_defualt_date;
    const itmsNm = $("#itmsNm").val();

    url_ += "?serviceKey=" + serviceKey;
    url_ += "&numOfRows=" + numOfRows;
    url_ += "&pageNo=" + pageNo;
    url_ += "&resultType=" + resultType;
    url_ += "&beginBasDt=" + beginBasDt;
    url_ += "&endBasDt=" + endBasDt;
    if (itmsNm != "") url_ += "&itmsNm=" + itmsNm;

    console.log(url_);

    let format_beginBasDt = beginBasDt.substring(0, 4) + '년' + beginBasDt.substring(4, 6) + '월' + beginBasDt.substring(6, 8) + '일';
    let format_endBasDt = endBasDt.substring(0, 4) + '년' + endBasDt.substring(4, 6) + '월' + endBasDt.substring(6, 8) + '일';

    fetch(url_)
        .then(res => res.json())
        .then(data => makeDataTable2(data, format_beginBasDt, format_endBasDt));
}

function monthChartSearch(item_nm, months){
    $('#stock_table_div2').html('<div class="loader"><span><i></i></span></div>');

    let url_ = url;
    const serviceKey = $("#serviceKey").val() == "" ? "abPiIAX9s%2BDHXRnUd1X%2BRSPn3gr429SocWtL%2BLhIW3gLaY%2BV8DuQ6ypRPmmeoyfysHbBV0hh1EUSNCqKQR%2F74A%3D%3D" : $("#serviceKey").val();
    const numOfRows = $("#numOfRows").val() == "" ? "3000" : $("#numOfRows").val(); // 3000이면 모두 조회됨
    const pageNo = $("#pageNo").val() == "" ? "1" : $("#pageNo").val();
    const resultType = $("#resultType").val() == "" ? "json" : $("#resultType").val();

    let today = new Date();   
    const year = today.getFullYear(); // 년
    const month = today.getMonth();   // 월
    const day = today.getDate();      // 일

    let beginBasDt = "";
    /* 이평선을 구하기 위해 - 6개월 */
    let twoMonthAgo = new Date(year, month - 6, day);	// 2개월 전 
    let oneYearAgo = new Date(year - 1, month - 4, day); // 1년 전
    let twoYearAgo = new Date(year - 2, month - 4, day); // 2년 전

    if(months == 2){
        beginBasDt = beginBasDt.concat(twoMonthAgo.getFullYear(), func.pad(twoMonthAgo.getMonth() - 1, 2), func.pad(twoMonthAgo.getDate(), 2));
    }else if(months == 12){
        beginBasDt = beginBasDt.concat(oneYearAgo.getFullYear(), func.pad(oneYearAgo.getMonth() - 1, 2), func.pad(oneYearAgo.getDate(), 2));
    }else if(months == 24){
        beginBasDt = beginBasDt.concat(twoYearAgo.getFullYear(), func.pad(twoYearAgo.getMonth() - 1, 2), func.pad(twoYearAgo.getDate(), 2));
    }
    let endBasDt = "".concat(today.getFullYear(), func.pad(today.getMonth() + 1, 2), func.pad(today.getDate(), 2));
    console.log("beginBasDt = " + beginBasDt);
    const itmsNm = item_nm;

    url_ += "?serviceKey=" + serviceKey;
    url_ += "&numOfRows=" + numOfRows;
    url_ += "&pageNo=" + pageNo;
    url_ += "&resultType=" + resultType;
    url_ += "&beginBasDt=" + beginBasDt;
    url_ += "&endBasDt=" + endBasDt;
    if (itmsNm != "") url_ += "&itmsNm=" + itmsNm;

    console.log(url_);

    fetch(url_)
        .then(res => res.json())
        .then(data => makeMonthChart(data));
}

function makeDataTable(data, format_basDt, weekend_yn) {
    let items = data.response.body.items.item;
    let output = "";

    if(weekend_yn == "N" && items.length == 0){
        output = "<div class='load_text'>기준일자 " + format_basDt + "은 휴장일 입니다.</div>";
    }else{
        output = "<div class='load_text'>기준일자 : " + format_basDt + "</div>"
        + "<table id='stock_table1' class='display'><thead><tr>"
        + "<th>종목명</th>"
        + "<th>시장구분</th>"
        + "<th>시가</th>"
        + "<th>고가</th>"
        + "<th>저가</th>"
        + "<th>종가</th>"
        + "<th>대비</th>"
        + "<th>등락률</th>"
        + "<th>거래량</th>"
        + "<th>분석 차트</th>"
        + "</tr></thead>";

        for (let i in items) {
            let item = items[i];

            let itmsNm = item.itmsNm; // 종목명
            let mrktCtg = item.mrktCtg; // 시장구분 (KOSPI/KOSDAQ/KONEX)

            if(mrktCtg == 'KONEX') continue; // KONEX 제외

            let mkp = item.mkp; // 시가
            let hipr = item.hipr; // 고가
            let lopr = item.lopr; // 저가
            let clpr = item.clpr; // 종가
            let vs = item.vs; // 전일 대비 등락
            let fltRt = Number(item.fltRt); // 등락률
            let trqu = item.trqu; // 거래량
            let srtnCd = item.srtnCd; // 종목코드

            output += "<tr>"
                + "<td>" + "<a href='https://finance.naver.com/item/main.naver?code=" + srtnCd +"' target='_blank'>" + itmsNm + "</a>" + "</td>"
                + "<td>" + mrktCtg + "</td>"
                + "<td>" + mkp + "</td>"
                + "<td>" + hipr + "</td>"
                + "<td>" + lopr + "</td>";

            output += func.make_color_td(vs, clpr);
            output += func.make_color_td(vs, vs);
            output += func.make_color_td(fltRt, fltRt);
            output += "<td>" + trqu + "</td>";
            output += "<td><button class='view_chart' data-months='2' data-itemnm='" + itmsNm +"'>2개월</button>"
                + "<button class='view_chart' data-months='12' data-itemnm='" + itmsNm +"'>1년</button>"
                + "<button class='view_chart' data-months='24' data-itemnm='" + itmsNm +"'>2년</button></td>";
                + "</tr>";
        }
        output += "</table>";
    }

    $('#stock_table_div1').html(output);
    $('#stock_table1').DataTable({
        order: [[0, 'asc']],
        pageLength: 25,
        columnDefs: [
                        {targets: 2, render: $.fn.dataTable.render.number(',')},
                        {targets: 3, render: $.fn.dataTable.render.number(',')},
                        {targets: 4, render: $.fn.dataTable.render.number(',')},
                        {targets: 5, render: $.fn.dataTable.render.number(',')},
                        {targets: 6, render: $.fn.dataTable.render.number(',')},
                        {targets: 7, render: function(data, type, row){ 
                            return data >= 0 ? data == 0 ? '⚊ ' + data : '▲ ' + data : '▼ ' + data
                        }, type: 'formatted-num'},
                        {targets: 8, render: $.fn.dataTable.render.number(',')}
                    ]
    });
}

function makeDataTable2(data, format_beginBasDt, format_endBasDt) {
    let items = data.response.body.items.item;
    let output = "";
    let title = ""; // 종목명
    if(items.length > 0){
        title = items[0].itmsNm;
    }

    output = "<div class='load_text'>기준일자 : " + format_beginBasDt + " ~ " + format_endBasDt + "</div>"
    + "<table id='stock_table2' class='display'><thead><tr>"
    + "<th>종목명</th>"
    + "<th>시장구분</th>"
    + "<th>시가</th>"
    + "<th>고가</th>"
    + "<th>저가</th>"
    + "<th>종가</th>"
    + "<th>대비</th>"
    + "<th>등락률</th>"
    + "<th>거래량</th>"
    + "<th>기준일자</th>"
    + "</tr></thead>";

    for (let i = items.length - 1; i >= 0; i--) {
        let item = items[i];

        let itmsNm = item.itmsNm; // 종목명
        let mrktCtg = item.mrktCtg; // 시장구분 (KOSPI/KOSDAQ/KONEX)
        if(mrktCtg == 'KONEX') continue; // KONEX 제외

        let mkp = Number(item.mkp); // 시가
        let hipr = Number(item.hipr); // 고가
        let lopr = Number(item.lopr); // 저가
        let clpr = Number(item.clpr); // 종가
        let vs = item.vs; // 전일 대비 등락
        let fltRt = Number(item.fltRt); // 등락률
        let trqu = item.trqu; // 거래량
        let basDt = item.basDt; // 기준일자
        let srtnCd = item.srtnCd; // 종목코드

        output += "<tr>"
            + "<td>" + "<a href='https://finance.naver.com/item/main.naver?code=" + srtnCd +"' target='_blank'>" + itmsNm + "</a>" + "</td>"
            + "<td>" + mrktCtg + "</td>"
            + "<td>" + mkp + "</td>"
            + "<td>" + hipr + "</td>"
            + "<td>" + lopr + "</td>";

        output += func.make_color_td(vs, clpr);
        output += func.make_color_td(vs, vs);
        output += func.make_color_td(fltRt, fltRt);
        output += "<td>" + trqu + "</td>"
            + "<td>" + basDt+ "</td>"
            + "</tr>";
    }
    output += "</table>";

    $('#stock_table_div2').html(output);
    $('#stock_table2').DataTable({
        order: [[9, 'desc']],
        pageLength: 25,
        columnDefs: [
                        {targets: 2, render: $.fn.dataTable.render.number(',')},
                        {targets: 3, render: $.fn.dataTable.render.number(',')},
                        {targets: 4, render: $.fn.dataTable.render.number(',')},
                        {targets: 5, render: $.fn.dataTable.render.number(',')},
                        {targets: 6, render: $.fn.dataTable.render.number(',')},
                        {targets: 7, render: function(data, type, row){ 
                            return data >= 0 ? data == 0 ? '⚊ ' + data : '▲ ' + data : '▼ ' + data
                        }, type: 'formatted-num'},
                        {targets: 8, render: $.fn.dataTable.render.number(',')},
                        {targets: 9, render: function(data, type, row){ 
                            return data.substring(0, 4) + '년' + data.substring(4, 6) + '월' + data.substring(6, 8) + '일'
                        }, type: 'formatted-num'}
                    ]
    });

    $(".loader").detach();
}

function makeMonthChart(data) {
    let items = data.response.body.items.item;
    let output1 = "", output2 = "";
    let leng = items.length;
    let title = ""; // 종목명
    if(items.length > 0){
        title = items[0].itmsNm;
    }
    let date_list = []; // 일자 리스트

    for (let i = leng - 1; i >= 0; i--) {
        let item = items[i];
        let itmsNm = item.itmsNm; // 종목명
        let mrktCtg = item.mrktCtg; // 시장구분 (KOSPI/KOSDAQ/KONEX)
        let mkp = Number(item.mkp); // 시가
        let hipr = Number(item.hipr); // 고가
        let lopr = Number(item.lopr); // 저가
        let clpr = Number(item.clpr); // 종가
        let vs = item.vs; // 전일 대비 등락
        let fltRt = Number(item.fltRt); // 등락률
        let trqu = item.trqu; // 거래량
        let basDt = item.basDt; // 기준일자
        let srtnCd = item.srtnCd; // 종목코드

        if(i < leng - 119){
            date_list.push(basDt);

            output2 += "<tr>"
            + "<td>" + "<a href='https://finance.naver.com/item/main.naver?code=" + srtnCd +"' target='_blank'>" + itmsNm + "</a>" + "</td>"
            + "<td>" + mrktCtg + "</td>"
            + "<td>" + mkp + "</td>"
            + "<td>" + hipr + "</td>"
            + "<td>" + lopr + "</td>";

            output2 += func.make_color_td(vs, clpr);
            output2 += func.make_color_td(vs, vs);
            output2 += func.make_color_td(fltRt, fltRt);
            output2 += "<td>" + trqu + "</td>"
                + "<td>" + basDt+ "</td>"
                + "</tr>";
        }
    }
    output2 += "</table>";

    output1 = "<div class='load_text'>기준일자 : " + func.dateForamt(date_list[0]) + " ~ " + func.dateForamt(date_list[date_list.length - 1]) + "</div>"
    + "<table id='stock_table2' class='display'><thead><tr>"
    + "<th>종목명</th>"
    + "<th>시장구분</th>"
    + "<th>시가</th>"
    + "<th>고가</th>"
    + "<th>저가</th>"
    + "<th>종가</th>"
    + "<th>대비</th>"
    + "<th>등락률</th>"
    + "<th>거래량</th>"
    + "<th>기준일자</th>"
    + "</tr></thead>";

    $('#stock_table_div2').html(output1 + output2);
    $('#stock_table2').DataTable({
        order: [[9, 'desc']],
        pageLength: 25,
        columnDefs: [
                        {targets: 2, render: $.fn.dataTable.render.number(',')},
                        {targets: 3, render: $.fn.dataTable.render.number(',')},
                        {targets: 4, render: $.fn.dataTable.render.number(',')},
                        {targets: 5, render: $.fn.dataTable.render.number(',')},
                        {targets: 6, render: $.fn.dataTable.render.number(',')},
                        {targets: 7, render: function(data, type, row){ 
                            return data >= 0 ? data == 0 ? '⚊ ' + data : '▲ ' + data : '▼ ' + data
                        }, type: 'formatted-num'},
                        {targets: 8, render: $.fn.dataTable.render.number(',')},
                        {targets: 9, render: function(data, type, row){ 
                            return data.substring(0, 4) + '년' + data.substring(4, 6) + '월' + data.substring(6, 8) + '일'
                        }, type: 'formatted-num'}
                    ]
    });

    $(".loader").detach();
}