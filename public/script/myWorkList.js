const zooms = document.querySelectorAll('.zoom');
const modal = document.getElementById('myModal');
const modalContent = document.querySelector('.modal-content');
let select_page = '';

window.addEventListener('load', function() {
    var allElements = document.getElementsByTagName('*');
    Array.prototype.forEach.call(allElements, function(el) {
        var includePath = el.dataset.includePath;
        if (includePath) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    el.outerHTML = this.responseText;
                }
            };
            xhttp.open('GET', includePath, true);
            xhttp.send();
        }
    });
});

function init(){
    let workList = ['', 'Animated_Action_Menu', 'Animated_Circular_Progress_Bar', 'Animated_Gaming_Website', 'Animated_Search_Box', 'Color_Switch_Page'
        , 'Countdown_Flip_Timer', 'Custom_Input_Range_Slider', 'Dashboard_Mokyang', 'Dashboard_kt_M-BcN', 'Dashboard_Sidebar_Menu', 'Delete_Button_Animation_Effects'
        , 'Dynamic_Expandable_Content_Only_CSS', 'Highlighter_effect(Pseudo_Element)', 'Infinite_Ticker_CSS_Animation_Effects', 'Infinity_scroll'
        , 'Input_Field_Gradient_Border_Animation_Effects', 'MapData_To_Text_File', 'Page_Progress_Bar', 'Playing_Card_Hover_Effect', 'Progress_Bar'
        , 'Slide_Transitions', 'Spinning_Wheel_Game', 'Typing_JS'
    ];

    let list_output = '';

    for(let i = 1; i < workList.length; i++){
        let work = workList[i];
        list_output += '<div class="item list' + i + '" value="/myWorkFolder/' + work +'/">"'
            + '<span class="zoom">'
            + ' <ion-icon name="expand-outline"></ion-icon>'
            + '</span>'
            + '<span class="list_name">' + work.replaceAll('_', ' ') + '</span>'
            + '<img src="/myWorkFolder/' + work + '/screenshot_gif.gif" class="gif_img"></img>'
            + '</div>';
    }

    $('#workListContainer').html(list_output);
}

init();

$('.zoom').off().on('click', function () {
    $('#myModal').css('display','block');
    $(this).closest('.item').find('img').clone().addClass('zoom_img').appendTo('.modal-content');
    let e = window.event;
    e.stopPropagation();
})

$('.close').on('click', () => {
    $('#myModal').css('display','none');
    $('.modal-content').html('');
});

$(window).on('click', (e) => {
    if(e.target.id === 'myModal'){
        $('#myModal').css('display','none');
        $('.modal-content').html('');
    }
});

$(document).on('click', '.item', function (e) {
    let temp_url = $(this).attr('value');
    let label = temp_url.substring(14, temp_url.length - 1).replaceAll('_', ' ');
    $('#confirmed_label').text(label);
    select_page = temp_url;
    $('#movePage_confirmed').css('display','block');
    $('#movePage_confirmed').css({opacity:0}).animate({opacity:1},500);
})

function movePage(url){
    let index = url + 'index.html';
    let label = url.substring(14, url.length - 1).replaceAll('_', ' ');
    let _width = '1200';
    let _height = '800';
    let _top = Math.ceil((window.screen.height - _height)/2);
    let _left = Math.ceil((window.screen.width - _width)/2);
    let option = 'width='+ _width + ',height=' + _height + ',top=' + _top + ',left=' + _left + ',resizable=yes ';
    window.open(index, label, option);
    movePage_colsed();
}

$('#cancel').on('click', () => {
    movePage_colsed();
});

function movePage_colsed(){
    $('#movePage_confirmed').css({opacity:1}).animate({opacity:0},500);
    setTimeout(() => {
        $('#movePage_confirmed').css('display','none');
    }, '500')
}

$('#confirm').on('click', () => {
    movePage(select_page);
});
