
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
const NowPrize = ["จักรยาน", "เบงๆ", "เซี่ยงไฮ้"];
const NowCode = ["Osd5l9", "P1dfo5", "2g0yP"];
const countprize = [1, 2, 2];
const prize = ["จักรยาน", "เบงๆ", "เซี่ยงไฮ้"]; //, "ไอโฟน", "ลูกปิงปอง"
const code = ["Osd5l9", "Px94wr", "P1dfo5", "2g0yP", "0j8Eps"];
const gmail = ["ggez@gmail.com", "sapook@gmail.com", "tyot@gmail.com", "Omega@gmail.com", "Tpose@gmail.com"];

function randomprize() {
    let rand = Math.random() * prize.length;
    if (prize.length == 0) {
        Prize = "รางวัลหมดแล้ว!!";
    } else {
        Prize = prize[Math.floor(rand)];
    }

    return Prize
}

function randomcodeuser() {
    let rand = Math.random() * code.length;
    if (code.length == 0) {
        Code = "ไม่มีคนแล้ว!!";
    } else {
        Code = code[Math.floor(rand)];
    }

    return Code
}

const Confirm = {
    open(options) {
        options = Object.assign({}, {
            title: '',
            message: '',
            okText: 'นำออก',
            cancelText: 'ยกเลิก',
            onok: function () { },
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
            btnOk.disabled = true;
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
                if (prize.length != 0 && code.length != 0) {
                    NowPrize.push(RandomPrizeNow);
                    NowCode.push(RandomCodeNow);
                    for (let i = 0; i < prize.length; i++) {
                        if (prize[i] == RandomPrizeNow) {
                            if (countprize[i] > 1) {
                                countprize[i] -= 1;
                            } else {
                                countprize[i] -= 1;
                                prize.splice(i, 1);
                                countprize.splice(i, 1);
                            }
                        }
                    }
                    for (let i = 0; i < code.length; i++) {
                        if (code[i] == RandomCodeNow) {
                            code.splice(i, 1);
                        }
                    }
                    console.log(countprize.length);
                    console.log(prize.length);
                    console.log(code.length);

                    for (let i = NowPrize.length - 2; i >= 0; i--) {
                        document.getElementById('showrandom').innerHTML -= NowPrize[i];
                        document.getElementById('showrandom').innerHTML -= NowCode[i];
                    }
                    document.getElementById('showrandom').innerHTML = "";
                    for (let i = NowPrize.length - 1; i >= 0; i--) {
                        document.getElementById('showrandom').innerHTML += NowPrize[i] + "<br>";
                        document.getElementById('showrandom').innerHTML += NowCode[i] + "</br>";
                    }
                }

            },
        })
    }, 3000)
}
function ShowRandom(){
    for (let i = NowPrize.length - 1; i >= 0; i--) {
        document.getElementById('showrandom').innerHTML += NowPrize[i] + "<br>";
        document.getElementById('showrandom').innerHTML += NowCode[i] + "</br>";
    }
}

var type = 0;
function ShowAllUser() {
    var mytable = "<tr>"
    for (let i = 0; i < gmail.length; i++) {
        mytable += "<td class="+"indexCell"+"></td>"
        mytable += "<td>" + gmail[i] + "</td>"
        mytable += "<td>" + code[i] + "</td>"
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
    input = document.getElementById("search");
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

function AddPrize() {
    

}
function ShowAllPrizes() {
    var mytable = "<tr>"
    for (let i = 0; i < prize.length; i++) {
        mytable += "<td class="+"indexCell"+"></td>"
        mytable += "<td>" + prize[i] + "</td>"
        mytable += "<td>" + countprize[i] + "</td>";
        mytable += "<td>" + "<button class='delete' onclick=" + "DeletePrize(this,"+i+")" + ">ลบ</button>" + "</td>"
        mytable += "</tr><tr>"
    }
    mytable += "</tr>";
    document.write(mytable);
}
function EditPrize(button) {
    
}
function DeletePrize(button,i) {
    let row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    prize.splice(i, 1);
    countprize.splice(i,1);
}