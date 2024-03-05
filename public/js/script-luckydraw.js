var url = 'https://jaguar-literate-smoothly.ngrok-free.app'

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
    new QRCode(qrcodeContainer, url + '/qr');

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
function nextsetqrcode() {
    window.location.href = "/setotp";
}

//const NowPrize = ["จักรยาน", "ลูกปิงปอง", "ลูกอม"];
//const NowCode = ["995710", "125114", "876541"];
//const draw = [1, 1, 1, 0];
//const countprize = [1, 2, 3, 1];
//const prize = ["จักรยาน", "ลูกปิงปอง", "ลูกอม", "โอริโอ้"]; //, "ไอโฟน", "ลูกปิงปอง"
//const code = ["995710", "686625", "125114", "849529", "876541", "582393", "109254"];
//const gmail = ["ggez@gmail.com", "sapook@gmail.com", "tyot@gmail.com", "Omega@gmail.com", "Tpose@gmail.com", "City@gmail.com", "Reality@gmail.com"];
//const phonelist = ["0915254875", "04456871254", "0842267595", "0451931245", "0894152455", "0421249963", "0426587911"];
//const UserGet = [true, false, true, false, true, false, false];

datauser = [];

const user_id = [];
const namelist = [];
const surnamelist = [];
const phonelist = [];
const gmail = [];
const code = [];
const UserGet = [];
const Getprize = [];

const prize_id = [];
const prize = [];
const countprize = [];
const draw = [];

const NowRandom_id = [];
const NowPrize = [];
const NowCode = [];
const NowNotHere_id = [];
const NowNotHere = [];

async function getdbuser() {
    const res = await fetch( url + '/getnewuser', {
        method: 'GET',
    })
    datauser = await res.json();
    for(let i=0;i<datauser.length;i++){
        user_id.push(datauser[i].User_id);
        namelist.push(datauser[i].Name);
        surnamelist.push(datauser[i].Surname);
        phonelist.push(datauser[i].Phone);
        gmail.push(datauser[i].Email_user);
        code.push(datauser[i].CodeUser);
        Getprize.push(datauser[i].Getprize);
        if(datauser[i].UserGet==0){
            UserGet.push(false);
        }else if(datauser[i].UserGet==1){
            UserGet.push(true);
        }
    }
}
getdbuser();


async function getdbprize(){
    const res = await fetch( url + '/getnewprize', {
        method: 'GET',
    })
    dataprize = await res.json();
    for(let i=0;i<dataprize.length;i++){
        prize_id.push(dataprize[i].Prize_id);
        prize.push(dataprize[i].Nameprize);
        countprize.push(dataprize[i].Countprize);
        draw.push(dataprize[i].Draw);
    }
}
getdbprize();

async function getdbnowrandom(){
    const res = await fetch( url + '/getnewnowrandom', {
        method: 'GET',
    })
    datarandomnow = await res.json();
    for(let i=0;i<datarandomnow.length;i++){
        NowRandom_id.push(datarandomnow[i].Now_id);
        NowPrize.push(datarandomnow[i].NowPrizeList);
        NowCode.push(datarandomnow[i].NowCodeList);
    }
}
getdbnowrandom()

async function getdbnownothere(){
    const res = await fetch( url + '/getnewnownothere', {
        method: 'GET',
    })
    datanownothere = await res.json();
    for(let i=0;i<datanownothere.length;i++){
        NowNotHere_id.push(datanownothere[i].NowNotHere_id);
        NowNotHere.push(datanownothere[i].CodeNotHere);;
    }
}
getdbnownothere()

function postnowrandom(nowprizeadd, nowcodeadd){
    fetch( url + '/addnewnowrandom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nowprizelist: nowprizeadd, nowcodelist: nowcodeadd})
    });
}

function postnownothere(codeadd){
    fetch( url + '/addnewnownothere', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({codenownothere: codeadd})
    })
}

function updatedbprize(idupdate, nameprizeupdate, countprizeupdate, drawprizeupdate){
    fetch( url + '/updatenewprize', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({prize_id: idupdate, nameprize: nameprizeupdate, countprize: countprizeupdate, drawprize: drawprizeupdate})
    })
}

function updatedbuser(idupdate, nameuserupdate, surnameuserupdate, phoneupdate, emailuserupdate, codeuserupdate, getprizeupdate, usergetupdate){
    fetch( url + '/updatenewuser', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id: idupdate, name: nameuserupdate, surname: surnameuserupdate, phone: phoneupdate, email_user: emailuserupdate, codeuser: codeuserupdate, getprize: getprizeupdate, userget: usergetupdate})
    })
}

function deletedbnownothere(codedelete){
    fetch( url + '/deletenewnothere', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({codenothere_id: codedelete})
    })
}

async function getStatus2(){
    const res = await fetch( url + '/getStatusForm', {
        method: 'GET',
    })
    dataStatus = await res.json();
    if(dataStatus.Time>0){
        Timer2(dataStatus.Time)
    }
}
getStatus2()

function updateStatusForm2(StatusForm){
    fetch( url + '/UpdateStatusForm', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({Status: StatusForm})
    })
}
function updateStatusTime2(StatusTime){
    fetch( url + '/UpdateTime', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({time: StatusTime})
    })
}

function Timer2(remaining) {
    if(remaining==0){
        updateStatusForm2(0);
    }

    updateStatusTime2(remaining);

    var h = 0;
    var m = 0;
    var s = 0;
    if (remaining >= 3600) {
        h = Math.floor(remaining / 3600);
        m = Math.floor(Math.floor(remaining % 3600) / 60);
        s = Math.floor(Math.floor(remaining % 3600) % 60);
    } else if (remaining < 3600) {
        m = Math.floor(remaining / 60);
        s = Math.floor(remaining % 60);
    }

    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    document.getElementById('timer1').innerHTML = h + ':' + m + ':' + s;
    remaining -= 1;

    if (remaining >= 0) {
        setTimeout(function () {
            Timer2(remaining);
        }, 1000);
        return;
    }else{
        document.getElementById("timer1").innerHTML = "";
    }
}


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
                        if (NowNotHere[i] == code[random]|| NowCode[i] == code[random]) {
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
            okText: 'รับของรางวัล',
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
    ChangePrizeMode = document.querySelector('#changemode').checked;
    if (ChangePrizeMode == true) {
        document.getElementById('randomprize').innerHTML = SelectPrizeRandom();
        document.getElementById("random-button").style.pointerEvents = "none"
        document.getElementById('Mode').innerHTML = "เลือกรางวัล";
        console.log(document.querySelector('#changemode').checked);
    }else if(ChangePrizeMode == false){
        document.getElementById("random-button").style.pointerEvents = "auto"
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
        console.log(document.querySelector('#changemode').checked);
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
        document.getElementById("random-button").style.pointerEvents = "none"
    } else {
        document.getElementById("random-button").style.pointerEvents = "auto"
        Prize = i;
    }
}
function getrandom() {
    let RandomPrizeNow = '';
    let RandomCodeNow = '';
    document.getElementsByClassName('random-button')[0].innerHTML = 'รอ...';
    document.getElementById("random-button").style.pointerEvents = "none"
    document.getElementById('changemode').setAttribute('disabled', 'disabled');

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
        document.getElementById("random-button").style.pointerEvents = "auto"
        document.getElementById('changemode').removeAttribute('disabled');
        Confirm.open({
            title: 'ยินดีด้วย!!',
            message: "ได้" + RandomPrizeNow + "<div>" + String(RandomCodeNow) + "</div>",
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
                    idupdate = 0;
                    nameprizeupdate = '';
                    countprizeupdate = 0;
                    drawprizeupdate = 0;

                    iduserupdate = 0;
                    nameuserupdate = '';
                    surnameuserupdate = '';
                    phoneupdate = '';
                    emailuserupdate = '';
                    codeuserupdate = RandomCodeNow;
                    getprizeupdate = RandomPrizeNow;
                    usergetupdate = 0;

                    NowPrize.push(RandomPrizeNow);
                    NowCode.push(RandomCodeNow);
                    for (let i = 0; i < prize.length; i++) {
                        if (prize[i] == RandomPrizeNow) {
                            if (countprize[i] > draw[i]) {
                                draw[i]++;
                                idupdate = prize_id[i];
                                nameprizeupdate = prize[i];
                                countprizeupdate = countprize[i];
                                drawprizeupdate = draw[i];
                            }
                        }
                    }
                    for (let i = 0; i < code.length; i++) {
                        if (code[i] == RandomCodeNow) {
                            UserGet[i] = true;
                            iduserupdate = user_id[i];
                            nameuserupdate = namelist[i];
                            surnameuserupdate = surnamelist[i];
                            phoneupdate = phonelist[i];
                            emailuserupdate = gmail[i];
                            usergetupdate = 1;
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
                                            document.getElementById("random-button").style.pointerEvents = "none"
                                        }
                                    }
                                }
                            }
                        }
                        if (document.getElementById('SelectPrizeRandom').options.length == 1) {
                            document.getElementById('randomcodeuser').innerHTML = "ไม่มีคนแล้ว!!";
                        }
                    }
                    postnowrandom(RandomPrizeNow, RandomCodeNow);
                    updatedbprize(idupdate, nameprizeupdate, countprizeupdate, drawprizeupdate);
                    updatedbuser(iduserupdate, nameuserupdate, surnameuserupdate, phoneupdate, emailuserupdate, codeuserupdate, getprizeupdate, usergetupdate)
                    /*setTimeout(function() {
                        window.location.href='/';
                    }, 600);*/
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
                    postnownothere(RandomCodeNow);
                    NowNotHere.push(RandomCodeNow);
                    console.log(NowNotHere);
                    setTimeout(function() {
                        window.location.href='/';
                    }, 600);
                }
            }
        })
    }, 3000)
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
    table = `<table id="myTableNotHere" class="display" style="width: 95%;"><thead><tr>`;
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
    codedelete = NowNotHere_id[i];
    NowNotHere.splice(i, 1);
    deletedbnownothere(codedelete);
}
function ShowNotHere() {
    NotHere.open({
        message: ShowNotHereTable(),
    })
}
