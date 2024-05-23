$(function () {
    let xmlhttp = new XMLHttpRequest();
    let url = "data_db.json";
    let json_data;
    let json_length;
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            datafunc(xmlhttp.responseText);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function datafunc(resp){
        json_data = JSON.parse(resp);
        json_length = json_data.length;
        loadMoreData();
    }
    
    let lastNumber = 0;
    function loadMoreData() {
        $('.scroll_tag').remove();
        let startNumber = lastNumber;
        let i = startNumber;
        let listItem = "";
        while (i < startNumber + 15 && i < json_data.length) {
            listItem += "<p>" + json_data[i].title + " content : " + json_data[i].content + "</p>";
            i++;
        }

        $('#data-container').append(listItem);
        if(i < json_length){
            $('#data-container').append("<p class='scroll_tag'>Scroll down to view more data</p>");
        }else{
            
        }
        
        lastNumber = i;
    }

    function delay() {
        $('.scroll_tag').html('<div class="loader"><span><i></i></span></div>');
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), 1500);
        })
    }

    $('#data-container').scroll(async function (e) {
        e.preventDefault();
        if(lastNumber < json_length){
            if (this.scrollTop + this.clientHeight >= this.scrollHeight) {
                await delay();
                loadMoreData();
            }
        }
    });

})