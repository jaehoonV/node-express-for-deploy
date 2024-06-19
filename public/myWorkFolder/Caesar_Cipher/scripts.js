let input_text = document.getElementById('input_text');
        input_text.addEventListener("input", (e) => {
            encrypt();
            decrypt();
            decrypt94();
        })

        let shift = document.getElementById('shift');
        shift.addEventListener("input", (e) => {
            encrypt();
            decrypt();
            decrypt94();
        })

        let spe_num = document.getElementById('spe_num');
        spe_num.addEventListener("input", (e) => {
            encrypt();
            decrypt();
            decrypt94();
        })

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

            function func_caesar_encrypt(text, shift) {
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

            function func_caesar_decrypt(text, shift) {
                return func_caesar_encrypt(text, -shift);
            }

            let leng = text.length;
            let slice_num = shift % leng;

            if (type == 'e') {
                let slice_text = text.slice(slice_num) + text.slice(0, slice_num);
                let output = processString(slice_text);
                //console.log(output);
                let caesar_output = func_caesar_encrypt(output, shift);
                //console.log(caesar_output);
                return caesar_output;
            } else {
                let output = processString(text);
                output = output.slice(leng - slice_num) + output.slice(0, leng - slice_num);
                //console.log(output);
                let caesar_output = func_caesar_decrypt(output, shift);
                //console.log(caesar_output);
                return caesar_output;
            }
        }

        // 암호화 버튼 클릭 시 실행되는 함수
        function encrypt() {
            let text = document.getElementById('input_text').value;
            let shift = parseInt(document.getElementById('shift').value);
            let spe_num = parseInt(document.getElementById('spe_num').value);
            let spe_shift = create_spe_num(shift, spe_num);
            let encryptedText = encryption(text, spe_shift, 'e');
            document.getElementById('result_e').innerText = encryptedText;
        }

        // 복호화 버튼 클릭 시 실행되는 함수
        function decrypt() {
            let text = document.getElementById('input_text').value;
            let shift = parseInt(document.getElementById('shift').value);
            let spe_num = parseInt(document.getElementById('spe_num').value);
            let spe_shift = create_spe_num(shift, spe_num);
            let decryptedText = encryption(text, spe_shift, 'd');
            document.getElementById('result_d').innerText = decryptedText;
        }

        // 복호화 함수
        function decrypt94() {
            //console.log("decrypt94!");
            let text = document.getElementById('input_text').value;
            document.getElementById('result94').innerText = "";
            let s = 1;
            while (s < 94) {
                let decryptedText = encryption(text, s, 'd');
                //console.log("decryptedText = " + decryptedText);
                document.getElementById('result94').insertAdjacentHTML("beforeend", "<div><strong> shift" + s + " : " + " </strong> " + escapeHtml(decryptedText) + "</div>");
                s++;
            }
        }

        // 특수 문자를 HTML 엔티티로 변환하는 함수
        function escapeHtml(text) {
            return text.replace(/[&<>"']/g, function (char) {
                switch (char) {
                    case '&':
                        return '&amp;';
                    case '<':
                        return '&lt;';
                    case '>':
                        return '&gt;';
                    case '"':
                        return '&quot;';
                    case "'":
                        return '&#39;';
                }
            });
        }