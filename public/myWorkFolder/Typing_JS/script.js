String.prototype.toChars = function () {
    let char_cho = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'],
        cJung = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'],
        char_jong = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'], cho, jung, jong;

    let str = this, cnt = str.length, char_arr = [], char;
    for (var i = 0; i < cnt; i++) {
        char = str.charCodeAt(i);
        if (char == 32) { // space
            char_arr.push(" ");
            continue;
        }
        // Not Korean
        if (char < 0xAC00 || char > 0xD7A3) {
            char_arr.push(str.charAt(i)); continue;
        }
        char = str.charCodeAt(i) - 0xAC00;

        let jong = char % 28; // 종성 
        let jung = ((char - jong) / 28) % 21 // 중성 
        let cho = (((char - jong) / 28) - jung) / 21 // 초성 

        char_arr.push(char_cho[cho]);
        char_arr.push(String.fromCharCode(44032 + (cho * 588) + (jung * 28)));
        if (char_jong[jong] !== '') {
            char_arr.push(String.fromCharCode(44032 + (cho * 588) + (jung * 28) + jong));
        }
    }
    return char_arr;
}

function typing_JS(text, element, option, speed) {
    let text_split = text.split('');
    let typing = [];
    let sp = speed == undefined ? 120 : speed;

    let i = 0, j = 0, k = 0;
    while (i < text_split.length) {
        typing[i] = text_split[i].toChars();
        i++;
    }

    let result_element = document.getElementById(element);
    let result_text = "";
    let interval1 = setInterval(typing_func1, sp);
    let interval2;

    function typing_func1() {
        if (j <= i - 1) {
            let temp_j = typing[j].length;
            result_element.innerHTML = result_text + typing[j][k];
            k++;
            if (k == temp_j) {
                result_text += typing[j][k - 1];
                j++;
                k = 0;
            }
        } else {
            clearInterval(interval1);
            if(option == 'repeat'){
                interval2 = setInterval(typing_func2, sp);
            } else if(option == 'none'){

            }
        }
    }

    function typing_func2() {
        if (j > 0) {
            result_element.innerHTML = result_text.substring(0, j - 1);
            j--;
        } else {
            clearInterval(interval2);
            result_text = "";
            interval1 = setInterval(typing_func1, sp);
        }
    }
}

