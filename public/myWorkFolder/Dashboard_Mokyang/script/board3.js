(function ($) {
    "use strict";

    function people_text(data) {
        if (data == 0 || !data) return '0<span style="font-size: 12px;">명</span>';
        return data + '<span style="font-size: 12px;">명</span>';
    }

    window.toast_chart = {
        chart1: function () {
            let targetData1 = new Array();
            targetData1 = [639, 236, 100, 60, 10, 39, 10, 13, 171]

            let bool_data1 = targetData1[1] == 0 ? false : true;
            let bool_data2 = targetData1[2] == 0 ? false : true;
            let bool_data3 = targetData1[3] == 0 ? false : true;
            let bool_data4 = targetData1[4] == 0 ? false : true;
            let bool_data5 = targetData1[5] == 0 ? false : true;
            let bool_data6 = targetData1[6] == 0 ? false : true;
            let bool_data7 = targetData1[7] == 0 ? false : true;
            let bool_data8 = targetData1[8] == 0 ? false : true;

            let el = document.getElementById('chart-area1');
            let data = {
                categories: ['인원현황(공종별)'],
                series: [
                    {
                        name: '건축',
                        data: targetData1[1],
                        visible: bool_data1
                    },
                    {
                        name: '토목',
                        data: targetData1[2],
                        visible: bool_data2
                    },
                    {
                        name: '기계',
                        data: targetData1[3],
                        visible: bool_data3
                    },
                    {
                        name: '조경',
                        data: targetData1[4],
                        visible: bool_data4
                    },
                    {
                        name: '전기',
                        data: targetData1[5],
                        visible: bool_data5
                    },
                    {
                        name: '통신',
                        data: targetData1[6],
                        visible: bool_data6
                    },
                    {
                        name: '소방',
                        data: targetData1[7],
                        visible: bool_data7
                    },
                    {
                        name: '기타',
                        data: targetData1[8],
                        visible: bool_data8
                    },
                ],
            };
            let options = {
                chart: { width: 260, height: 260 },
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

            $('#chart1_total_cnt').html(targetData1[0]);
            $('#chart1_cnt1').html(targetData1[1]);
            $('#chart1_cnt2').html(targetData1[2]);
            $('#chart1_cnt3').html(targetData1[3]);
            $('#chart1_cnt4').html(targetData1[4]);
            $('#chart1_cnt5').html(targetData1[5]);
            $('#chart1_cnt6').html(targetData1[6]);
            $('#chart1_cnt7').html(targetData1[7]);
            $('#chart1_cnt8').html(targetData1[8]);

            $('#chart1_rate1').html(targetData1[9]);
            $('#chart1_rate2').html(targetData1[10]);
            $('#chart1_rate3').html(targetData1[11]);
            $('#chart1_rate4').html(targetData1[12]);
            $('#chart1_rate5').html(targetData1[13]);
            $('#chart1_rate6').html(targetData1[14]);
            $('#chart1_rate7').html(targetData1[15]);
            $('#chart1_rate8').html(targetData1[16]);
        },
        chart2: function () {
            let targetData2 = new Array();
            targetData2 = [639, 34, 76, 72, 126, 257, 73, 1];

            let bool_data1 = targetData2[1] == 0 ? false : true;
            let bool_data2 = targetData2[2] == 0 ? false : true;
            let bool_data3 = targetData2[3] == 0 ? false : true;
            let bool_data4 = targetData2[4] == 0 ? false : true;
            let bool_data5 = targetData2[5] == 0 ? false : true;
            let bool_data6 = targetData2[6] == 0 ? false : true;
            let bool_data7 = targetData2[7] == 0 ? false : true;

            let el = document.getElementById('chart-area2');
            let data = {
                categories: ['인원현황(연령별)'],
                series: [
                    {
                        name: '~29',
                        data: targetData2[1],
                        visible: bool_data1
                    },
                    {
                        name: '30~39',
                        data: targetData2[2],
                        visible: bool_data2
                    },
                    {
                        name: '40~49',
                        data: targetData2[3],
                        visible: bool_data3
                    },
                    {
                        name: '50~59',
                        data: targetData2[4],
                        visible: bool_data4
                    },
                    {
                        name: '60~69',
                        data: targetData2[5],
                        visible: bool_data5
                    },
                    {
                        name: '70~79',
                        data: targetData2[6],
                        visible: bool_data6
                    },
                    {
                        name: '80이상',
                        data: targetData2[7],
                        visible: bool_data7
                    },
                ],
            };
            let options = {
                chart: { width: 260, height: 260 },
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

            $('#chart2_total_cnt').html(targetData2[0]);
            $('#chart2_cnt1').html(targetData2[1]);
            $('#chart2_cnt2').html(targetData2[2]);
            $('#chart2_cnt3').html(targetData2[3]);
            $('#chart2_cnt4').html(targetData2[4]);
            $('#chart2_cnt5').html(targetData2[5]);
            $('#chart2_cnt6').html(targetData2[6]);
            $('#chart2_cnt7').html(targetData2[7]);
        },
        chart3: function () {
            let targetData3 = new Array();
            targetData3 = [639, 210, 410, 19, 32.9, 64.2, 3];

            let bool_data1 = targetData3[1] == 0 ? false : true;
            let bool_data2 = targetData3[2] == 0 ? false : true;
            let bool_data3 = targetData3[3] == 0 ? false : true;

            let el = document.getElementById('chart-area3');
            let data = {
                categories: ['인원현황(직무별)'],
                series: [
                    {
                        name: '본사',
                        data: targetData3[1],
                        visible: bool_data1
                    },
                    {
                        name: '현장',
                        data: targetData3[2],
                        visible: bool_data2
                    },
                    {
                        name: '기타',
                        data: targetData3[3],
                        visible: bool_data3
                    },
                ],
            };
            let options = {
                chart: { width: 260, height: 260 },
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

            $('#chart3_total_cnt').html(targetData3[0]);
            $('#chart3_cnt1').html(targetData3[1]);
            $('#chart3_cnt2').html(targetData3[2]);
            $('#chart3_cnt3').html(targetData3[3]);

            $('#chart3_rate1').html(targetData3[4]);
            $('#chart3_rate2').html(targetData3[5]);
            $('#chart3_rate3').html(targetData3[6]);
        },
        chart4: function () {
            let varPlanData = new Array();
            let varRealData = new Array();
            let varIncData = new Array();
            varPlanData = [100, 122, 113, 115, 118, 132, 134, 141, 150, 144, 123, 119, 126]
            varRealData = [88, 111, 111, 113, 118, 125, 135, 140, 134, 138, 138, 125, 123]
            varIncData = [-12, -11, -2, -2, 0, -7, 1, -1, -16, -6, 15, 5, -3]

            $("#plan01").html(people_text(varPlanData[0]));
            $("#plan02").html(people_text(varPlanData[1]));
            $("#plan03").html(people_text(varPlanData[2]));
            $("#plan04").html(people_text(varPlanData[3]));
            $("#plan05").html(people_text(varPlanData[4]));
            $("#plan06").html(people_text(varPlanData[5]));
            $("#plan07").html(people_text(varPlanData[6]));
            $("#plan08").html(people_text(varPlanData[7]));
            $("#plan09").html(people_text(varPlanData[8]));
            $("#plan10").html(people_text(varPlanData[9]));
            $("#plan11").html(people_text(varPlanData[10]));
            $("#plan12").html(people_text(varPlanData[11]));
            $("#planAvg").html(people_text(varPlanData[12]));

            $("#real01").html(people_text(varRealData[0]));
            $("#real02").html(people_text(varRealData[1]));
            $("#real03").html(people_text(varRealData[2]));
            $("#real04").html(people_text(varRealData[3]));
            $("#real05").html(people_text(varRealData[4]));
            $("#real06").html(people_text(varRealData[5]));
            $("#real07").html(people_text(varRealData[6]));
            $("#real08").html(people_text(varRealData[7]));
            $("#real09").html(people_text(varRealData[8]));
            $("#real10").html(people_text(varRealData[9]));
            $("#real11").html(people_text(varRealData[10]));
            $("#real12").html(people_text(varRealData[11]));
            $("#realAvg").html(people_text(varRealData[12]));

            $("#inc01").html(people_text(varIncData[0]));
            $("#inc02").html(people_text(varIncData[1]));
            $("#inc03").html(people_text(varIncData[2]));
            $("#inc04").html(people_text(varIncData[3]));
            $("#inc05").html(people_text(varIncData[4]));
            $("#inc06").html(people_text(varIncData[5]));
            $("#inc07").html(people_text(varIncData[6]));
            $("#inc08").html(people_text(varIncData[7]));
            $("#inc09").html(people_text(varIncData[8]));
            $("#inc10").html(people_text(varIncData[9]));
            $("#inc11").html(people_text(varIncData[10]));
            $("#inc12").html(people_text(varIncData[11]));
            $("#incAvg").html(people_text(varIncData[12]));

            let el = document.getElementById('chart-area4');

            let data = {
                categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월', '평균'],
                series: [
                    {
                        name: '사업계획',
                        data: varPlanData
                    },
                    {
                        name: '실운영인원',
                        data: varRealData
                    },
                ]
            }

            let options = {
                chart: { width: 1640, height: 200 },
                legend: {
                    visible: false
                },
                exportMenu: {
                    visible: false
                },
                series: {
                    dataLabels: { visible: true },
                }
            };

            $('#chart-area4').empty();
            const chart4 = toastui.Chart.columnChart({ el, data, options });

        },
    }
})(jQuery);

$(document).ready(function () {
window.toast_chart.chart1();
window.toast_chart.chart2();
window.toast_chart.chart3();
window.toast_chart.chart4();
})