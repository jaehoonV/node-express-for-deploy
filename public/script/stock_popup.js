import Queue from "./Class_queue.js"
import * as func from "./basic_func.js"

const url = "https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo";
let chart1, chart2;

$(function () {
    var pop_data_itemnm = opener.$("#pop_data_itemnm").val();
    var pop_data_months = opener.$("#pop_data_months").val();

    if (pop_data_itemnm.length > 0 && pop_data_months.length > 0) {
        $("#itemnm").val(pop_data_itemnm);
        $("#months").val(pop_data_months);
        monthChartSearch(pop_data_itemnm, pop_data_months);
    }
});

function monthChartSearch(item_nm, months) {
    if (chart1) {
        chart1.destroy(); // 기존 차트 파기
    }
    if (chart2) {
        chart2.destroy(); // 기존 차트 파기
    }

    $('#chart_div1').prepend('<div class="loader"><span><i></i></span></div>');
    $('#chart_div2').prepend('<div class="loader"><span><i></i></span></div>');

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
    if (months == 2) {
        beginBasDt = beginBasDt.concat(twoMonthAgo.getFullYear(), func.pad(twoMonthAgo.getMonth() - 1, 2), func.pad(twoMonthAgo.getDate(), 2));
    } else if (months == 12) {
        beginBasDt = beginBasDt.concat(oneYearAgo.getFullYear(), func.pad(oneYearAgo.getMonth() - 1, 2), func.pad(oneYearAgo.getDate(), 2));
    } else if (months == 24) {
        beginBasDt = beginBasDt.concat(twoYearAgo.getFullYear(), func.pad(twoYearAgo.getMonth() - 1, 2), func.pad(twoYearAgo.getDate(), 2));
    }
    let endBasDt = "".concat(today.getFullYear(), func.pad(today.getMonth() + 1, 2), func.pad(today.getDate(), 2));

    const itmsNm = item_nm;

    url_ += `?serviceKey=${serviceKey}&numOfRows=${numOfRows}&pageNo=${pageNo}&resultType=${resultType}&beginBasDt=${beginBasDt}&endBasDt=${endBasDt}&itmsNm=${encodeURIComponent(itmsNm)}`;

    console.log(url_);

    fetch(url_)
        .then(res => res.json())
        .then(data => makeMonthChart(data));
}

function makeMonthChart(data) {
    let items = data.response.body.items.item;
    let leng = items.length;
    let title = ""; // 종목명
    if (items.length > 0) {
        title = items[0].itmsNm;
    }
    let date_list = []; // 일자 리스트
    let mkp_list = []; // 시가 리스트
    let hipr_list = []; // 고가 리스트
    let lopr_list = []; // 저가 리스트
    let clpr_list = []; // 종가 리스트
    let lo_hi_list = []; // 저가, 고가 리스트
    let mkp_clpr_list = []; // 시가, 종가 리스트
    let min_lopr = Number.MAX_SAFE_INTEGER; // 최저값
    let max_hipr = 0; // 최대값
    let candle_list = []; // 캔들차트 리스트
    let candle_list_volume = []; // 캔들차트 거래량 리스트

    let date_for_ave_list = []; // 이평선을 구하기 위한 날짜 리스트
    let clpr_for_ave_list = []; // 이평선을 구하기 위한 종가 리스트
    let average_5 = []; // 5일 이평선 리스트
    let average_20 = []; // 20일 이평선 리스트
    let average_60 = []; // 60일 이평선 리스트
    let average_120 = []; // 120일 이평선 리스트

    let baseLine = []; // 기준선 리스트
    let transitionLine = []; // 전환선 리스트
    let bl_list = new Queue; // 기준선 queue
    let ts_list = new Queue; // 전환선 queue

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
        let trqu = Number(item.trqu); // 거래량
        let basDt = item.basDt; // 기준일자
        let srtnCd = item.srtnCd; // 종목코드

        if (i < leng - 119) {
            date_list.push(basDt);
            mkp_list.push(mkp);
            hipr_list.push(hipr);
            lopr_list.push(lopr);
            clpr_list.push(clpr);

            mkp_clpr_list.push(new Array(mkp, clpr));
            candle_list.push([new Date(basDt.substring(0, 4) + '-' + basDt.substring(4, 6) + '-' + basDt.substring(6, 8)).setHours(0, 0, 0, 0), mkp, hipr, lopr, clpr]);
            candle_list_volume.push([new Date(basDt.substring(0, 4) + '-' + basDt.substring(4, 6) + '-' + basDt.substring(6, 8)).setHours(0, 0, 0, 0), trqu]);
        }

        lo_hi_list.push(new Array(lopr, hipr));
        date_for_ave_list.push(new Date(basDt.substring(0, 4) + '-' + basDt.substring(4, 6) + '-' + basDt.substring(6, 8)).setHours(0, 0, 0, 0));
        clpr_for_ave_list.push(clpr);
    }

    min_lopr = Math.min(...lopr_list);
    max_hipr = Math.max(...hipr_list);

    let clpr_ave_leng = clpr_for_ave_list.length;
    /* 5일 이평선 리스트 생성*/
    let sum5 = 0;
    for (let i = 0; i < 5; i++) {
        sum5 += clpr_for_ave_list[i];
        if (i != 4) {
            average_5.push(NaN);
        }
    }
    average_5.push(Math.floor(sum5 / 5));
    for (let i = 5; i < clpr_ave_leng; i++) {
        sum5 += (clpr_for_ave_list[i] - clpr_for_ave_list[i - 5]);
        average_5.push(Math.floor(sum5 / 5));
    }
    /* 5일 이평선 리스트 생성*/

    /* 20일 이평선 리스트 생성*/ /* 볼린저 밴드 리스트 생성 */
    let temp_20_list = new Queue;
    let bb_up_list = [];
    let bb_down_list = [];
    let sum20 = 0;
    for (let i = 0; i < 20; i++) {
        sum20 += clpr_for_ave_list[i];
        temp_20_list.enqueue(clpr_for_ave_list[i]);
        if (i != 19) {
            average_20.push(NaN);
            bb_up_list.push(NaN);
            bb_down_list.push(NaN);
        }
    }

    average_20.push(Math.floor(sum20 / 20));
    bb_up_list.push(Math.floor(sum20 / 20) + Math.round(temp_20_list.standardDeviation() * 2));
    bb_down_list.push(Math.floor(sum20 / 20) - Math.round(temp_20_list.standardDeviation() * 2));

    for (let i = 20; i < clpr_ave_leng; i++) {
        sum20 += (clpr_for_ave_list[i] - clpr_for_ave_list[i - 20]);
        average_20.push(Math.floor(sum20 / 20));
        temp_20_list.enqueue(clpr_for_ave_list[i]);
        temp_20_list.dequeue();
        let temp_sd = Math.round(temp_20_list.standardDeviation() * 2);
        bb_up_list.push(Math.floor(sum20 / 20) + temp_sd);
        bb_down_list.push(Math.floor(sum20 / 20) - temp_sd);
    }
    /* 20일 이평선 리스트 생성*/ /* 볼린저 밴드 리스트 생성 */

    /* 60일 이평선 리스트 생성*/
    let sum60 = 0;
    for (let i = 0; i < 60; i++) {
        sum60 += clpr_for_ave_list[i];
        if (i != 59) {
            average_60.push(NaN);
        }
    }
    average_60.push(Math.floor(sum60 / 60));
    for (let i = 60; i < clpr_ave_leng; i++) {
        sum60 += (clpr_for_ave_list[i] - clpr_for_ave_list[i - 60]);
        average_60.push(Math.floor(sum60 / 60));
    }
    /* 60일 이평선 리스트 생성*/

    /* 120일 이평선 리스트 생성*/
    let sum120 = 0;
    for (let i = 0; i < 120; i++) {
        sum120 += clpr_for_ave_list[i];
        if (i != 119) {
            average_120.push(NaN);
        }
    }
    average_120.push(Math.floor(sum120 / 120));
    for (let i = 120; i < clpr_ave_leng; i++) {
        sum120 += (clpr_for_ave_list[i] - clpr_for_ave_list[i - 120]);
        average_120.push(Math.floor(sum120 / 120));
    }
    /* 120일 이평선 리스트 생성*/

    /* 기준선 리스트 생성 */
    for (let i = 0; i < 26; i++) { // 26일 기준 high clpr, low clpr의 평균
        bl_list.enqueue(clpr_for_ave_list[i]);
        if (i != 25) {
            baseLine.push(NaN);
        }
    }
    baseLine.push(Math.floor((bl_list.max() + bl_list.min()) / 2));

    for (let i = 26; i < clpr_ave_leng; i++) {
        bl_list.enqueue(clpr_for_ave_list[i]);
        bl_list.dequeue();
        baseLine.push(Math.floor((bl_list.max() + bl_list.min()) / 2));
    }
    /* 기준선 리스트 생성 */

    /* 전환선 리스트 생성 */
    for (let i = 0; i < 9; i++) { // 9일 기준 high clpr, low clpr의 평균
        ts_list.enqueue(clpr_for_ave_list[i]);
        if (i != 8) {
            transitionLine.push(NaN);
        }
    }
    transitionLine.push(Math.floor((ts_list.max() + ts_list.min()) / 2));
    for (let i = 9; i < clpr_ave_leng; i++) {
        ts_list.enqueue(clpr_for_ave_list[i]);
        ts_list.dequeue();
        transitionLine.push(Math.floor((ts_list.max() + ts_list.min()) / 2));
    }
    /* 전환선 리스트 생성 */

    $(".loader").detach();

    /* searchGoldenCross */
    let goldenCross_list = func.searchGoldenCross(date_for_ave_list.slice(119), average_5.slice(119), average_20.slice(119), average_60.slice(119), average_120.slice(119));

    /* searchDeadCross */
    let deadCross_list = func.searchDeadCross(date_for_ave_list.slice(119), average_5.slice(119), average_20.slice(119), average_60.slice(119), average_120.slice(119));

    /* searchBTGoldenCross */
    let bt_goldenCross_list = func.searchBTGoldenCross(date_for_ave_list.slice(119), baseLine.slice(119), transitionLine.slice(119));

    /* searchBTDeadCross */
    let bt_deadCross_list = func.searchBTDeadCross(date_for_ave_list.slice(119), baseLine.slice(119), transitionLine.slice(119));

    /* searchDisparityGoldenCross */
    let disparityGoldenCross_list = func.searchDisparityGoldenCross(date_for_ave_list.slice(119), average_5.slice(119), average_20.slice(119), average_60.slice(119), average_120.slice(119));

    /* searchDisparityDeadCross */
    let disparityDeadCross_list = func.searchDisparityDeadCross(date_for_ave_list.slice(119), average_5.slice(119), average_20.slice(119), average_60.slice(119), average_120.slice(119));

    /* calculateParabolicSAR */
    let parabolicSAR_list = func.calculateParabolicSAR(date_for_ave_list, lo_hi_list);

    /* createChart */
    createChart(title, date_list, mkp_list, hipr_list, lopr_list, clpr_list, lo_hi_list, mkp_clpr_list, min_lopr, max_hipr, candle_list, candle_list_volume, bb_up_list.slice(119), bb_down_list.slice(119), average_5.slice(119), average_20.slice(119), average_60.slice(119), average_120.slice(119), baseLine.slice(119), transitionLine.slice(119), goldenCross_list, deadCross_list, bt_goldenCross_list, bt_deadCross_list, disparityGoldenCross_list, disparityDeadCross_list, parabolicSAR_list);

    /* createChart 이평선, 기준선, 전환선 */
    //createChart_average(title, date_for_ave_list.slice(119), average_5.slice(119), average_20.slice(119), average_60.slice(119), average_120.slice(119), baseLine.slice(119), transitionLine.slice(119), goldenCross_list, deadCross_list, bt_goldenCross_list, bt_deadCross_list, min_lopr, max_hipr, bb_up_list.slice(119), bb_down_list.slice(119), disparityGoldenCross_list, disparityDeadCross_list);

}

/* createChart */
function createChart(title, date_list, mkp_list, hipr_list, lopr_list, clpr_list, lo_hi_list, mkp_clpr_list, min_lopr, max_hipr, candle_list, candle_list_volume, bb_up_list, bb_down_list, average_5, average_20, average_60, average_120, baseLine, transitionLine, goldenCross_list, deadCross_list, bt_goldenCross_list, bt_deadCross_list, disparityGoldenCross_list, disparityDeadCross_list, parabolicSAR_list) {
    const groupingUnits = [[
        'week',                         // unit name
        [1]                             // allowed multiples
    ], [
        'month',
        [1, 2, 3, 4, 6]
    ]];

    // create the chart
    Highcharts.stockChart('chart-candlestick', {
        chart: {
            alignThresholds: true,
            height: 850,
        },
        rangeSelector: {
            selected: 4
        },
        title: {
            text: title
        },
        legend: {
            enabled: true
        },
        yAxis: [{
            labels: {
                align: 'left',
                x: 10
            },
            title: {
                text: 'OHLC'
            },
            opposite: false,
            height: '40%',
            offset: 10,
            lineWidth: 2,
            resize: {
                enabled: true
            }
        }, {
            labels: {
                align: 'left',
                x: 10
            },
            title: {
                text: '거래량'
            },
            opposite: false,
            top: '42%',
            height: '15%',
            offset: 10,
            lineWidth: 2,
            resize: {
                enabled: true
            }
        }, {
            labels: {
                align: 'left',
                x: 10
            },
            title: {
                text: 'Analysis'
            },
            opposite: false,
            top: '59%',
            height: '39%',
            offset: 10,
            lineWidth: 2
        }],

        tooltip: {
            style: {
                fontWeight: 'bold'
            }
        },

        series: [{
            type: 'candlestick',
            name: title,
            data: candle_list,
            showInLegend: false,
            upColor: '#e00400', // 하락 색상
            color: '#003ace', // 상승 색상
            yAxis: 0,
            /* dataGrouping: {
                units: groupingUnits
            }, */
            tooltip: {
                pointFormatter: function() {
                    let s = '';
                    if(this.y !== 0){
                        if(this.series.name == title){
                            s += '<span>' + func.dateForamt2(this.x) + '</span>';
                            s += '<br><span style="color:' + this.color + '"> \u25CF</span> 종가 : ' + func.addCommas(this.y);
                        }else{

                        }
                    }
                    return s;
                },
            },
        }, {
            type: 'column',
            name: 'Volume',
            data: candle_list_volume,
            showInLegend: false,
            yAxis: 1,
            /* dataGrouping: {
                units: groupingUnits
            }, */
            tooltip: {
                pointFormatter: function() {
                    let s = '';
                    if(this.y !== 0){
                        if(this.series.name == 'Volume'){
                            s += '<span style="color:' + this.color + '"> \u25CF</span> 거래량 : ' + func.addCommas(this.y);
                        }else{

                        }
                    }
                    return s;
                },
            },
        }, {
            type: 'line',
            name: 'Line_bb20',
            data: func.lineData3(candle_list, average_20),
            showInLegend: false,
            yAxis: 0,
            /* dataGrouping: {
                units: groupingUnits
            }, */
            marker: {
                width: 2,
                height: 2,
                enabled: false,
                symbol: 'circle',
                radius: 1,
                states: {
                    hover: {
                    }
                }
            },
            color: '#FFE264',
            lineWidth: 0.5,
            tooltip: {
                pointFormatter: function() {
                    return false;
                },
            },
        }, {
            type: 'arearange',
            name: 'Line_bb',
            data: func.areaData(candle_list, bb_up_list, bb_down_list),
            showInLegend: false,
            yAxis: 0,
            /* dataGrouping: {
                units: groupingUnits
            }, */
            lineWidth: 0,
            color: '#f8ebb180',
            tooltip: {
                pointFormatter: function() {
                    return false;
                },
            },
        }, {
            type: 'spline',
            name: '5Days MA',
            data: func.lineData3(candle_list, average_5),
            yAxis: 2,
            /* dataGrouping: {
                units: groupingUnits
            }, */
            marker: {
                width: 2,
                height: 2,
                enabled: false,
                symbol: 'circle',
                radius: 1,
                states: {
                    hover: {
                        enabled: false,
                    }
                }
            },
            color: '#25c930',
            lineWidth: 1,
            tooltip: {
                pointFormatter: function() {
                    return false;
                },
            },
        }, {
            type: 'spline',
            name: '20Days MA',
            data: func.lineData3(candle_list, average_20),
            yAxis: 2,
            /* dataGrouping: {
                units: groupingUnits
            }, */
            marker: {
                width: 2,
                height: 2,
                enabled: false,
                symbol: 'circle',
                radius: 1,
                states: {
                    hover: {
                        enabled: false,
                    }
                }
            },
            color: '#c46a6d',
            lineWidth: 1,
            tooltip: {
                pointFormatter: function() {
                    return false;
                },
            },
        }, {
            type: 'spline',
            name: '60Days MA',
            data: func.lineData3(candle_list, average_60),
            yAxis: 2,
            /* dataGrouping: {
                units: groupingUnits
            }, */
            marker: {
                width: 2,
                height: 2,
                enabled: false,
                symbol: 'circle',
                radius: 1,
                states: {
                    hover: {
                        enabled: false,
                    }
                }
            },
            color: '#c29569',
            lineWidth: 1,
            tooltip: {
                pointFormatter: function() {
                    return false;
                },
            },
        }, {
            type: 'spline',
            name: '120Days MA',
            data: func.lineData3(candle_list, average_120),
            yAxis: 2,
            /* dataGrouping: {
                units: groupingUnits
            }, */
            marker: {
                width: 2,
                height: 2,
                enabled: false,
                symbol: 'circle',
                radius: 1,
                states: {
                    hover: {
                        enabled: false,
                    }
                }
            },
            color: '#C08FFF',
            lineWidth: 1,
            tooltip: {
                pointFormatter: function() {
                    return false;
                },
            },
        }, {
            type: 'spline',
            name: 'Base Line',
            data: func.lineData3(candle_list, baseLine),
            yAxis: 2,
            /* dataGrouping: {
                units: groupingUnits
            }, */
            marker: {
                width: 2,
                height: 2,
                enabled: false,
                symbol: 'circle',
                radius: 1,
                states: {
                    hover: {
                        enabled: false,
                    }
                }
            },
            color: '#8E8E8E',
            lineWidth: 1,
            tooltip: {
                pointFormatter: function() {
                    return false;
                },
            },
        }, {
            type: 'spline',
            name: 'Transition Line',
            data: func.lineData3(candle_list, transitionLine),
            yAxis: 2,
            /* dataGrouping: {
                units: groupingUnits
            }, */
            marker: {
                width: 2,
                height: 2,
                enabled: false,
                symbol: 'circle',
                radius: 1,
                states: {
                    hover: {
                        enabled: false,
                    }
                }
            },
            color: '#658F89',
            lineWidth: 1,
            tooltip: {
                pointFormatter: function() {
                    return false;
                },
            },
        }, {
            type: 'scatter',
            name: 'GoldenCross',
            data: goldenCross_list,
            yAxis: 2,
            /* dataGrouping: {
                units: groupingUnits
            }, */
            marker: {
                symbol: 'triangle',
                fillColor: '#808000',
                radius: 5,
            },
            color: '#808000',
            tooltip: {
                pointFormatter: function() {
                    let s = '';
                    if(this.y !== 0){
                        s += '<span style="color:' + this.color + '"> \u25CF</span> GoldenCross : ' + func.dateForamt2(this.x);
                    }
                    return s;
                },
            },
            states: {
                inactive: {
                  opacity: 1
              }
            },
        }, {
            type: 'scatter',
            name: 'BT-GoldenCross',
            data: bt_goldenCross_list,
            yAxis: 2,
            /* dataGrouping: {
                units: groupingUnits
            }, */
            marker: {
                symbol: 'triangle',
                fillColor: '#adad00',
                radius: 5,
            },
            color: '#adad00',
            tooltip: {
                pointFormatter: function() {
                    let s = '';
                    if(this.y !== 0){
                        s += '<span style="color:' + this.color + '"> \u25CF</span> BT-GoldenCross : ' + func.dateForamt2(this.x);
                    }
                    return s;
                },
            },
            states: {
                inactive: {
                  opacity: 1
              }
            },
        }, {
            type: 'scatter',
            name: 'DisparityGoldenCross',
            data: disparityGoldenCross_list,
            yAxis: 2,
            /* dataGrouping: {
                units: groupingUnits
            }, */
            marker: {
                symbol: 'triangle',
                fillColor: '#ffff00',
                radius: 5,
            },
            color: '#ffff00',
            tooltip: {
                pointFormatter: function() {
                    let s = '';
                    if(this.y !== 0){
                        s += '<span style="color:' + this.color + '"> \u25CF</span> DisparityGoldenCross : ' + func.dateForamt2(this.x);
                    }
                    return s;
                },
            },
            states: {
                inactive: {
                  opacity: 1
              }
            },
        }, {
            type: 'scatter',
            name: 'DeadCross',
            data: deadCross_list,
            yAxis: 2,
            /* dataGrouping: {
                units: groupingUnits
            }, */
            marker: {
                symbol: 'triangle-down',
                fillColor: '#a5a5a5',
                radius: 5,
            },
            color: '#a5a5a5',
            tooltip: {
                pointFormatter: function() {
                    let s = '';
                    if(this.y !== 0){
                        s += '<span style="color:' + this.color + '"> \u25CF</span> DeadCross : ' + func.dateForamt2(this.x);
                    }
                    return s;
                },
            },
            states: {
                inactive: {
                  opacity: 1
              }
            },
        }, {
            type: 'scatter',
            name: 'BT-DeadCross',
            data: bt_deadCross_list,
            yAxis: 2,
            /* dataGrouping: {
                units: groupingUnits
            }, */
            marker: {
                symbol: 'triangle-down',
                fillColor: '#585858',
                radius: 5,
            },
            color: '#585858',
            tooltip: {
                pointFormatter: function() {
                    let s = '';
                    if(this.y !== 0){
                        s += '<span style="color:' + this.color + '"> \u25CF</span> BT-DeadCross : ' + func.dateForamt2(this.x);
                    }
                    return s;
                },
            },
            states: {
                inactive: {
                  opacity: 1
              }
            },
        }, {
            type: 'scatter',
            name: 'DisparityDeadCross',
            data: disparityDeadCross_list,
            yAxis: 2,
            /* dataGrouping: {
                units: groupingUnits
            }, */
            marker: {
                symbol: 'triangle-down',
                fillColor: '#1d1d1d',
                radius: 5,
            },
            color: '#1d1d1d',
            tooltip: {
                pointFormatter: function() {
                    let s = '';
                    if(this.y !== 0){
                        s += '<span style="color:' + this.color + '"> \u25CF</span> DisparityDeadCross : ' + func.dateForamt2(this.x);
                    }
                    return s;
                },
            },
            states: {
                inactive: {
                  opacity: 1
              }
            },
        },{
            type: 'scatter',
            name: 'ParabolicSAR',
            data: parabolicSAR_list,
            yAxis: 0,
            /* dataGrouping: {
                units: groupingUnits
            }, */
            marker: {
                symbol: 'circle',
                fillColor: '#ed2969',
                radius: 2,
            },
            color: '#ed2969',
            tooltip: {
                pointFormatter: function() {
                    let s = '';
                    if(this.y !== 0){
                        s += '<span style="color:' + this.color + '"> \u25CF</span> ParabolicSAR : ' + func.dateForamt2(this.x);
                    }
                    return s;
                },
            },
            states: {
                inactive: {
                  opacity: 1
              }
            },
        },
        ],

        plotOptions: {
            candlestick: {
                // lineColor: 'black', // 캔들스틱의 윤곽선 색상 설정
                // 상승과 하락 시 색상 설정
                colors: {
                    upward: '#e00400', // 상승할 때의 색상
                    downward: '#003ace' // 하락할 때의 색상
                }
            },
            line: {
                states: {
                  hover: {
                    halo: {
                      size: 1
                    }
                  }
                },
            },
            spline: {
                states: {
                  hover: {
                    halo: {
                      size: 1
                    }
                  }
                },
            }
        },
        credits: {
            enabled: false
        },
    });
}
/* createChart */

/* createChart_average */
function createChart_average(title, date_list, average_5, average_20, average_60, average_120, baseLine, transitionLine, goldenCross_list, deadCross_list, bt_goldenCross_list, bt_deadCross_list, min_lopr, max_hipr, bb_up_list, bb_down_list, disparityGoldenCross_list, disparityDeadCross_list) {
    const ctx = document.getElementById('chart2');
    const totalDuration = 2000;
    const delayBetweenPoints = totalDuration / date_list.length;
    const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
    const animation = {
        x: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: NaN, // the point is initially skipped
            delay(ctx) {
                if (ctx.type !== 'data' || ctx.xStarted) {
                    return 0;
                }
                ctx.xStarted = true;
                return ctx.index * delayBetweenPoints;
            }
        },
        y: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: previousY,
            delay(ctx) {
                if (ctx.type !== 'data' || ctx.yStarted) {
                    return 0;
                }
                ctx.yStarted = true;
                return ctx.index * delayBetweenPoints;
            }
        }
    };

    /* 최소값, 최대값 평균 */
    let average = (min_lopr + max_hipr) / 2;
    let temp_val = 1;
    for (let a = 0; a < average.toString().length - 2; a++) {
        temp_val *= 10;
    }

    min_lopr -= temp_val;
    max_hipr += temp_val;

    /* 차트 Y축 최대값, 최소값 설정 */
    let max_bb_up = Math.max(...bb_up_list) + (temp_val * 2);
    let min_bb_dwon = Math.min(...bb_down_list) - (temp_val * 2);

    let step_size = func.tick_cal(average);

    let zoomOptions2 = {
        limits: {
            y: { min: min_bb_dwon, max: max_bb_up, minRange: 50 }
        },
        zoom: {
            wheel: {
                enabled: true,
            },
            pinch: {
                enabled: true,
            },
            mode: 'xy',
        },
        pan: {
            enabled: true,
            mode: 'xy',
        }
    };

    chart2 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: date_list,
            datasets: [
                {
                    label: '5Days MA',
                    data: average_5,
                    borderColor: "#25c930",
                    backgroundColor: "#25c930",
                    borderWidth: 1,
                    pointRadius: 0,
                    radius: 0,
                    hoverRadius: 1,
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.9
                },
                {
                    label: '20Days MA',
                    data: average_20,
                    borderColor: "#c46a6d",
                    backgroundColor: "#c46a6d",
                    borderWidth: 1,
                    pointRadius: 0,
                    radius: 0,
                    hoverRadius: 1,
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.9
                },
                {
                    label: '60Days MA',
                    data: average_60,
                    borderColor: "#c29569",
                    backgroundColor: "#c29569",
                    borderWidth: 1,
                    pointRadius: 0,
                    radius: 0,
                    hoverRadius: 1,
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.9
                },
                {
                    label: '120Days MA',
                    data: average_120,
                    borderColor: "#C08FFF",
                    backgroundColor: "#C08FFF",
                    borderWidth: 1,
                    pointRadius: 0,
                    radius: 0,
                    hoverRadius: 1,
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.9
                },
                {
                    label: 'Base Line',
                    data: baseLine,
                    borderColor: "#8E8E8E",
                    backgroundColor: "#8E8E8E",
                    borderWidth: 1,
                    pointRadius: 0,
                    radius: 0,
                    hoverRadius: 1,
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.9
                },
                {
                    label: 'Transition Line',
                    data: transitionLine,
                    borderColor: "#658F89",
                    backgroundColor: "#658F89",
                    borderWidth: 1,
                    pointRadius: 0,
                    radius: 0,
                    hoverRadius: 1,
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.9
                },
                {
                    label: 'GoldenCross',
                    data: goldenCross_list,
                    borderColor: "#808000",
                    backgroundColor: "#808000",
                    pointStyle: 'triangle',
                    borderWidth: 1,
                    pointRadius: 8,
                    hoverRadius: 9,
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.9
                },
                {
                    label: 'BT-GoldenCross',
                    data: bt_goldenCross_list,
                    borderColor: "#adad00",
                    backgroundColor: "#adad00",
                    pointStyle: 'triangle',
                    borderWidth: 1,
                    pointRadius: 8,
                    hoverRadius: 9,
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.9
                },
                {
                    label: 'DisparityGoldenCross',
                    data: disparityGoldenCross_list,
                    borderColor: "#ffff00",
                    backgroundColor: "#ffff00",
                    pointStyle: 'triangle',
                    borderWidth: 1,
                    pointRadius: 8,
                    hoverRadius: 9,
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.9
                },
                {
                    label: 'DeadCross',
                    data: deadCross_list,
                    borderColor: "#a5a5a5",
                    backgroundColor: "#a5a5a5",
                    pointStyle: 'crossRot',
                    borderWidth: 3,
                    pointRadius: 8,
                    hoverRadius: 9,
                    hoverBorderWidth: 4,
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.9
                },
                {
                    label: 'BT-DeadCross',
                    data: bt_deadCross_list,
                    borderColor: "#585858",
                    backgroundColor: "#585858",
                    pointStyle: 'crossRot',
                    borderWidth: 3,
                    pointRadius: 8,
                    hoverRadius: 9,
                    hoverBorderWidth: 4,
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.9
                },
                {
                    label: 'DisparityDeadCross',
                    data: disparityDeadCross_list,
                    borderColor: "#1d1d1d",
                    backgroundColor: "#1d1d1d",
                    pointStyle: 'crossRot',
                    borderWidth: 3,
                    pointRadius: 8,
                    hoverRadius: 9,
                    hoverBorderWidth: 4,
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.9
                },
            ]
        },
        options: {
            animation,
            maintainAspectRatio: false,
            interaction: {
                intersect: false
            },
            responsive: true,
            plugins: {
                title: {
                    display: false,
                    text: title
                },
                legend: {
                    display: true,
                },
                zoom: zoomOptions2,
            },
            scales: {
                y: {
                    min: min_bb_dwon, // Y 축의 최소값
                    max: max_bb_up, // Y 축의 최대값
                    ticks: {
                        stepSize: step_size
                    }
                }
            }
        }
    });
}
/* createChart_average */