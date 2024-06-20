$('#side_my_work_list').addClass('li_active');

let select_page = '';

window.addEventListener('load', function() {
    let allElements = document.getElementsByTagName('*');
    Array.prototype.forEach.call(allElements, function(el) {
        let includePath = el.dataset.includePath;
        if (includePath) {
            let xhttp = new XMLHttpRequest();
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
    let xmlhttp = new XMLHttpRequest();
    let url = "/myWorkFolder/workList.json";
    let json_data;

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            json_data = JSON.parse(xmlhttp.responseText);
            setWorkList(json_data);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
}

init();

function setWorkList(json_data){
    let list_output = '';

    for (let i = 0; i < json_data.length; i++) {
        let _name = json_data[i].name;
        let _width = json_data[i].width;
        let _height = json_data[i].height;

        let calc_width = _width / _height * 2300000;
        let temp = Math.ceil(calc_width);
        let width_result = temp / 10000;

        // 배경 이미지 설정
        let backgroundImageStyle = `background-image: url('/myWorkFolder/${_name}/screenshot_gif.gif');`;

        list_output += `
        <div class="item list${i + 1}" value="/myWorkFolder/${_name}/" style="${backgroundImageStyle} width:${width_result}px; background-size: cover;">
            <span class="list_name">${_name.replaceAll('_', ' ')}</span>
        </div>`;
    }

    $('#workListContainer').html(list_output);

}

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
