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
    new QRCode(qrcodeContainer, 'https://palm45.github.io/Luckydraw/otp.html');

    document.getElementById("qrcode-container").style.display = "block";
}

function nexthome() {
    window.location.href = "/";
}
function nextlistuser() {
    window.location.href = "/listuser";
}
function nextlistprize() {
    window.location.href = "/listprize";
}

const NowPrize = ["จักรยาน", "ลูกปิงปอง", "ลูกอม"];
const NowCode = ["995710", "125114", "876541"];
const NowNotHere = [];
const draw = [1, 1, 1, 0];
const countprize = [1, 2, 3, 1];
const prize = ["จักรยาน", "ลูกปิงปอง", "ลูกอม", "โอริโอ้"]; //, "ไอโฟน", "ลูกปิงปอง"
const code = ["995710", "686625", "125114", "849529", "876541", "582393", "109254"];
const gmail = ["ggez@gmail.com", "sapook@gmail.com", "tyot@gmail.com", "Omega@gmail.com", "Tpose@gmail.com", "City@gmail.com", "Reality@gmail.com"];
const phonelist = ["0915254875", "04456871254", "0842267595", "0451931245", "0894152455", "0421249963", "0426587911"];
const UserGet = [true, false, true, true, false, false, false];

function randomprize() {
    check = 0;

    for (let i = 0; i < draw.length; i++) {
        if (draw[i] == countprize[i]) {
            check++;
        }
    }

    if (check == countprize.length) {
        Prize = "รางวัลหมดแล้ว!!";
    } else {
        while (true) {
            let rand = Math.random() * prize.length;
            random = Math.floor(rand);
            if (countprize[random] > draw[random]) {
                Prize = prize[random];
                break;
            }
        }
    }

    return Prize
}

function randomcodeuser() {
    check = 0;

    for (let i = 0; i < code.length; i++) {
        if (UserGet[i] == true) {
            check++;
        }
    }
    for (let i = 0; i < NowNotHere.length; i++) {
        check++;
    }

    if (check == code.length) {
        Code = "ไม่มีคนแล้ว!!";
    } else {
        checkrandom = false;
        while (true) {
            let rand = Math.random() * code.length;
            random = Math.floor(rand);
            if (UserGet[random] == false) {
                if (NowNotHere.length > 0) {
                    for (let i = 0; i < NowNotHere.length; i++) {
                        if (NowNotHere[i] == code[random]) {
                            checkrandom = true
                        }
                    }
                }
                if (checkrandom == false) {
                    Code = code[random];
                    break;
                }
                checkrandom = false;
            }
        }
    }

    return Code
}

const Confirm = {
    open(options) {
        options = Object.assign({}, {
            title: '',
            message: '',
            okText: 'นำออก',
            removeText: 'ไม่อยู่',
            cancelText: 'ยกเลิก',
            onok: function () { },
            onremove: function () { },
            oncancel: function () { }
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
                        <button class="confirm__button confirm__button--remove confirm__button--fill">${options.removeText}</button>
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
        const btnRemove = template.content.querySelector('.confirm__button--remove');

        confirmEl.addEventListener('click', e => {
            if (e.target === confirmEl) {
                options.oncancel();
                this._close(confirmEl);
            }
        });

        btnOk.addEventListener('click', () => {
            options.onok();
            btnOk.disabled = true;
            this._close(confirmEl);
        });

        btnRemove.addEventListener('click', () => {
            options.onremove();
            btnRemove.disabled = true;
            this._close(confirmEl);
        });

        [btnCancel, btnClose].forEach(el => {
            el.addEventListener('click', () => {
                options.oncancel();
                el.disabled = true;
                this._close(confirmEl);
            });
        });

        document.body.appendChild(template.content);
    },

    _close(confirmEl) {
        confirmEl.classList.add('confirm--close');

        confirmEl.addEventListener('animationend', () => {
            document.body.removeChild(confirmEl);
        });
    }
};


ChangePrizeMode = false;
Prize = -1;
function ChangeModePrize() {
    if (ChangePrizeMode == false) {
        ChangePrizeMode = true;
        document.getElementById('randomprize').innerHTML = SelectPrizeRandom();
        document.getElementsByClassName('random-button')[0].disabled = true;
        document.getElementById('Mode').innerHTML = "เลือกรางวัล";
    } else {
        ChangePrizeMode = false;
        document.getElementsByClassName('random-button')[0].disabled = false;
        document.getElementById('Mode').innerHTML = "สุ่มรางวัล";

        check = 0;
        for (let i = 0; i < prize.length; i++) {
            if (draw[i] == countprize[i]) {
                check++;
            }
        }

        if (check == prize.length) {
            document.getElementById('randomprize').innerHTML = "รางวัลหมดแล้ว!!";
        } else {
            document.getElementById('randomprize').innerHTML = "..สุ่มรางวัล..";
        }
    }
}
function SelectPrizeRandom() {
    SelectPrize = "<select id='SelectPrizeRandom' onchange='SelectTypePrizeRandom(this.value)'>";
    SelectPrize += "<option value='-1'>เลือกรางวัล</option>";
    for (let i = 0; i < prize.length; i++) {
        if (draw[i] != countprize[i]) {
            SelectPrize += "<option value='" + prize[i] + "'>";
            SelectPrize += prize[i];
            SelectPrize += "</option>"
        }
    }
    SelectPrize += "</select>";
    return SelectPrize;
}
function SelectTypePrizeRandom(i) {
    if (i == -1) {
        document.getElementsByClassName('random-button')[0].disabled = true;
    } else {
        document.getElementsByClassName('random-button')[0].disabled = false;
        Prize = i;
    }
}
function getrandom() {
    let RandomPrizeNow = '';
    let RandomCodeNow = '';
    document.getElementsByClassName('random-button')[0].innerHTML = 'รอ...';
    document.getElementsByClassName('random-button')[0].disabled = true;

    if (ChangePrizeMode == false) {
        intervalPrize = setInterval(function () {
            RandomPrizeNow = randomprize();
            document.getElementById('randomprize').innerHTML = RandomPrizeNow;
        }, 600);
    } else {
        RandomPrizeNow = Prize;
    }

    intervalCode = setInterval(function () {
        RandomCodeNow = randomcodeuser();
        document.getElementById('randomcodeuser').innerHTML = RandomCodeNow;
    });

    setTimeout(function () {
        if (ChangePrizeMode == false) {
            clearInterval(intervalPrize);
        }
        clearInterval(intervalCode);
        document.getElementsByClassName('random-button')[0].innerHTML = 'สุ่มรางวัล';
        document.getElementsByClassName('random-button')[0].disabled = false;
        Confirm.open({
            title: 'ยินดีด้วย!!',
            message: "ได้" + String(RandomPrizeNow) + "<div>" + String(RandomCodeNow) + "</div>",
            onok: () => {
                var checkprize = 0;
                var checkUserGet = 0;
                for (let i = 0; i < draw.length; i++) {
                    if (draw[i] == countprize[i]) {
                        checkprize++;
                    }
                }
                for (let i = 0; i < UserGet.length; i++) {
                    if (UserGet[i] == true) {
                        checkUserGet++;
                    }
                }
                for (let i = 0; i < NowNotHere.length; i++) {
                    checkUserGet++;
                }
                if (checkprize != countprize.length && checkUserGet != code.length && RandomPrizeNow != -1) {
                    NowPrize.push(RandomPrizeNow);
                    NowCode.push(RandomCodeNow);
                    for (let i = 0; i < prize.length; i++) {
                        if (prize[i] == RandomPrizeNow) {
                            if (countprize[i] > draw[i]) {
                                draw[i]++;
                            }
                        }
                    }
                    for (let i = 0; i < code.length; i++) {
                        if (code[i] == RandomCodeNow) {
                            UserGet[i] = true;
                        }
                    }

                    console.log(prize);
                    console.log(draw);
                    console.log(code);
                    console.log(UserGet);

                    for (let i = NowPrize.length - 2; i >= 0; i--) {
                        document.getElementById('showrandom').innerHTML -= NowPrize[i];
                        document.getElementById('showrandom').innerHTML -= NowCode[i];
                    }
                    document.getElementById('showrandom').innerHTML = "";
                    for (let i = NowPrize.length - 1; i >= 0; i--) {
                        document.getElementById('showrandom').innerHTML += NowPrize[i] + "<br>";
                        document.getElementById('showrandom').innerHTML += NowCode[i] + "</br>";
                    }

                    if (ChangePrizeMode == true) {
                        for (let i = 1; i < document.getElementById('SelectPrizeRandom').options.length; i++) {
                            if (document.getElementById('SelectPrizeRandom').options[i].value == RandomPrizeNow) {
                                for (let j = 0; j < prize.length; j++) {
                                    if (RandomPrizeNow == prize[j]) {
                                        if (draw[j] == countprize[j]) {
                                            document.getElementById('SelectPrizeRandom').options[i].remove();
                                            document.getElementsByClassName('random-button')[0].disabled = true;
                                        }
                                    }
                                }
                            }
                        }
                        if (document.getElementById('SelectPrizeRandom').options.length == 1) {
                            document.getElementById('randomcodeuser').innerHTML = "ไม่มีคนแล้ว!!";
                        }
                    }

                }

            },
            onremove: () => {
                check = 0;
                for (let i = 0; i < code.length; i++) {
                    if (UserGet[i] == true) {
                        check++;
                    }
                }
                for (let i = 0; i < NowNotHere.length; i++) {
                    check++;
                }
                if (check < code.length && RandomPrizeNow != -1) {
                    NowNotHere.push(RandomCodeNow);
                    console.log(NowNotHere);
                }
            }
        })
    }, 3000)
}
function ShowRandom() {
        for (let i = NowPrize.length - 1; i >= 0; i--) {
            document.getElementById('showrandom').innerHTML += NowPrize[i] + "<br>";
            document.getElementById('showrandom').innerHTML += NowCode[i] + "</br>";
        }
}


const NotHere = {
    open(options) {
        options = Object.assign({}, {
            title: 'รายการคนที่ไม่อยู่',
            message: '',
            oncancel: function () { }
        }, options);
        const html = `
            <div class="confirm">
                <div class="confirm__windowNotHere">
                    <div class="confirm__titlebarNotHere">
                        <span class="confirm__title">${options.title}</span>
                        <button class="confirm__close">&times;</button>
                    </div>
                    <div class="confirm__contentNotHere">${options.message}</div>
                </div>
            </div>
        `;

        const template = document.createElement('template');
        template.innerHTML = html;

        // Elements
        const confirmEl = template.content.querySelector('.confirm');
        const btnClose = template.content.querySelector('.confirm__close');

        confirmEl.addEventListener('click', e => {
            if (e.target === confirmEl) {
                options.oncancel();
                this._close(confirmEl);
            }
        });

        [btnClose].forEach(el => {
            el.addEventListener('click', () => {
                options.oncancel();
                el.disabled = true;
                this._close(confirmEl);
            });
        });

        document.body.appendChild(template.content);
    },

    _close(confirmEl) {
        confirmEl.classList.add('confirm--close');

        confirmEl.addEventListener('animationend', () => {
            document.body.removeChild(confirmEl);
        });
    }
};
function ShowNotHereTable() {
    table = `<table id="myTableNotHere" class="display" style="width: 100%;"><thead><tr>`;
    for (var i = 0; i < NowNotHere.length; i++) {
        table += `<td>` + NowNotHere[i] + `</td>`
        table += `<td><button class="remove-nothere" onclick="DeleteNotHere(this,` + i + `)">นำออก</button></td>`
        table += `</tr><tr>`
    }
    table += `</tr>`
    table += `</thead></table>`
    return table;
}
function DeleteNotHere(button, i) {
    let row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    NowNotHere.splice(i, 1);
}
function ShowNotHere() {
    NotHere.open({
        message: ShowNotHereTable(),
    })
}
