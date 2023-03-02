function init(){

    $.ajax({
        url : "/minesweeper/",
        type : "POST",
        dataType : "JSON",
        data : {"today" : new Date()}
    })
    .done(function (json){
       let json_data = JSON.parse(JSON.stringify(json));
       let output = "";
 
       output += "<table class='table1'><colgroup><col width='80px'/><col width='50px'/><col width='120px'/><col width='120px'/><col width='170px'/></colgroup>"
             +"<th>SCORE</th><th>CLICK COUNT</th><th>PLAY TIME</th><th>NAME</th><th>DATE</th>";
       for(let obj of json_data){
          output += "<tr><td>" + obj.SCORE  + "</td>";
          output += "<td>" + obj.CLICK_CNT  + "</td>";
          output += "<td>" + obj.PLAY_TIME  + "</td>";
          output += "<td>" + obj.NAME  + "</td>";
          output += "<td>" + obj.REGDAY  + "</td></tr>";
       }
       output += "</table>";
 
       $('#history_board').html(output);
    })
    .fail(function (xhr, status, errorThrown){
        alert("Ajax failed")
    })
 }
 
 init();
 
 window.onload = function () {
    let num = [];
    let i = 0;
    while (i < 12) {
       let mine_num = Math.floor(Math.random() * 100);
       let bool = true;
       for (let j in num) {
          if (mine_num == num[j]) {
             bool = false;
          }
       }
       if (bool) {
          num.push(mine_num);
          i++;
       }
    }
 
    // 정렬
    num.sort(function (a, b) {
       return a - b;
    });
 
    let click_cnt = 0;
    let right_click_cnt = 0;
    $('#left_click_cnt').text(click_cnt);
    $('#right_click_cnt').text(right_click_cnt);
 
    let k = 0;
 
    let createDiv = "<br>";
    while (k < 100) {
       if (num.indexOf(k) < 0) {
          createDiv += "<div class='notMine' id='num_" + k + "' value = '" + k + "'>&nbsp;</div>";
       } else {
          createDiv += "<div class='mine' id=num_'" + k + "'><i class='fa-solid fa-bomb fa-lg'></i></d" +
             "iv>";
       }
       if (k % 0 == 0) {
          createDiv += "<br>";
       }
       k++;
    }
 
    document.querySelector("#game_board").innerHTML = createDiv;
 
    // 번호 저장을 위한 set
    let open_div_set = new Set();
 
    $(document).on('click', '.mine', function (e) {
       if ($(this).hasClass("check")) {
          return;
       }
       $('.mine').removeClass("check");
       $('.mine').addClass("clickMine");
       clearInterval(timer);
       $("#game_board").addClass("earthquake");
       $('.click_cnt').html(click_cnt);
 
       // 시간   
       time_func();
 
       const failed_modal = document.getElementById('failed');
       failed_modal.showModal();
    })
 
    function won() {
       clearInterval(timer);
       $("#game_board").addClass("beat");
       $('.click_cnt').html(click_cnt);
 
       // 시간   
       time_func();
 
       // 점수
       score_func();
 
       let save_click_cnt = $('#won .click_cnt').text();
       let save_minutes_time = $('#won .minutes_time').text();
       let save_seconds_time = $('#won .seconds_time').text();
       let save_score = $('.score').text();
       let save_play_time = save_minutes_time + save_seconds_time + "초"
 
       $('#save_score').val(save_score);
       $('#save_click_cnt').val(save_click_cnt);
       $('#save_play_time').val(save_play_time);
 
       const won_modal = document.getElementById('won');
       won_modal.showModal();
    }
 
    // 시간
    function time_func() {
       let m_time = $('#minutes_tens').text() + $('#minutes_ones').text();
       let s_time = $('#seconds_tens').text() + $('#seconds_ones').text();
       if (m_time != "00") {
          m_time += "분";
          $('.minutes_time').html(m_time);
       }
       $('.seconds_time').html(s_time);
    }
 
    // 점수
    function score_func() {
       let score;
       let m_time = $('#minutes_tens').text() + $('#minutes_ones').text();
       let s_time = $('#seconds_tens').text() + $('#seconds_ones').text();
       let total_time = 0;
       if (m_time != "00") {
          total_time += 60 * Number(m_time);
       }
       total_time += Number(s_time);
 
       score = (30 / (0.4 * total_time + 8) + 20 / (0.2 * click_cnt + 36)) * 50;
 
       if (score >= 100) {
          $('.score').html("100");
       } else {
          $('.score').html(Math.ceil(score * 1000) / 1000);
       }
    }
 
    $(document).on('mousedown', '.notMine, .mine', function (e) {
       e.preventDefault();
       let k = Number($(this).attr("value"));
       if (e.button === 2 && !$(this).hasClass("clickNotMine")) {
          if ($(this).hasClass("check")) {
             $(this).removeClass("check");
             right_click_cnt--;
          } else {
             $(this).addClass("check");
             right_click_cnt++;
          }
          $('#right_click_cnt').text(right_click_cnt);
       }
 
       if (e.button === 0 && !$(this).hasClass("check") && !$(this).hasClass("mine")) {
          if(!$(this).hasClass("clickNotMine")){
             click_cnt++;
          }
          $('#left_click_cnt').text(click_cnt);
 
          $(this).addClass("clickNotMine");
          open_div_set.add(k);
          if (open_div_set.size == 88) {
             won();
          }
          let s_1 = k - 11;
          let s_2 = k - 10;
          let s_3 = k - 9;
          let s_4 = k - 1;
          let s_5 = k + 1;
          let s_6 = k + 9;
          let s_7 = k + 10;
          let s_8 = k + 11;
          let cnt = 0;
 
          if (k == 0) {
             //578
             for (let j in num) {
                if (s_5 == num[j] || s_7 == num[j] || s_8 == num[j]) {
                   cnt++;
                }
             }
             // console.log("좌측위쪽");
             $(this).html(cnt);
             if (cnt == 0) {
                minefind(s_5);
                minefind(s_7);
                minefind(s_8);
             }
             return;
          } else if (k == 9) {
             //467
             for (let j in num) {
                if (s_4 == num[j] || s_6 == num[j] || s_7 == num[j]) {
                   cnt++;
                }
             }
             // console.log("우측위쪽");
             $(this).html(cnt);
             if (cnt == 0) {
                minefind(s_4);
                minefind(s_6);
                minefind(s_7);
             }
             return;
          } else if (k == 90) {
             //235
             for (let j in num) {
                if (s_2 == num[j] || s_3 == num[j] || s_5 == num[j]) {
                   cnt++;
                }
             }
             // console.log("좌측아래쪽");
             $(this).html(cnt);
             if (cnt == 0) {
                minefind(s_2);
                minefind(s_3);
                minefind(s_5);
             }
             return;
          } else if (k == 99) {
             //124
             for (let j in num) {
                if (s_1 == num[j] || s_2 == num[j] || s_4 == num[j]) {
                   cnt++;
                }
             }
             // console.log("우측아래쪽");
             $(this).html(cnt);
             if (cnt == 0) {
                minefind(s_1);
                minefind(s_2);
                minefind(s_4);
             }
             return;
          } else if (k - 10 < 0) { // 위쪽
             //45678
             for (let j in num) {
                if (s_4 == num[j] || s_5 == num[j] || s_6 == num[j] || s_7 == num[j] || s_8 == num[j]) {
                   cnt++;
                }
             }
             // console.log("위쪽");
             $(this).html(cnt);
             if (cnt == 0) {
                minefind(s_4);
                minefind(s_5);
                minefind(s_6);
                minefind(s_7);
                minefind(s_8);
             }
             return;
          } else if ((k % 10) / 9 == 1 && k % 10 != 0) { // 오른쪽
             //12467
             for (let j in num) {
                if (s_1 == num[j] || s_2 == num[j] || s_4 == num[j] || s_6 == num[j] || s_7 == num[j]) {
                   cnt++;
                }
             }
             // console.log("오른쪽");
             $(this).html(cnt);
             if (cnt == 0) {
                minefind(s_1);
                minefind(s_2);
                minefind(s_4);
                minefind(s_6);
                minefind(s_7);
             }
             return;
          } else if (k % 10 == 0) { // 왼쪽
             //23578
             for (let j in num) {
                if (s_2 == num[j] || s_3 == num[j] || s_5 == num[j] || s_7 == num[j] || s_8 == num[j]) {
                   cnt++;
                }
             }
             // console.log("왼쪽");
             $(this).html(cnt);
             if (cnt == 0) {
                minefind(s_2);
                minefind(s_3);
                minefind(s_5);
                minefind(s_7);
                minefind(s_8);
             }
             return;
          } else if (k + 10 > 100) { // 아래쪽
             //12345
             for (let j in num) {
                if (s_1 == num[j] || s_2 == num[j] || s_3 == num[j] || s_4 == num[j] || s_5 == num[j]) {
                   cnt++;
                }
             }
             // console.log("아래쪽");
             $(this).html(cnt);
             if (cnt == 0) {
                minefind(s_1);
                minefind(s_2);
                minefind(s_3);
                minefind(s_4);
                minefind(s_5);
             }
             return;
          } else {
             for (let j in num) {
                if (s_1 == num[j] || s_2 == num[j] || s_3 == num[j] || s_4 == num[j] || s_5 == num[j] || s_6 == num[j] || s_7 == num[j] || s_8 == num[j]) {
                   cnt++;
                }
             }
             // console.log("가운데");
             $(this).html(cnt);
             if (cnt == 0) {
                minefind(s_1);
                minefind(s_2);
                minefind(s_3);
                minefind(s_4);
                minefind(s_5);
                minefind(s_6);
                minefind(s_7);
                minefind(s_8);
             }
             return;
          }
       }
    })
 
    function minefind(s) {
       let temp_id = makeNumId(s);
       open_div_set.add(s);
 
       let s_1 = s - 11;
       let s_2 = s - 10;
       let s_3 = s - 9;
       let s_4 = s - 1;
       let s_5 = s + 1;
       let s_6 = s + 9;
       let s_7 = s + 10;
       let s_8 = s + 11;
       let cnt = 0;
 
       if (s == 0) {
          //578
          for (let j in num) {
             if (s_5 == num[j] || s_7 == num[j] || s_8 == num[j]) {
                cnt++;
             }
          }
          clickNotMine_func(temp_id, cnt);
          if (cnt == 0) {
             checkMinefind(s_5);
             checkMinefind(s_7);
             checkMinefind(s_8);
          } else {
             return;
          }
       } else if (s == 9) {
          //467
          for (let j in num) {
             if (s_4 == num[j] || s_6 == num[j] || s_7 == num[j]) {
                cnt++;
             }
          }
          clickNotMine_func(temp_id, cnt);
          if (cnt == 0) {
             checkMinefind(s_4);
             checkMinefind(s_6);
             checkMinefind(s_7);
          } else {
             return;
          }
       } else if (s == 90) {
          //235
          for (let j in num) {
             if (s_2 == num[j] || s_3 == num[j] || s_5 == num[j]) {
                cnt++;
             }
          }
          clickNotMine_func(temp_id, cnt);
          if (cnt == 0) {
             checkMinefind(s_2);
             checkMinefind(s_3);
             checkMinefind(s_5);
          } else {
             return;
          }
       } else if (s == 99) {
          //124
          for (let j in num) {
             if (s_1 == num[j] || s_2 == num[j] || s_4 == num[j]) {
                cnt++;
             }
          }
          clickNotMine_func(temp_id, cnt);
          if (cnt == 0) {
             checkMinefind(s_1);
             checkMinefind(s_2);
             checkMinefind(s_4);
          } else {
             return;
          }
       } else if (s - 10 < 0) { // 위쪽
          //45678
          for (let j in num) {
             if (s_4 == num[j] || s_5 == num[j] || s_6 == num[j] || s_7 == num[j] || s_8 == num[j]) {
                cnt++;
             }
          }
          clickNotMine_func(temp_id, cnt);
          if (cnt == 0) {
             checkMinefind(s_4);
             checkMinefind(s_5);
             checkMinefind(s_6);
             checkMinefind(s_7);
             checkMinefind(s_8);
          } else {
             return;
          }
       } else if ((s % 10) / 9 == 1 && s % 10 != 0) { // 오른쪽
          //12467
          for (let j in num) {
             if (s_1 == num[j] || s_2 == num[j] || s_4 == num[j] || s_6 == num[j] || s_7 == num[j]) {
                cnt++;
             }
          }
          clickNotMine_func(temp_id, cnt);
          if (cnt == 0) {
             checkMinefind(s_1);
             checkMinefind(s_2);
             checkMinefind(s_4);
             checkMinefind(s_6);
             checkMinefind(s_7);
          } else {
             return;
          }
       } else if (s % 10 == 0) { // 왼쪽
          //23578
          for (let j in num) {
             if (s_2 == num[j] || s_3 == num[j] || s_5 == num[j] || s_7 == num[j] || s_8 == num[j]) {
                cnt++;
             }
          }
          clickNotMine_func(temp_id, cnt);
          if (cnt == 0) {
             checkMinefind(s_2);
             checkMinefind(s_3);
             checkMinefind(s_5);
             checkMinefind(s_7);
             checkMinefind(s_8);
          } else {
             return;
          }
       } else if (s + 10 > 100) { // 아래쪽
          //12345
          for (let j in num) {
             if (s_1 == num[j] || s_2 == num[j] || s_3 == num[j] || s_4 == num[j] || s_5 == num[j]) {
                cnt++;
             }
          }
          clickNotMine_func(temp_id, cnt);
          if (cnt == 0) {
             checkMinefind(s_1);
             checkMinefind(s_2);
             checkMinefind(s_3);
             checkMinefind(s_4);
             checkMinefind(s_5);
          } else {
             return;
          }
       } else {
          for (let j in num) {
             if (s_1 == num[j] || s_2 == num[j] || s_3 == num[j] || s_4 == num[j] || s_5 == num[j] || s_6 == num[j] || s_7 == num[j] || s_8 == num[j]) {
                cnt++;
             }
          }
          clickNotMine_func(temp_id, cnt);
          if (cnt == 0) {
             checkMinefind(s_1);
             checkMinefind(s_2);
             checkMinefind(s_3);
             checkMinefind(s_4);
             checkMinefind(s_5);
             checkMinefind(s_6);
             checkMinefind(s_7);
             checkMinefind(s_8);
          } else {
             return;
          }
       }
    }
 
    function makeNumId(n) {
       return "#num_" + n;
    }
 
    function checkMinefind(n) {
       if (!$(makeNumId(n)).hasClass("clickNotMine") && !$(makeNumId(n)).hasClass("mine")) {
          open_div_set.add(n);
          minefind(n);
       }
    }
 
    function clickNotMine_func(temp_id, cnt) {
       $(temp_id).html(cnt);
       $(temp_id).addClass("clickNotMine");
 
       if (open_div_set.size == 88) {
          won();
       }
    }
 
    // 타이머
    const countToDate = new Date().setHours(new Date().getHours())
    let previousTimeBetweenDates
    let timer = setInterval(() => {
       const currentDate = new Date()
       const timeBetweenDates = Math.ceil((currentDate - countToDate) / 1000)
       flipAllCards(timeBetweenDates)
       previousTimeBetweenDates = timeBetweenDates
    }, 250)
 
    function flipAllCards(time) {
       const seconds = time % 60
       const minutes = Math.floor(time / 60) % 60
 
       flip(document.querySelector("[data-minutes-tens]"), Math.floor(minutes / 10))
       flip(document.querySelector("[data-minutes-ones]"), minutes % 10)
       flip(document.querySelector("[data-seconds-tens]"), Math.floor(seconds / 10))
       flip(document.querySelector("[data-seconds-ones]"), seconds % 10)
    }
 
    function flip(flipCard, newNumber) {
       const topHalf = flipCard.querySelector(".top")
       const startNumber = parseInt(topHalf.textContent)
       if (newNumber === startNumber) return
 
       const bottomHalf = flipCard.querySelector(".bottom")
       const topFlip = document.createElement("div")
       topFlip.classList.add("top-flip")
       const bottomFlip = document.createElement("div")
       bottomFlip.classList.add("bottom-flip")
 
       top.textContent = startNumber
       bottomHalf.textContent = startNumber
       topFlip.textContent = startNumber
       bottomFlip.textContent = newNumber
 
       topFlip.addEventListener("animationstart", e => {
          topHalf.textContent = newNumber
       })
       topFlip.addEventListener("animationend", e => {
          topFlip.remove()
       })
       bottomFlip.addEventListener("animationend", e => {
          bottomHalf.textContent = newNumber
          bottomFlip.remove()
       })
       flipCard.append(topFlip, bottomFlip)
    }
    $('.retry_btn').click(function () {
       location.reload();
    });
 }