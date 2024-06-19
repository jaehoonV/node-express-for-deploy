var express = require('express');
var router = express.Router();

router.use(express.static("public"));

/* caesar/ GET */
router.get('/', function (req, res, next) {
    res.render('caesar');
});

/* /decrypt GET */
router.get('/decrypt', function (req, res, next) {
    let _text = req.query.text || '';
    let _shift = req.query.shift != null ? parseInt(req.query.shift) : 1;
    let _spe_num = req.query.spe_num != null ? parseInt(req.query.spe_num) : 0;
    let spe_shift = create_spe_num(_shift, _spe_num);
    let decrypt = encryption(_text, spe_shift, 'd');
    res.json({ "text": decrypt });
});

/* /decrypt POST */
router.post('/decrypt', function (req, res, next) {
    let _text = req.body.text || '';
    let _shift = req.body.shift != null ? parseInt(req.body.shift) : 1;
    let _spe_num = req.body.spe_num != null ? parseInt(req.body.spe_num) : 0;
    let spe_shift = create_spe_num(_shift, _spe_num);
    let decrypt = encryption(_text, spe_shift, 'd');
    res.json({ "text": decrypt });
});

/* /encrypt GET */
router.get('/encrypt', function (req, res, next) {
    let _text = req.query.text || '';
    let _shift = req.query.shift != null ? parseInt(req.query.shift) : 1;
    let _spe_num = req.query.spe_num != null ? parseInt(req.query.spe_num) : 0;
    let spe_shift = create_spe_num(_shift, _spe_num);
    let encrypt = encryption(_text, spe_shift, 'e');
    res.json({ "text": encrypt });
});

/* /encrypt POST */
router.post('/encrypt', function (req, res, next) {
    let _text = req.body.text || '';
    let _shift = req.body.shift != null ? parseInt(req.body.shift) : 1;
    let _spe_num = req.body.spe_num != null ? parseInt(req.body.spe_num) : 0;
    let spe_shift = create_spe_num(_shift, _spe_num);
    let encrypt = encryption(_text, spe_shift, 'e');
    res.json({ "text": encrypt });
});

/* /result POST */
router.post('/result', function (req, res, next) {
    let _type = req.body.type || '';
    let _text = req.body.text || '';
    let _shift = req.body.shift != null ? parseInt(req.body.shift) : 1;
    let _spe_num = req.body.spe_num != null ? parseInt(req.body.spe_num) : 0;
    let spe_shift = create_spe_num(_shift, _spe_num);
    let val = '';
    val = encryption(_text, spe_shift, _type);

    res.json({ "result": val });
});

// 404 Error Handling
/* router.all('*', (req, res, next) => {
    res.status(404).render('error', { error: 404 });
}); */

module.exports = router;

function create_spe_num(shift, spe_num) {
    if (spe_num == 0) return shift;
    let spe_shift = (shift ^ spe_num) * (Math.ceil(shift % spe_num) + 1);
    return spe_shift % 26;
}

function encryption(text, shift, type) {
    // 문자열을 반으로 나누는 함수
    function splitString(s) {
        let mid = Math.floor(s.length / 2);
        return [s.slice(0, mid), s.slice(mid)];
    }

    // 재귀적으로 문자열을 나누고 처리하는 함수
    function processString(s) {
        if (s.length <= 1) {
            return s;
        }

        let [firstHalf, secondHalf] = splitString(s);
        let processedFirstHalf = processString(firstHalf);
        let processedSecondHalf = processString(secondHalf);

        // 두 부분을 교환
        return processedSecondHalf + processedFirstHalf;
    }

    function func_caesar_encrypt(text, shift){
        let result = '';
        shift = (shift % 26 + 26) % 26; // 알파벳에 대해 26을 기준으로 정규화
        for (let i = 0; i < text.length; i++) {
            let char = text[i];
            let code = char.charCodeAt(0);
            if (code >= 65 && code <= 90) { // 대문자 범위 (A-Z)
                let shiftedCode = ((code - 65 + shift) % 26) + 65;
                result += String.fromCharCode(shiftedCode);
            } else if (code >= 97 && code <= 122) { // 소문자 범위 (a-z)
                let shiftedCode = ((code - 97 + shift) % 26) + 97;
                result += String.fromCharCode(shiftedCode);
            } else {
                result += char; // 알파벳 이외의 문자는 그대로 추가
            }
        }
        return result;
    }

    function func_caesar_decrypt(text, shift){
        return func_caesar_encrypt(text, -shift);
    }

    let leng = text.length;
    let slice_num = shift % leng;
    
    if(type == 'e'){
        let slice_text = text.slice(slice_num) + text.slice(0, slice_num);
        let output = processString(slice_text);
        //console.log(output);
        let caesar_output = func_caesar_encrypt(output, shift);
        //console.log(caesar_output);
        return caesar_output;
    }else{
        let output = processString(text);
        output = output.slice(leng - slice_num) + output.slice(0, leng - slice_num);
        //console.log(output);
        let caesar_output = func_caesar_decrypt(output, shift);
        //console.log(caesar_output);
        return caesar_output;
    }

}
