
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

function nexthome() {
    window.location.href = "index.html";
}
function nextlistuser() {
    window.location.href = "listuser.html";
}
function nextlistprize() {
    window.location.href = "listprize.html";
}

const NowPrize = ["จักรยาน", "ลูกปิงปอง", "ลูกอม"];
const NowCode = ["995710", "125114", "876541"];
const NowNotHere = [];
const draw = [1, 1, 1, 0];
const countprize = [1, 2, 3, 1];
const prize = ["จักรยาน", "ลูกปิงปอง", "ลูกอม", "โอริโอ้"]; //, "ไอโฟน", "ลูกปิงปอง"
const code = ["995710", "686625", "125114", "849529", "876541", "582393","109254"];
const gmail = ["ggez@gmail.com", "sapook@gmail.com", "tyot@gmail.com", "Omega@gmail.com", "Tpose@gmail.com", "City@gmail.com", "Reality@gmail.com"];
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

        check=0;
        for(let i = 0; i <prize.length;i++){
            if(draw[i]==countprize[i]){
                check++;
            }
        }
        
        if(check==prize.length){
            document.getElementById('randomprize').innerHTML = "รางวัลหมดแล้ว!!";
        }else{
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
        });
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
            message: String(RandomCodeNow),
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
                        if(document.getElementById('SelectPrizeRandom').options.length==1){
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



var type = 0;
function ShowAllUser() {
    var mytable = "<tr>"
    check = false;
    for (let i = 0; i < gmail.length; i++) {
        mytable += "<td>" + (i + 1) + "</td></td>"
        for (let j = 0; j < NowCode.length; j++) {
            if (code[i] == NowCode[j]) {
                check = true;
                mytable += "<td>" + NowPrize[j] + "</td>"
                break;
            }
        }
        if (check == false) {
            mytable += "<td>" + "-" + "</td>"
        }
        check = false;
        mytable += "<td>" + code[i] + "</td>"
        mytable += "</tr><tr>"
    }
    mytable += "</tr>";
    document.write(mytable);
}
function SelectType(select) {
    type = select;
}
function SearchTable() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("SearchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[type];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
function ShowSearch() {
    var x = document.getElementById("SearchInput");
    var x2 = document.getElementById("SearchType");

    document.getElementById("PrizeSelect").style.display = "none";

    x.style.display = "block";
    x2.style.display = "block";
}
function ShowPrizeSelect() {
    var x = document.getElementById("PrizeSelect");

    document.getElementById("SearchInput").style.display = "none";
    document.getElementById("SearchType").style.display = "none";

    x.style.display = "block";
    console.log(document.getElementById("SearchType").value);
}
function PrizeSelect() {
    var PrizeSelect = "<option name='choice0' value='-1'>แสดงทั้งหมด</option>";
    PrizeSelect += "<option name='choice0' value='-2'>ยังไม่ได้</option>"
    for (let i = 0; i < prize.length; i++) {
        PrizeSelect += "<option name='choice" + (i + 1) + "' value=" + i + ">" + prize[i] + "</option>";
    }
    document.write(PrizeSelect);
}
function SearchPrize(num) {
    var table, tr, td, i, txtValue;
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    if (num == "-1") {
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                txtValue = td.textContent || td.innerText;
                tr[i].style.display = "";
            }
        }
    } else if (num == "-2") {
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf("-") > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    } else {
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(prize[num]) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}


var count = 0;
function AddPrize() {
    let name = document.getElementById("add-prize").value;
    let num = document.getElementById("add-numprize").value;
    if (name.length > 0) {
        var table = document.getElementById("myTable");
        var row = table.insertRow(table.rows.length);
        var i = table.rows.length - 3 + count;

        row.insertCell(0).innerHTML = table.rows.length - 2 + count;
        row.insertCell(1).innerHTML = '<td><div class="prize_data" >' + name + '</div></td>';
        row.insertCell(2).innerHTML = '<td><div class="numprize_data" >' + num + '</div></td>';
        row.insertCell(3).innerHTML = '<td><div class="numprize_data" >' + 0 + '</div></td>';
        row.insertCell(4).innerHTML = '<button class="delete-button" onclick="DeletePrize(this,' + i + ')">ลบ</button>';

        prize.push(name);
        countprize.push(parseInt(num));
        draw.push(0);

        document.getElementById("add-prize").value = "";
        document.getElementById("add-numprize").value = 1;

        console.log(prize);
        console.log(countprize);
        console.log(draw);
    }
}
function ShowAllPrizes() {
    var mytable = "<tr>"
    for (let i = 0; i < prize.length; i++) {
        mytable += "<td>" + (i + 1) + "</td>"
        mytable += "<td><div>" + prize[i] + "</div></td>"
        mytable += "<td><div>" + countprize[i] + "</div></td>";
        mytable += "<td><div>" + draw[i] + "</div></td>"
        mytable += "<td>";
        mytable += "<button class='delete-button' onclick='DeletePrize(this," + i + ")'>ลบ</button>";
        mytable += "</td>"
        mytable += "</tr><tr>"
    }
    mytable += "</tr>"

    document.write(mytable);
}
function DeletePrize(button, i) {
    let row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    prize.splice(i, 1);
    countprize.splice(i, 1);
    draw.splice(i, 1);
    count++;

    console.log(prize);
    console.log(countprize);
    console.log(draw);
}
function SearchPrizeNow() {
    var x = document.getElementById("text-add");
    var x2 = document.getElementById("add-prize");
    var x3 = document.getElementById("add-numprize");
    var x4 = document.getElementById("add-prize-button");

    var y = document.getElementById("SearchInput");
    var y2 = document.getElementById("SearchType");

    x.style.display = "none";
    x2.style.display = "none";
    x3.style.display = "none";
    x4.style.display = "none";

    y.style.display = "block";
    y2.style.display = "block";
}
function AddNewPrize() {
    var x = document.getElementById("text-add");
    var x2 = document.getElementById("add-prize");
    var x3 = document.getElementById("add-numprize");
    var x4 = document.getElementById("add-prize-button");

    var y = document.getElementById("SearchInput");
    var y2 = document.getElementById("SearchType");

    x.style.display = "block";
    x2.style.display = "block";
    x3.style.display = "block";
    x4.style.display = "block";

    y.style.display = "none";
    y2.style.display = "none";
}
