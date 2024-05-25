(function($){
    "use strict";
    let zoneData = new Array();
    zoneData[0] = 16;
    zoneData[1] = 4;
    zoneData[2] = 9;
    zoneData[3] = 35;
    zoneData[4] = 5;
    zoneData[5] = 6;
    zoneData[6] = 1;
    zoneData[7] = 5;
    zoneData[8] = 9;
    zoneData[9] = 6;
    zoneData[10] = 7;
    zoneData[11] = 0;
    zoneData[12] = 4;
    zoneData[13] = 6;
    zoneData[14] = 15;
    zoneData[15] = 1;
    zoneData[16] = 1;
    zoneData[17] = 0;
    zoneData[18] = 1;
    zoneData[19] = 46; // 기타
    zoneData[20] = 0; // 해외

    window.toast_chart = {
        chart1 : function(){
            let bool_data0 = zoneData[0] == 0 ? false : true;
            let bool_data1 = zoneData[1] == 0 ? false : true;
            let bool_data2 = zoneData[2] == 0 ? false : true;
            let bool_data3 = zoneData[3] == 0 ? false : true;
            let bool_data4 = zoneData[4] == 0 ? false : true;
            let bool_data5 = zoneData[5] == 0 ? false : true;
            let bool_data6 = zoneData[6] == 0 ? false : true;
            let bool_data7 = zoneData[7] == 0 ? false : true;
            let bool_data8 = zoneData[8] == 0 ? false : true;
            let bool_data9 = zoneData[9] == 0 ? false : true;
            let bool_data10 = zoneData[10] == 0 ? false : true;
            let bool_data11 = zoneData[11] == 0 ? false : true;
            let bool_data12 = zoneData[12] == 0 ? false : true;
            let bool_data13 = zoneData[13] == 0 ? false : true;
            let bool_data14 = zoneData[14] == 0 ? false : true;
            let bool_data15 = zoneData[15] == 0 ? false : true;
            let bool_data16 = zoneData[16] == 0 ? false : true;
            let bool_data17 = zoneData[17] == 0 ? false : true;
            let bool_data18 = zoneData[18] == 0 ? false : true;
            let bool_data19 = zoneData[19] == 0 ? false : true;
            
            let el = document.getElementById('chart-area1');
            let data = {
                categories: ['지역별 사업분포'],
                series: [
                    {name: '서울', data: zoneData[0],visible: bool_data0},
                    {name: '부산', data: zoneData[1],visible: bool_data1},
                    {name: '인천', data: zoneData[2],visible: bool_data2},
                    {name: '경기', data: zoneData[3],visible: bool_data3},
                    {name: '충남', data: zoneData[4],visible: bool_data4},
                    {name: '충북', data: zoneData[5],visible: bool_data5},
                    {name: '세종', data: zoneData[6],visible: bool_data6},
                    {name: '대전', data: zoneData[7],visible: bool_data7},
                    {name: '강원', data: zoneData[8],visible: bool_data8},
                    {name: '경남', data: zoneData[9],visible: bool_data9},
                    {name: '경북', data: zoneData[10],visible: bool_data10},
                    {name: '울산', data: zoneData[11],visible: bool_data11},
                    {name: '대구', data: zoneData[12],visible: bool_data12},
                    {name: '전남', data: zoneData[13],visible: bool_data13},
                    {name: '전북', data: zoneData[14],visible: bool_data14},
                    {name: '광주', data: zoneData[15],visible: bool_data15},
                    {name: '제주', data: zoneData[16],visible: bool_data16},
                    {name: '을룽군', data: zoneData[17],visible: bool_data17},
                    {name: '해외', data: zoneData[18],visible: bool_data18},
                    {name: '기타', data: zoneData[19],visible: bool_data19},
                ],
            };
            let options = {
            chart: { width: 300, height: 300 },
                series: {
                    radiusRange: {
                        inner: '60%',
                        outer: '100%',
                    }, showLabel: true
                },
                legend: {
                    visible: false
                },
                    exportMenu: {
                        visible: false
                    },
                };
        
            $('#chart-area1').empty();
            const chart1 = toastui.Chart.pieChart({ el, data, options });
                
            $('#chart1_total_cnt').html(176);
            $('#chart1_cnt0').html(zoneData[0]);
            $('#chart1_cnt1').html(zoneData[1]);
            $('#chart1_cnt2').html(zoneData[2]);
            $('#chart1_cnt3').html(zoneData[3]);
            $('#chart1_cnt4').html(zoneData[4]);
            $('#chart1_cnt5').html(zoneData[5]);
            $('#chart1_cnt6').html(zoneData[6]);
            $('#chart1_cnt7').html(zoneData[7]);
            $('#chart1_cnt8').html(zoneData[8]);
            $('#chart1_cnt9').html(zoneData[9]);
            $('#chart1_cnt10').html(zoneData[10]);
            $('#chart1_cnt11').html(zoneData[11]);
            $('#chart1_cnt12').html(zoneData[12]);
            $('#chart1_cnt13').html(zoneData[13]);
            $('#chart1_cnt14').html(zoneData[14]);
            $('#chart1_cnt15').html(zoneData[15]);
            $('#chart1_cnt16').html(zoneData[16]);
            $('#chart1_cnt17').html(zoneData[17]);
            $('#chart1_cnt18').html(zoneData[18]);
            $('#chart1_cnt19').html(zoneData[19]);
            $('#chart1_cnt20').html(zoneData[20]);
                
            $('#chart1_rate0').html(9.1);
            $('#chart1_rate1').html(2.3);
            $('#chart1_rate2').html(5.1);
            $('#chart1_rate3').html(19.9);
            $('#chart1_rate4').html(2.8);
            $('#chart1_rate5').html(3.4);
            $('#chart1_rate6').html(0.6);
            $('#chart1_rate7').html(2.8);
            $('#chart1_rate8').html(5.1);
            $('#chart1_rate9').html(3.4);
            $('#chart1_rate10').html(4);
            $('#chart1_rate11').html(0);
            $('#chart1_rate12').html(2.3);
            $('#chart1_rate13').html(3.4);
            $('#chart1_rate14').html(8.5);
            $('#chart1_rate15').html(0.6);
            $('#chart1_rate16').html(0.6);
            $('#chart1_rate17').html(0);
            $('#chart1_rate18').html(0); // 해외
            $('#chart1_rate19').html(26.1); // 기타
        },
        chart2 : function(){
            let typeData = new Array();
            typeData[0] = 176;
            typeData[1] = 99;
            typeData[2] = 19;
            typeData[3] = 2;
            typeData[4] = 14;
            typeData[5] = 2;
            typeData[6] = 0;
            typeData[7] = 40;
            typeData[8] = 56.3;
            typeData[9] = 10.8;
            typeData[10] = 1.1;
            typeData[11] = 8;
            typeData[12] = 1.1;
            typeData[13] = 0;
            typeData[14] = 22.7;
                   
            let bool_data1 = typeData[1] == 0 ? false : true;
            let bool_data2 = typeData[2] == 0 ? false : true;
            let bool_data3 = typeData[3] == 0 ? false : true;
            let bool_data4 = typeData[4] == 0 ? false : true;
            let bool_data5 = typeData[5] == 0 ? false : true;
            let bool_data6 = typeData[6] == 0 ? false : true;
            let bool_data7 = typeData[7] == 0 ? false : true;
            
            let el = document.getElementById('chart-area2');
            let data = {
                categories: ['사업 유형별 분포'],
                series: [
                    {
                        name: '건진법',
                        data: typeData[1],
                        visible: bool_data1
                    },
                    {
                        name: '주택법',
                        data: typeData[2],
                        visible: bool_data2
                    },
                    {
                        name: '건축법',
                        data: typeData[3],
                        visible: bool_data3
                    },
                    {
                        name: '전력법',
                        data: typeData[4],
                        visible: bool_data4
                    },
                    {
                        name: '소방법',
                        data: typeData[5],
                        visible: bool_data5
                    },
                    {
                        name: '통신법',
                        data: typeData[6],
                        visible: bool_data6
                    },
                    {
                        name: '기타',
                        data: typeData[7],
                        visible: bool_data7
                    },
                ],
            };
            let options = {
                chart: { width: 230, height: 230 },
                series: {
                    radiusRange: {
                        inner: '60%',
                        outer: '100%',
                    }, showLabel: true
                },
                legend: {
                    visible: false
                },
                exportMenu: {
                    visible: false
                },
            };
                
            $('#chart-area2').empty();
            const chart2 = toastui.Chart.pieChart({ el, data, options });
            let fontsize = 2//String(typeData[0]).length;
            if(fontsize >= 2){
                $(".cart_total_cnt_small").css("font-size","27px");
            }
            
            $('#chart2_total_cnt').html(typeData[0]);
            $('#chart2_cnt1').html(typeData[1]);
            $('#chart2_cnt2').html(typeData[2]);
            $('#chart2_cnt3').html(typeData[3]);
            $('#chart2_cnt4').html(typeData[4]);
            $('#chart2_cnt5').html(typeData[5]);
            $('#chart2_cnt6').html(typeData[6]);
            $('#chart2_cnt7').html(typeData[7]);
            
            $('#chart2_rate1').html(typeData[8]);
            $('#chart2_rate2').html(typeData[9]);
            $('#chart2_rate3').html(typeData[10]);
            $('#chart2_rate4').html(typeData[11]);
            $('#chart2_rate5').html(typeData[12]);
            $('#chart2_rate6').html(typeData[13]);
            $('#chart2_rate7').html(typeData[14]);
        },
        chart3 : function(){
            let orderTypeData = new Array();
            orderTypeData[0] = 176;
            orderTypeData[1] = 41;
            orderTypeData[2] = 16;
            orderTypeData[3] = 21;
            orderTypeData[4] = 14;
            orderTypeData[5] = 20;
            orderTypeData[6] = 20;
            orderTypeData[7] = 2;
            orderTypeData[8] = 1;
            orderTypeData[9] = 41;
            orderTypeData[10] = 23.3;
            orderTypeData[11] = 9.1;
            orderTypeData[12] = 11.9;
            orderTypeData[13] = 8;
            orderTypeData[14] = 11.4;
            orderTypeData[15] = 11.4;
            orderTypeData[16] = 1.1;
            orderTypeData[17] = 0.6;
            orderTypeData[18] = 23.3;
                   
            let bool_data1 = orderTypeData[1] == 0 ? false : true;
            let bool_data2 = orderTypeData[2] == 0 ? false : true;
            let bool_data3 = orderTypeData[3] == 0 ? false : true;
            let bool_data4 = orderTypeData[4] == 0 ? false : true;
            let bool_data5 = orderTypeData[5] == 0 ? false : true;
            let bool_data6 = orderTypeData[6] == 0 ? false : true;
            let bool_data7 = orderTypeData[7] == 0 ? false : true;
            let bool_data8 = orderTypeData[8] == 0 ? false : true;
            let bool_data9 = orderTypeData[9] == 0 ? false : true;
                
            let el = document.getElementById('chart-area3');
            let data = {
                categories: ['사업 구분별 분포'],
                series: [
                    { name: '건진법', data: orderTypeData[1], visible: bool_data1 },
                    { name: '국방', data: orderTypeData[2], visible: bool_data2 },
                    { name: '도시공사', data: orderTypeData[3], visible: bool_data3 },
                    { name: '전력법', data: orderTypeData[4], visible: bool_data4 },
                    { name: '주택법', data: orderTypeData[5], visible: bool_data5 },
                    { name: '토목', data: orderTypeData[6], visible: bool_data6 },
                    { name: '소방법', data: orderTypeData[7], visible: bool_data7 },
                    { name: '건축법', data: orderTypeData[8], visible: bool_data8 },
                    { name: '기타', data: orderTypeData[9], visible: bool_data9 },
                ],
            };
            let options = {
                chart: { width: 230, height: 230 },
                series: {
                    radiusRange: {
                        inner: '60%',
                        outer: '100%',
                    }, showLabel: true
                },
                legend: {
                    visible: false
                },
                exportMenu: {
                        visible: false
                    },
            };
            
            $('#chart-area3').empty();
            const chart3 = toastui.Chart.pieChart({ el, data, options });
            
            let fontsize = String(orderTypeData[0]).length;
            
                if(fontsize >= 2){
                    $(".cart_total_cnt_small").css("font-size","27px");
                }
                
            $('#chart3_total_cnt').html(orderTypeData[0]);
            $('#chart3_cnt1').html(orderTypeData[1]);
            $('#chart3_cnt2').html(orderTypeData[2]);
            $('#chart3_cnt3').html(orderTypeData[3]);
            $('#chart3_cnt4').html(orderTypeData[4]);
            $('#chart3_cnt5').html(orderTypeData[5]);
            $('#chart3_cnt6').html(orderTypeData[6]);
            $('#chart3_cnt7').html(orderTypeData[7]);
            $('#chart3_cnt8').html(orderTypeData[8]);
            $('#chart3_cnt9').html(orderTypeData[9]);
            
            $('#chart3_rate1').html(orderTypeData[10]);
            $('#chart3_rate2').html(orderTypeData[11]);
            $('#chart3_rate3').html(orderTypeData[12]);
            $('#chart3_rate4').html(orderTypeData[13]);
            $('#chart3_rate5').html(orderTypeData[14]);
            $('#chart3_rate6').html(orderTypeData[15]);
            $('#chart3_rate7').html(orderTypeData[16]);
            $('#chart3_rate8').html(orderTypeData[17]);
            $('#chart3_rate9').html(orderTypeData[18]);
        },
    }

    function map_data_setting(){
        $("#seoul").html("<div class='triangle'></div><div class='triangle'></div><span class='count_span'>"+zoneData[0]+"</span>"+"<br/><br/><br/><br/><br/><span class='count_city count_city_length'>서울</span>");
        $("#gyeonggi").html("<div class='triangle'></div><span class='count_span'>"+zoneData[3]+"</span>"+"<br/><br/><br/><br/><br/><span class='count_city count_city_length'>경기도</span>");
        $("#incheon").html("<div class='triangle'></div><span class='count_span'>"+zoneData[2]+"</span>"+"<br/><br/><br/><br/><br/><span  class='count_city count_city_length'>인천</span>");
        $("#gangwon").html("<div class='triangle'></div><span class='count_span'>"+zoneData[8]+"</span>"+"<br/><br/><br/><br/><br/><span  class='count_city count_city_length'>강원도</span>");
        $("#chungnam").html("<div class='triangle'></div><span class='count_span'>"+zoneData[4]+"</span>"+"<br/><br/><br/><br/><br/><span class='count_city count_city_length'>충청남도</span>");
        $("#chungbuk").html("<div class='triangle'></div><span class='count_span'>"+zoneData[5]+"</span>"+"<br/><br/><br/><br/><br/><span class='count_city count_city_length'>충청북도</span>");
        $("#daejeon").html("<div class='triangle'></div><span class='count_span'>"+zoneData[7]+"</span>"+"<br/><br/><br/><br/><br/><span  class='count_city count_city_length'>대전</span>");
        $("#sejong").html("<div class='triangle'></div><span class='count_span'>"+zoneData[6]+"</span>"+"<br/><br/><br/><br/><br/><span   class='count_city count_city_length'>세종</span>");
        $("#gyeongnam").html("<div class='triangle'></div><span class='count_span'>"+zoneData[9]+"</span>"+"<br/><br/><br/><br/><br/><span class='count_city count_city_length'>경상남도</span>");
        $("#gyeongbuk").html("<div class='triangle'></div><span class='count_span'>"+zoneData[10]+"</span>"+"<br/><br/><br/><br/><br/><span class='count_city count_city_length'>경상북도</span>");
        $("#busan").html("<div class='triangle'></div><span class='count_span'>"+zoneData[1]+"</span>"+"<br/><br/><br/><br/><br/><span  class='count_city count_city_length'>부산</span>");
        $("#daegu").html("<div class='triangle'></div><span class='count_span'>"+zoneData[12]+"</span>"+"<br/><br/><br/><br/><br/><span class='count_city count_city_length'>대구</span>");
        $("#ulsan").html("<div class='triangle'></div><span class='count_span'>"+zoneData[11]+"</span>"+"<br/><br/><br/><br/><br/><span class='count_city count_city_length'>울산</span>");
        $("#gwangju").html("<div class='triangle'></div><span class='count_span'>"+zoneData[15]+"</span>"+"<br/><br/><br/><br/><br/><span class='count_city count_city_length'>광주</span>");
        $("#jeonnam").html("<div class='triangle'></div><span class='count_span'>"+zoneData[13]+"</span>"+"<br/><br/><br/><br/><br/><span class='count_city count_city_length'>전라남도</span>");
        $("#jeonbuk").html("<div class='triangle'></div><span class='count_span'>"+zoneData[14]+"</span>"+"<br/><br/><br/><br/><br/><span class='count_city count_city_length'>전라북도</span>");
        $("#jeju").html("<div class='triangle'></div><span class='count_span'>"+zoneData[16]+"</span>"+"<br/><br/><br/><br/><br/><span    class='count_city count_city_length'>제주도</span>");
        $("#ulleung").html("<div class='triangle'></div><span class='count_span'>"+zoneData[17]+"</span>"+"<br/><br/><br/><br/><br/><span class='count_city count_city_length'>울릉군</span>");
        $("#overseas").html("<div class='triangle'></div><span class='count_span'>"+zoneData[18]+"</span>"+"<br/><br/><br/><br/><br/><span class='count_city count_city_length'>해외</span>");
        $("#etc").html("<div class='triangle'></div><span class='count_span'>"+zoneData[19]+"</span>"+"<br/><br/><br/><br/><br/><span class='count_city count_city_length'>기타</span>");
    }

    map_data_setting();

})(jQuery);

$(document).ready(function () {
    window.toast_chart.chart1();
    window.toast_chart.chart2();
    window.toast_chart.chart3();
    
    /* 
        프로젝트 count 가 2자리 이상일시 위치 조정 (가운대)
    */
    let mapKrList = $("#map_kr").children();
    for(let i = 0 ; i < mapKrList.length; i++){
        let spanElement = $(mapKrList[i]).children(".count_span");
        
        if(spanElement.text().length >= 2){
            spanElement.css("margin-left","-9px");
        }
            
    }
    
})