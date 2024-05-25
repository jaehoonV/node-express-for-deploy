$(document).ready(function () {
    /* year = new Date().getFullYear(); */
    year = '2021';

    $('.year_span').text(year);
    getContractData();
});

var year = null;

function num_data_form(n) {
    if (n == 0 || n == undefined) return '';
    if (isNaN(n)) n = 0;
    let num = num_100m(n);
    return unit_100m(round_2(num));
}

function func_rate(data, target) { /* 달성율  */
    if (data == undefined || data == 0 || target == 0 || !target) return '0%'
    let num = num_100m(data) / target * 100;
    return round_2(num) + '%';
}

function func_rate2(data1, data2) { /* 법인별 수주계약  */
    if (data1 == 0 || data2 == 0) return '0%'
    let num = data1 / data2 * 100;
    return round_2(num) + '%';
}

function num_100m(n) { /* 억원 */
    return n / 100000000;
}

function unit_100m(n) { /* 억원 표시*/
    return n + '억';
}

function round_2(n) { /* 소수점 둘째자리 */
    return Math.round(n * 100) / 100;
}


// 수주현황보고
function getContractData() {
    /* CM용역 */
    let cs_data = new Array(); // 서울
    let cj_data = new Array(); // 전북
    let cg_data = new Array(); // 경기
    let cc_data = new Array(); // 전남
    let c_total_data = new Array(14).fill(0); // 소계

    /* 설계용역 */
    let as_data = new Array(); // 서울
    let aj_data = new Array(); // 전북
    let ag_data = new Array(); // 경기
    let ac_data = new Array(); // 전남
    let a_total_data = new Array(14).fill(0); // 소계

    /* 총계 */
    let total_data = new Array(14).fill(0);

    /* 수주목표액 */
    let target_data = new Array(14).fill(0);

    cg_data[0] = "";
    cg_data[1] = 3743439364;
    cg_data[2] = 5498965136;
    cg_data[3] = 4292508909;
    cg_data[4] = 858558673;
    cg_data[5] = 1033618909;
    cg_data[6] = 351708727;
    cg_data[7] = 1703612728;
    cg_data[8] = 2886746508;
    cg_data[9] = 1580494863;
    cg_data[10] = 8736075518;
    cg_data[11] = 1302754091;
    cg_data[12] = 4106064272;
    cg_data[13] = 36094547698;

    c_total_data[0] = 'c_total';
    c_total_data[1] += 3743439364;
    c_total_data[2] += 5498965136;
    c_total_data[3] += 4292508909;
    c_total_data[4] += 858558673;
    c_total_data[5] += 1033618909;
    c_total_data[6] += 351708727;
    c_total_data[7] += 1703612728;
    c_total_data[8] += 2886746508;
    c_total_data[9] += 1580494863;
    c_total_data[10] += 8736075518;
    c_total_data[11] += 1302754091;
    c_total_data[12] += 4106064272;
    c_total_data[13] += 36094547698;

    cs_data[0] = "";
    cs_data[1] = 0;
    cs_data[2] = 0;
    cs_data[3] = 0;
    cs_data[4] = 0;
    cs_data[5] = 0;
    cs_data[6] = 0;
    cs_data[7] = 0;
    cs_data[8] = 0;
    cs_data[9] = 0;
    cs_data[10] = 0;
    cs_data[11] = 0;
    cs_data[12] = 0;
    cs_data[13] = 0;

    c_total_data[0] = 'c_total';
    c_total_data[1] += 0;
    c_total_data[2] += 0;
    c_total_data[3] += 0;
    c_total_data[4] += 0;
    c_total_data[5] += 0;
    c_total_data[6] += 0;
    c_total_data[7] += 0;
    c_total_data[8] += 0;
    c_total_data[9] += 0;
    c_total_data[10] += 0;
    c_total_data[11] += 0;
    c_total_data[12] += 0;
    c_total_data[13] += 0;

    cj_data[0] = "";
    cj_data[1] = 0;
    cj_data[2] = 0;
    cj_data[3] = 0;
    cj_data[4] = 0;
    cj_data[5] = 0;
    cj_data[6] = 0;
    cj_data[7] = 0;
    cj_data[8] = 0;
    cj_data[9] = 367467864;
    cj_data[10] = 12514545;
    cj_data[11] = 0;
    cj_data[12] = 0;
    cj_data[13] = 379982409;

    c_total_data[0] = 'c_total';
    c_total_data[1] += 0;
    c_total_data[2] += 0;
    c_total_data[3] += 0;
    c_total_data[4] += 0;
    c_total_data[5] += 0;
    c_total_data[6] += 0;
    c_total_data[7] += 0;
    c_total_data[8] += 0;
    c_total_data[9] += 367467864;
    c_total_data[10] += 12514545;
    c_total_data[11] += 0;
    c_total_data[12] += 0;
    c_total_data[13] += 379982409;

    cc_data[0] = "";
    cc_data[1] = 0;
    cc_data[2] = 799655636;
    cc_data[3] = 2183415045;
    cc_data[4] = 0;
    cc_data[5] = 0;
    cc_data[6] = 0;
    cc_data[7] = 0;
    cc_data[8] = 220016000;
    cc_data[9] = 317637273;
    cc_data[10] = 712814545;
    cc_data[11] = 1620490910;
    cc_data[12] = 1161587455;
    cc_data[13] = 7015616864;

    c_total_data[0] = 'c_total';
    c_total_data[1] += 0;
    c_total_data[2] += 799655636;
    c_total_data[3] += 2183415045;
    c_total_data[4] += 0;
    c_total_data[5] += 0;
    c_total_data[6] += 0;
    c_total_data[7] += 0;
    c_total_data[8] += 220016000;
    c_total_data[9] += 317637273;
    c_total_data[10] += 712814545;
    c_total_data[11] += 1620490910;
    c_total_data[12] += 1161587455;
    c_total_data[13] += 7015616864;

    ag_data[0] = "";
    ag_data[1] = 0;
    ag_data[2] = 1490560991;
    ag_data[3] = 1585406465;
    ag_data[4] = 0;
    ag_data[5] = 71918182;
    ag_data[6] = 159071591;
    ag_data[7] = 0;
    ag_data[8] = 0;
    ag_data[9] = 158266636;
    ag_data[10] = 0;
    ag_data[11] = 667876818;
    ag_data[12] = 246818182;
    ag_data[13] = 4379918865;

    a_total_data[0] = 'a_total';
    a_total_data[1] += 0;
    a_total_data[2] += 1490560991;
    a_total_data[3] += 1585406465;
    a_total_data[4] += 0;
    a_total_data[5] += 71918182;
    a_total_data[6] += 159071591;
    a_total_data[7] += 0;
    a_total_data[8] += 0;
    a_total_data[9] += 158266636;
    a_total_data[10] += 0;
    a_total_data[11] += 667876818;
    a_total_data[12] += 246818182;
    a_total_data[13] += 4379918865;

    as_data[0] = "";
    as_data[1] = 0;
    as_data[2] = 0;
    as_data[3] = 0;
    as_data[4] = 0;
    as_data[5] = 0;
    as_data[6] = 2290004909;
    as_data[7] = 1886649727;
    as_data[8] = 420000000;
    as_data[9] = 355558364;
    as_data[10] = 0;
    as_data[11] = 160814909;
    as_data[12] = 0;
    as_data[13] = 5113027909;

    a_total_data[0] = 'a_total';
    a_total_data[1] += 0;
    a_total_data[2] += 0;
    a_total_data[3] += 0;
    a_total_data[4] += 0;
    a_total_data[5] += 0;
    a_total_data[6] += 2290004909;
    a_total_data[7] += 1886649727;
    a_total_data[8] += 420000000;
    a_total_data[9] += 355558364;
    a_total_data[10] += 0;
    a_total_data[11] += 160814909;
    a_total_data[12] += 0;
    a_total_data[13] += 5113027909;

    aj_data[0] = "";
    aj_data[1] = 0;
    aj_data[2] = 92716145;
    aj_data[3] = 18690909;
    aj_data[4] = 89276727;
    aj_data[5] = 212471636;
    aj_data[6] = 190108364;
    aj_data[7] = 152783809;
    aj_data[8] = 308490000;
    aj_data[9] = 0;
    aj_data[10] = 147479455;
    aj_data[11] = 107209945;
    aj_data[12] = 272530000;
    aj_data[13] = 1591756990;

    a_total_data[0] = 'a_total';
    a_total_data[1] += 0;
    a_total_data[2] += 92716145;
    a_total_data[3] += 18690909;
    a_total_data[4] += 89276727;
    a_total_data[5] += 212471636;
    a_total_data[6] += 190108364;
    a_total_data[7] += 152783809;
    a_total_data[8] += 308490000;
    a_total_data[9] += 0;
    a_total_data[10] += 147479455;
    a_total_data[11] += 107209945;
    a_total_data[12] += 272530000;
    a_total_data[13] += 1591756990;

    ac_data[0] = "";
    ac_data[1] = 405140909;
    ac_data[2] = 1021778045;
    ac_data[3] = 1308026182;
    ac_data[4] = 782666818;
    ac_data[5] = 857599772;
    ac_data[6] = 1543845273;
    ac_data[7] = 1010530545;
    ac_data[8] = 1879120727;
    ac_data[9] = 1022426709;
    ac_data[10] = 1558055526;
    ac_data[11] = 1254630582;
    ac_data[12] = 403272291;
    ac_data[13] = 13047093379;

    a_total_data[0] = 'a_total';
    a_total_data[1] += 405140909;
    a_total_data[2] += 1021778045;
    a_total_data[3] += 1308026182;
    a_total_data[4] += 782666818;
    a_total_data[5] += 857599772;
    a_total_data[6] += 1543845273;
    a_total_data[7] += 1010530545;
    a_total_data[8] += 1879120727;
    a_total_data[9] += 1022426709;
    a_total_data[10] += 1558055526;
    a_total_data[11] += 1254630582;
    a_total_data[12] += 403272291;
    a_total_data[13] += 13047093379;

    var i = 0;
    target_data[i++] = 530;
    target_data[i++] = 0;
    target_data[i++] = 20;
    target_data[i++] = 50;
    target_data[i++] = 70;
    target_data[i++] = 100;
    target_data[i++] = 30;
    target_data[i++] = 100;

    target_data[8] = target_data[0] + target_data[1] + target_data[2] + target_data[3];
    target_data[9] = target_data[4] + target_data[5] + target_data[6] + target_data[7];
    target_data[10] = target_data[8] + target_data[9];

    /* 총계  */
    total_data[0] = 'total';
    total_data[1] = c_total_data[1] + a_total_data[1];
    total_data[2] = c_total_data[2] + a_total_data[2];
    total_data[3] = c_total_data[3] + a_total_data[3];
    total_data[4] = c_total_data[4] + a_total_data[4];
    total_data[5] = c_total_data[5] + a_total_data[5];
    total_data[6] = c_total_data[6] + a_total_data[6];
    total_data[7] = c_total_data[7] + a_total_data[7];
    total_data[8] = c_total_data[8] + a_total_data[8];
    total_data[9] = c_total_data[9] + a_total_data[9];
    total_data[10] = c_total_data[10] + a_total_data[10];
    total_data[11] = c_total_data[11] + a_total_data[11];
    total_data[12] = c_total_data[12] + a_total_data[12];
    total_data[13] = c_total_data[13] + a_total_data[13];


    /* 수주목표액 */
    $('#plan_CG').html(unit_100m(target_data[0]));
    $('#plan_CS').html(unit_100m(target_data[1]));
    $('#plan_CJ').html(unit_100m(target_data[2]));
    $('#plan_CC').html(unit_100m(target_data[3]));
    $('#plan_C_ALL').html(unit_100m(target_data[8]));
    $('#plan_AG').html(unit_100m(target_data[4]));
    $('#plan_AS').html(unit_100m(target_data[5]));
    $('#plan_AJ').html(unit_100m(target_data[6]));
    $('#plan_AC').html(unit_100m(target_data[7]));
    $('#plan_A_ALL').html(unit_100m(target_data[9]));
    $('#plan_ALL').html(unit_100m(target_data[10]));
    /* 수주목표액 */

    $('#CG_MONTH_01').html(num_data_form(cg_data[1]));
    $('#CG_MONTH_02').html(num_data_form(cg_data[2]));
    $('#CG_MONTH_03').html(num_data_form(cg_data[3]));
    $('#CG_MONTH_04').html(num_data_form(cg_data[4]));
    $('#CG_MONTH_05').html(num_data_form(cg_data[5]));
    $('#CG_MONTH_06').html(num_data_form(cg_data[6]));
    $('#CG_MONTH_07').html(num_data_form(cg_data[7]));
    $('#CG_MONTH_08').html(num_data_form(cg_data[8]));
    $('#CG_MONTH_09').html(num_data_form(cg_data[9]));
    $('#CG_MONTH_10').html(num_data_form(cg_data[10]));
    $('#CG_MONTH_11').html(num_data_form(cg_data[11]));
    $('#CG_MONTH_12').html(num_data_form(cg_data[12]));
    $('#CG_MONTH_TOTAL').html(num_data_form(cg_data[13]));
    $('#CG_rate').html(func_rate(cg_data[13], target_data[0]));

    $('#CS_MONTH_01').html(num_data_form(cs_data[1]));
    $('#CS_MONTH_02').html(num_data_form(cs_data[2]));
    $('#CS_MONTH_03').html(num_data_form(cs_data[3]));
    $('#CS_MONTH_04').html(num_data_form(cs_data[4]));
    $('#CS_MONTH_05').html(num_data_form(cs_data[5]));
    $('#CS_MONTH_06').html(num_data_form(cs_data[6]));
    $('#CS_MONTH_07').html(num_data_form(cs_data[7]));
    $('#CS_MONTH_08').html(num_data_form(cs_data[8]));
    $('#CS_MONTH_09').html(num_data_form(cs_data[9]));
    $('#CS_MONTH_10').html(num_data_form(cs_data[10]));
    $('#CS_MONTH_11').html(num_data_form(cs_data[11]));
    $('#CS_MONTH_12').html(num_data_form(cs_data[12]));
    $('#CS_MONTH_TOTAL').html(num_data_form(cs_data[13]));
    $('#CS_rate').html(func_rate(cs_data[13], target_data[1]));

    $('#CJ_MONTH_01').html(num_data_form(cj_data[1]));
    $('#CJ_MONTH_02').html(num_data_form(cj_data[2]));
    $('#CJ_MONTH_03').html(num_data_form(cj_data[3]));
    $('#CJ_MONTH_04').html(num_data_form(cj_data[4]));
    $('#CJ_MONTH_05').html(num_data_form(cj_data[5]));
    $('#CJ_MONTH_06').html(num_data_form(cj_data[6]));
    $('#CJ_MONTH_07').html(num_data_form(cj_data[7]));
    $('#CJ_MONTH_08').html(num_data_form(cj_data[8]));
    $('#CJ_MONTH_09').html(num_data_form(cj_data[9]));
    $('#CJ_MONTH_10').html(num_data_form(cj_data[10]));
    $('#CJ_MONTH_11').html(num_data_form(cj_data[11]));
    $('#CJ_MONTH_12').html(num_data_form(cj_data[12]));
    $('#CJ_MONTH_TOTAL').html(num_data_form(cj_data[13]));
    $('#CJ_rate').html(func_rate(cj_data[13], target_data[2]));

    $('#CC_MONTH_01').html(num_data_form(cc_data[1]));
    $('#CC_MONTH_02').html(num_data_form(cc_data[2]));
    $('#CC_MONTH_03').html(num_data_form(cc_data[3]));
    $('#CC_MONTH_04').html(num_data_form(cc_data[4]));
    $('#CC_MONTH_05').html(num_data_form(cc_data[5]));
    $('#CC_MONTH_06').html(num_data_form(cc_data[6]));
    $('#CC_MONTH_07').html(num_data_form(cc_data[7]));
    $('#CC_MONTH_08').html(num_data_form(cc_data[8]));
    $('#CC_MONTH_09').html(num_data_form(cc_data[9]));
    $('#CC_MONTH_10').html(num_data_form(cc_data[10]));
    $('#CC_MONTH_11').html(num_data_form(cc_data[11]));
    $('#CC_MONTH_12').html(num_data_form(cc_data[12]));
    $('#CC_MONTH_TOTAL').html(num_data_form(cc_data[13]));
    $('#CC_rate').html(func_rate(cc_data[13], target_data[3]));

    $('#C_ALL_MONTH_01').html(num_data_form(c_total_data[1]));
    $('#C_ALL_MONTH_02').html(num_data_form(c_total_data[2]));
    $('#C_ALL_MONTH_03').html(num_data_form(c_total_data[3]));
    $('#C_ALL_MONTH_04').html(num_data_form(c_total_data[4]));
    $('#C_ALL_MONTH_05').html(num_data_form(c_total_data[5]));
    $('#C_ALL_MONTH_06').html(num_data_form(c_total_data[6]));
    $('#C_ALL_MONTH_07').html(num_data_form(c_total_data[7]));
    $('#C_ALL_MONTH_08').html(num_data_form(c_total_data[8]));
    $('#C_ALL_MONTH_09').html(num_data_form(c_total_data[9]));
    $('#C_ALL_MONTH_10').html(num_data_form(c_total_data[10]));
    $('#C_ALL_MONTH_11').html(num_data_form(c_total_data[11]));
    $('#C_ALL_MONTH_12').html(num_data_form(c_total_data[12]));
    $('#C_ALL_MONTH_TOTAL').html(num_data_form(c_total_data[13]));
    $('#C_ALL_rate').html(func_rate(c_total_data[13], target_data[8]));

    $('#AG_MONTH_01').html(num_data_form(ag_data[1]));
    $('#AG_MONTH_02').html(num_data_form(ag_data[2]));
    $('#AG_MONTH_03').html(num_data_form(ag_data[3]));
    $('#AG_MONTH_04').html(num_data_form(ag_data[4]));
    $('#AG_MONTH_05').html(num_data_form(ag_data[5]));
    $('#AG_MONTH_06').html(num_data_form(ag_data[6]));
    $('#AG_MONTH_07').html(num_data_form(ag_data[7]));
    $('#AG_MONTH_08').html(num_data_form(ag_data[8]));
    $('#AG_MONTH_09').html(num_data_form(ag_data[9]));
    $('#AG_MONTH_10').html(num_data_form(ag_data[10]));
    $('#AG_MONTH_11').html(num_data_form(ag_data[11]));
    $('#AG_MONTH_12').html(num_data_form(ag_data[12]));
    $('#AG_MONTH_TOTAL').html(num_data_form(ag_data[13]));
    $('#AG_rate').html(func_rate(ag_data[13], target_data[4]));

    $('#AS_MONTH_01').html(num_data_form(as_data[1]));
    $('#AS_MONTH_02').html(num_data_form(as_data[2]));
    $('#AS_MONTH_03').html(num_data_form(as_data[3]));
    $('#AS_MONTH_04').html(num_data_form(as_data[4]));
    $('#AS_MONTH_05').html(num_data_form(as_data[5]));
    $('#AS_MONTH_06').html(num_data_form(as_data[6]));
    $('#AS_MONTH_07').html(num_data_form(as_data[7]));
    $('#AS_MONTH_08').html(num_data_form(as_data[8]));
    $('#AS_MONTH_09').html(num_data_form(as_data[9]));
    $('#AS_MONTH_10').html(num_data_form(as_data[10]));
    $('#AS_MONTH_11').html(num_data_form(as_data[11]));
    $('#AS_MONTH_12').html(num_data_form(as_data[12]));
    $('#AS_MONTH_TOTAL').html(num_data_form(as_data[13]));
    $('#AS_rate').html(func_rate(as_data[13], target_data[5]));

    $('#AJ_MONTH_01').html(num_data_form(aj_data[1]));
    $('#AJ_MONTH_02').html(num_data_form(aj_data[2]));
    $('#AJ_MONTH_03').html(num_data_form(aj_data[3]));
    $('#AJ_MONTH_04').html(num_data_form(aj_data[4]));
    $('#AJ_MONTH_05').html(num_data_form(aj_data[5]));
    $('#AJ_MONTH_06').html(num_data_form(aj_data[6]));
    $('#AJ_MONTH_07').html(num_data_form(aj_data[7]));
    $('#AJ_MONTH_08').html(num_data_form(aj_data[8]));
    $('#AJ_MONTH_09').html(num_data_form(aj_data[9]));
    $('#AJ_MONTH_10').html(num_data_form(aj_data[10]));
    $('#AJ_MONTH_11').html(num_data_form(aj_data[11]));
    $('#AJ_MONTH_12').html(num_data_form(aj_data[12]));
    $('#AJ_MONTH_TOTAL').html(num_data_form(aj_data[13]));
    $('#AJ_rate').html(func_rate(aj_data[13], target_data[6]));

    $('#AC_MONTH_01').html(num_data_form(ac_data[1]));
    $('#AC_MONTH_02').html(num_data_form(ac_data[2]));
    $('#AC_MONTH_03').html(num_data_form(ac_data[3]));
    $('#AC_MONTH_04').html(num_data_form(ac_data[4]));
    $('#AC_MONTH_05').html(num_data_form(ac_data[5]));
    $('#AC_MONTH_06').html(num_data_form(ac_data[6]));
    $('#AC_MONTH_07').html(num_data_form(ac_data[7]));
    $('#AC_MONTH_08').html(num_data_form(ac_data[8]));
    $('#AC_MONTH_09').html(num_data_form(ac_data[9]));
    $('#AC_MONTH_10').html(num_data_form(ac_data[10]));
    $('#AC_MONTH_11').html(num_data_form(ac_data[11]));
    $('#AC_MONTH_12').html(num_data_form(ac_data[12]));
    $('#AC_MONTH_TOTAL').html(num_data_form(ac_data[13]));
    $('#AC_rate').html(func_rate(ac_data[13], target_data[7]));

    $('#A_ALL_MONTH_01').html(num_data_form(a_total_data[1]));
    $('#A_ALL_MONTH_02').html(num_data_form(a_total_data[2]));
    $('#A_ALL_MONTH_03').html(num_data_form(a_total_data[3]));
    $('#A_ALL_MONTH_04').html(num_data_form(a_total_data[4]));
    $('#A_ALL_MONTH_05').html(num_data_form(a_total_data[5]));
    $('#A_ALL_MONTH_06').html(num_data_form(a_total_data[6]));
    $('#A_ALL_MONTH_07').html(num_data_form(a_total_data[7]));
    $('#A_ALL_MONTH_08').html(num_data_form(a_total_data[8]));
    $('#A_ALL_MONTH_09').html(num_data_form(a_total_data[9]));
    $('#A_ALL_MONTH_10').html(num_data_form(a_total_data[10]));
    $('#A_ALL_MONTH_11').html(num_data_form(a_total_data[11]));
    $('#A_ALL_MONTH_12').html(num_data_form(a_total_data[12]));
    $('#A_ALL_MONTH_TOTAL').html(num_data_form(a_total_data[13]));
    $('#A_ALL_rate').html(func_rate(a_total_data[13], target_data[9]));

    $('#ALL_MONTH_01').html(num_data_form(total_data[1]));
    $('#ALL_MONTH_02').html(num_data_form(total_data[2]));
    $('#ALL_MONTH_03').html(num_data_form(total_data[3]));
    $('#ALL_MONTH_04').html(num_data_form(total_data[4]));
    $('#ALL_MONTH_05').html(num_data_form(total_data[5]));
    $('#ALL_MONTH_06').html(num_data_form(total_data[6]));
    $('#ALL_MONTH_07').html(num_data_form(total_data[7]));
    $('#ALL_MONTH_08').html(num_data_form(total_data[8]));
    $('#ALL_MONTH_09').html(num_data_form(total_data[9]));
    $('#ALL_MONTH_10').html(num_data_form(total_data[10]));
    $('#ALL_MONTH_11').html(num_data_form(total_data[11]));
    $('#ALL_MONTH_12').html(num_data_form(total_data[12]));
    $('#ALL_MONTH_TOTAL').html(num_data_form(total_data[13]));
    $('#ALL_rate').html(func_rate(total_data[13], target_data[10]));

    $('#ALL_MONTH_01_RATE').html(func_rate(total_data[1], target_data[10]));
    $('#ALL_MONTH_02_RATE').html(func_rate(total_data[2], target_data[10]));
    $('#ALL_MONTH_03_RATE').html(func_rate(total_data[3], target_data[10]));
    $('#ALL_MONTH_04_RATE').html(func_rate(total_data[4], target_data[10]));
    $('#ALL_MONTH_05_RATE').html(func_rate(total_data[5], target_data[10]));
    $('#ALL_MONTH_06_RATE').html(func_rate(total_data[6], target_data[10]));
    $('#ALL_MONTH_07_RATE').html(func_rate(total_data[7], target_data[10]));
    $('#ALL_MONTH_08_RATE').html(func_rate(total_data[8], target_data[10]));
    $('#ALL_MONTH_09_RATE').html(func_rate(total_data[9], target_data[10]));
    $('#ALL_MONTH_10_RATE').html(func_rate(total_data[10], target_data[10]));
    $('#ALL_MONTH_11_RATE').html(func_rate(total_data[11], target_data[10]));
    $('#ALL_MONTH_12_RATE').html(func_rate(total_data[12], target_data[10]));
    $('#ALL_MONTH_TOTAL_RATE').html(func_rate(total_data[13], target_data[10]));

    $('#table2_c_all').html(num_data_form(c_total_data[13]));
    $('#table2_a_all').html(num_data_form(a_total_data[13]));
    $('#table2_all').html(num_data_form(c_total_data[13] + a_total_data[13]));


    $('#table3_cg').html(num_data_form(cg_data[13]));
    $('#table3_ag').html(num_data_form(ag_data[13]));
    $('#table3_g_rate').html(func_rate2(cg_data[13] + ag_data[13], c_total_data[13] + a_total_data[13]));
    $('#table3_g_all').html(num_data_form(cg_data[13] + ag_data[13]));

    $('#table3_cs').html(num_data_form(cs_data[13]));
    $('#table3_as').html(num_data_form(as_data[13]));
    $('#table3_s_rate').html(func_rate2(cs_data[13] + as_data[13], c_total_data[13] + a_total_data[13]));
    $('#table3_s_all').html(num_data_form(cs_data[13] + as_data[13]));

    $('#table3_cj').html(num_data_form(cj_data[13]));
    $('#table3_aj').html(num_data_form(aj_data[13]));
    $('#table3_j_rate').html(func_rate2(cj_data[13] + aj_data[13], c_total_data[13] + a_total_data[13]));
    $('#table3_j_all').html(num_data_form(cj_data[13] + aj_data[13]));

    $('#table3_cc').html(num_data_form(cc_data[13]));
    $('#table3_ac').html(num_data_form(ac_data[13]));
    $('#table3_c_rate').html(func_rate2(cc_data[13] + ac_data[13], c_total_data[13] + a_total_data[13]));
    $('#table3_c_all').html(num_data_form(cc_data[13] + ac_data[13]));

    $('#table3_all').html(num_data_form(c_total_data[13] + a_total_data[13]));
    
    /* Create chart1 */
    let el = document.getElementById('chart-area1');

    let varPlanData = new Array();
    let varRealData = new Array();

    /* chart1, chart2의 y축 설정 */
    let temp_max_data_arr = new Array();
    temp_max_data_arr[0] = target_data[8]; // CM계획
    temp_max_data_arr[1] = target_data[9]; // 설계계획
    temp_max_data_arr[2] = target_data[0] + target_data[4]; // 경기계획
    temp_max_data_arr[3] = target_data[1] + target_data[5]; // 서울계획
    temp_max_data_arr[4] = target_data[2] + target_data[6]; // 전북계획
    temp_max_data_arr[5] = target_data[3] + target_data[7]; // 전남계획
    temp_max_data_arr[6] = round_2(num_100m(c_total_data[13])); // CM 수주
    temp_max_data_arr[7] = round_2(num_100m(a_total_data[13])); // 설계 수주
    temp_max_data_arr[8] = round_2(num_100m(cg_data[13] + ag_data[13])); // 경기 수주
    temp_max_data_arr[9] = round_2(num_100m(cs_data[13] + as_data[13])); // 서울 수주
    temp_max_data_arr[10] = round_2(num_100m(cj_data[13] + aj_data[13])); // 전북 수주
    temp_max_data_arr[11] = round_2(num_100m(cc_data[13] + ac_data[13])); // 전남 수주

    let max_data_value = Math.max(...temp_max_data_arr);

    // 10억 단위
    let scale_max = (Math.floor(max_data_value / 10) + 1) * 10;
    /* chart1, chart2의 y축 설정 */

    varPlanData[0] = target_data[8];
    varRealData[0] = round_2(num_100m(c_total_data[13]));

    varPlanData[1] = target_data[9];
    varRealData[1] = round_2(num_100m(a_total_data[13]));

    let data = {
        categories: ['CM용역', '설계용역'],
        series: [
            {
                name: '계획',
                data: varPlanData,
                colors: 'blue'
            },
            {
                name: '수주',
                data: varRealData,
                colors: 'red'
            },
        ]
    }

    let options = {
        chart: { width: 400, height: 410 },
        legend: {
            visible: false
        },
        exportMenu: {
            visible: false
        },
        theme: {
            series: {
                colors: ['#83acdfd1', '#c0504d96'],
            }
        },
        series: {
            dataLabels: { visible: true },
        },
        yAxis: {
            scale: {
                min: 0,
                max: scale_max,
            },
        },
    };

    $('#chart-area1').empty();
    const chart1 = toastui.Chart.columnChart({ el, data, options });

    /* Create chart2 */
    el = document.getElementById('chart-area2');

    varPlanData = new Array();
    varRealData = new Array();

    varPlanData[0] = target_data[0] + target_data[4];
    varRealData[0] = round_2(num_100m(cg_data[13] + ag_data[13]));

    varPlanData[1] = target_data[1] + target_data[5];
    varRealData[1] = round_2(num_100m(cs_data[13] + as_data[13]));

    varPlanData[2] = target_data[2] + target_data[6];
    varRealData[2] = round_2(num_100m(cj_data[13] + aj_data[13]));

    varPlanData[3] = target_data[3] + target_data[7];
    varRealData[3] = round_2(num_100m(cc_data[13] + ac_data[13]));

    data = {
        categories: ['경기법인', '서울법인', '전북법인', '전남법인'],
        series: [
            {
                name: '계획',
                data: varPlanData,
            },
            {
                name: '수주',
                data: varRealData,
            },
        ]
    }

    options = {
        chart: { width: 660, height: 410 },
        legend: {
            visible: false
        },
        exportMenu: {
            visible: false
        },
        theme: {
            series: {
                colors: ['#92d0509c', '#c0504d96'],
            }
        },
        series: {
            dataLabels: { visible: true },
        },
        yAxis: {
            scale: {
                min: 0,
                max: scale_max,
            },
        },
    };

    $('#chart-area2').empty();
    const chart2 = toastui.Chart.columnChart({ el, data, options });
}