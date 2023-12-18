
function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}

function generateQRCode() {
    on()
    let qrcodeContainer = document.getElementById("qrcode");
    qrcodeContainer.innerHTML = "";
    new QRCode(qrcodeContainer, 'https://palm45.github.io/Luckydraw/Scan_OTP/otp.html');

    document.getElementById("qrcode-container").style.display = "block";
}

function ButtonNextPage() {
    document.getElementById("index").addEventListener("click", nexthome);
    function nexthome() {
        window.location.href = "index.html";
    }

    document.getElementById("listuser").addEventListener("click", nextlistuser);
    function nextlistuser() {
        window.location.href = "listuser.html";
    }

    document.getElementById("listprize").addEventListener("click", nextlistprize);
    function nextlistprize() {
        window.location.href = "listprize.html";
    }
}

var num1 = 0;
var num2 = 0;
const NowRandom = [];
const NowPrize = [];
const NowCode = [];
const prize = ["จักรยาน", "เบงๆ", "เซี่ยงไฮ้", "ไอโฟน", "ลูกปิงปอง"];
const code = ["Osd5l9", "Px94wr", "P1dfo5", "2g0yP", "0j8Eps"];
function randomprize() {
    let rand = Math.random() * prize.length;
    Prize = prize[Math.floor(rand)];
    return Prize
}

function randomcodeuser() {
    let rand = Math.random() * code.length;
    Code = code[Math.floor(rand)];
    return Code
}

const Confirm = {
    open (options) {
        options = Object.assign({}, {
            title: '',
            message: '',
            okText: 'นำออก',
            cancelText: 'ยกเลิก',
            onok: function () {},
            oncancel: function () {}
        }, options);
        const html = `
            <div class="confirm">
                <div class="confirm__window">
                    <div class="confirm__titlebar">
                        <span class="confirm__title">${options.title}</span>
                        <button class="confirm__close">&times;</button>
                    </div>
                    <div class="confirm__content">${options.message}</div>
                    <div class="confirm__buttons">
                        <button class="confirm__button confirm__button--ok confirm__button--fill">${options.okText}</button>
                        <button class="confirm__button confirm__button--cancel">${options.cancelText}</button>
                    </div>
                </div>
            </div>
        `;

        const template = document.createElement('template');
        template.innerHTML = html;

        // Elements
        const confirmEl = template.content.querySelector('.confirm');
        const btnClose = template.content.querySelector('.confirm__close');
        const btnOk = template.content.querySelector('.confirm__button--ok');
        const btnCancel = template.content.querySelector('.confirm__button--cancel');

        confirmEl.addEventListener('click', e => {
            if (e.target === confirmEl) {
                options.oncancel();
                this._close(confirmEl);
            }
        });

        btnOk.addEventListener('click', () => {
            options.onok();
            this._close(confirmEl);
        });

        [btnCancel, btnClose].forEach(el => {
            el.addEventListener('click', () => {
                options.oncancel();
                this._close(confirmEl);
            });
        });

        document.body.appendChild(template.content);
    },

    _close (confirmEl) {
        confirmEl.classList.add('confirm--close');

        confirmEl.addEventListener('animationend', () => {
            document.body.removeChild(confirmEl);
        });
    }
};

function getrandom() {
    let RandomPrizeNow = '';
    let RandomCodeNow = '';
    document.getElementsByClassName('random-button')[0].innerHTML = 'รอ...';
    document.getElementsByClassName('random-button')[0].disabled = true;
    intervalPrize = setInterval(function () {
        RandomPrizeNow = randomprize();
        document.getElementById('randomprize').innerHTML = RandomPrizeNow;
    });
    intervalCode = setInterval(function () {
        RandomCodeNow = randomcodeuser();
        document.getElementById('randomcodeuser').innerHTML = RandomCodeNow;
    });

    setTimeout(function () {
        clearInterval(intervalPrize);
        clearInterval(intervalCode);
        document.getElementsByClassName('random-button')[0].innerHTML = 'สุ่มรางวัล';
        document.getElementsByClassName('random-button')[0].disabled = false;
        Confirm.open({
            title: 'ยินดีด้วย!!',
            message: String(RandomCodeNow),
            onok: () => {
                NowPrize.push(RandomPrizeNow);
                NowCode.push(RandomCodeNow);
                for(let i=0;i<prize.length;i++){
                    if(prize[i] == RandomPrizeNow){
                        delete prize[i];
                        prize.splice(i, 1);
                    }
                }
                for(let i=0;i<code.length;i++){
                    if(code[i] == RandomCodeNow){
                        delete code[i];
                        code.splice(i,1);
                    }
                }
                console.log(prize);
                console.log(code);
                
                for (let i = NowPrize.length - 2; i >= 0; i--) {
                    document.getElementById('showrandom').innerHTML -= NowPrize[i];
                    document.getElementById('showrandom').innerHTML -= NowCode[i];
                }
                document.getElementById('showrandom').innerHTML = "";
                for (let i = NowPrize.length - 1; i >= 0; i--) {
                    document.getElementById('showrandom').innerHTML += NowPrize[i] + "<br>";
                    document.getElementById('showrandom').innerHTML += NowCode[i] + "</br>";
                }
            },
        })
    }, 3000)
}