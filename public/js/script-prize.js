var url = 'https://jaguar-literate-smoothly.ngrok-free.app'

function DeleteDBAllPrizes() {
    for (let i = 0; i < prize_id.length; i++) {
        deletedbprize(prize_id[i])
    }
}
function UploadPrize(names, num) {
    fetch(url + '/addprizeupload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nameprize: names, countprize: num })
    });
}
const PrizeAdditionOption = {
    open(options) {
        options = Object.assign({}, {
            title: 'ตัวเลือกเพิ่มเติม',
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
function ShowPrizeAdditionOption() {
    PrizeAdditionOption.open({
        message: ShowPrizeAdditionOptionPage(),
    })
}
function ShowPrizeAdditionOptionPage() {
    AdditionPage = ''
    
    AdditionPage += "<div style='margin:10px;font-size:25px'>อัปโหลดรายการของรางวัล<i class='fa fa-upload' style='font-size:30px;margin:10px'></i></div>"
    AdditionPage += "<div style='center; margin:10px'><input type='file' id='upload' accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' /></div>"
    AdditionPage += "<button onclick='ImportPrize()' class='UploadPrize'>อัปโหลดรายการของรางวัล</button>"
    AdditionPage += "<div style='margin:10px;font-size:15px'>คำเตือน: !! ต้องอัปโหลดเป็นไฟล์ .xlsx เท่านั้น</div>"
    AdditionPage += "<div style='margin:10px;font-size:15px'>(ให้คอลัมน์นึงเป็นชื่อของรางวัล อีกคอลัมน์นึงเป็นจำนวนของรางวัล)</div>"
    AdditionPage += "<div style='margin:10px;font-size:15px'>(ชื่อของรางวัลที่มีการเว้นวรรคตัวอักษรจะติดกันทั้งหมด)</div>"
    AdditionPage += "<div style='margin:10px;font-size:15px'>(กรณีที่ชื่อซ้ำกับของรางวัลที่มีอยู่แล้ว หรือ</div>"
    AdditionPage += "<div style='margin:10px;font-size:15px'>จำนวนน้อยกว่า 1 จะไม่ถูกเพิ่มเข้ารายการ)</div>"
    AdditionPage += "<div style='margin:10px;font-size:15px'>(แต่กรณีที่ชื่อซ้ำ แล้วจำนวนของรางวัลมากกว่า draw จำนวนนั้นจะอัพเดต)</div>"
    AdditionPage += "<div style='margin:10px;font-size:25px'>ลบข้อมูลของรางวัลทั้งหมด<i class='fa fa-trash' style='font-size:30px;margin:10px'></i></div>"
    
    AdditionPage += "<button onclick='DeleteAllPrize()' class='UserDelete'>ลบข้อมูลทั้งหมด</button>"
    AdditionPage += "<div style='margin:10px;font-size:15px'>คำเตือน: !! รายการของรางวัลจะหาายไปทั้งหมด</div>"
    AdditionPage += "<div style='margin:10px;font-size:15px'>(กรณีที่มีการสุ่มผู้โชคดีไปแล้วต้องลบข้อมูลผู้เข้าร่วมทั้งหมดก่อน)</div>"


    return AdditionPage;
}
async function ImportPrize() {
    var file = document.getElementById('upload');
    const XLSX = await import("https://cdn.sheetjs.com/xlsx-0.19.2/package/xlsx.mjs");

    readFile(file.files[0], function (e) {
        var data = new Uint8Array(e.target.result);

        var work_book = XLSX.read(data, { type: 'array' });

        var sheet_name = work_book.SheetNames;

        var sheet_data = XLSX.utils.sheet_to_json(work_book.Sheets[sheet_name[0]], { header: 1 });

        nameslist = [];
        numlist = [];
        names = "";
        num = 0;

        for (var row = 0; row < sheet_data.length; row++) {
            for (var cell = 0; cell < sheet_data[row].length; cell++) {
                if (typeof sheet_data[row][cell] == "string") {
                    if (sheet_data[row][cell].length != 0) {
                        for(let i=0;i<sheet_data[row][cell].length;i++){
                            if(sheet_data[row][cell].charAt(i) != " ") {
                                names += sheet_data[row][cell].charAt(i);
                            }
                        }
                    }
                } else if (typeof sheet_data[row][cell] == "number") {
                    if (sheet_data[row][cell] > 0) {
                        num = sheet_data[row][cell];
                    }
                }
            }

            for(let i=0;i<prize.length;i++){
                if(prize[i]==names){
                    if(draw[i]<=num){
                        updatedbprize(prize_id[i], prize[i], num, draw[i]);
                    }
                    names="";
                    break;
                }
            }

            if (names.length != 0 && num > 0) {
                nameslist.push(names);
                numlist.push(num);
            }

            names = "";
            num = 0;
        }

        UploadPrize(nameslist, numlist);
        
    })

    setTimeout(function () {
        window.location.href = '/listprize';
    }, 600);
}
function readFile(file, onLoadCallback) {
    var reader = new FileReader();
    reader.onload = onLoadCallback;
    reader.readAsArrayBuffer(file);
}
function DeleteAllPrize() {
    Swal.fire({
        title: "แน่ใจหรือไม่",
        text: "ลบข้อมูลของรางวัลทั้งหมด",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#4db17f",
        confirmButtonText: "ลบข้อมูลทั้งหมด",
        cancelButtonText: "ยกเลิก",
    }).then((result) => {
        if (result.isConfirmed) {
            check = false;
            for (let i = 0; i < draw.length; i++) {
                if (draw[i] > 0) {
                    check = true;
                }
            }
            if (check == false) {
                DeleteDBAllPrizes()
                Swal.fire({
                    confirmButtonText: "รับทราบ",
                    title: "ลบเรียบร้อยแล้ว",
                    text: "ตอนนี้ข้อมูลของรางวัลได้ถูกลบทั้งหมดแล้ว",
                    icon: "success"
                }).then((result) => {
                    if (result.isConfirmed) {
                        setTimeout(function () {
                            window.location.href = '/listprize';
                        }, 600);
                    }
                });
            } else {
                Swal.fire({
                    confirmButtonText: "รับทราบ",
                    icon: "error",
                    title: "ไม่สามารถลบได้",
                    text: "เนื่องจากได้มีการสุ่มผู้โชคดีไปแล้ว จึงไม่สามารถลบข้อมูลได้ กรุณาลบข้อมูลผู้เข้าร่วมทั้งหมดก่อน",
                });
            }
        }
    })
}



async function getStatus() {
    const res = await fetch(url + '/getStatusForm', {
        method: 'GET',
    })
    dataStatus = await res.json();
    if (dataStatus.Time > 0) {
        Timer(dataStatus.Time)
    }
}
getStatus()

function updateStatusForm(StatusForm) {
    fetch(url + '/UpdateStatusForm', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Status: StatusForm })
    })
}
function updateStatusTime(StatusTime) {
    fetch(url + '/UpdateTime', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ time: StatusTime })
    })
}

function Timer(remaining) {
    if (remaining == 0) {
        updateStatusForm(0);
    }

    updateStatusTime(remaining);

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
    document.getElementById('timer3').innerHTML = h + ':' + m + ':' + s;
    remaining -= 1;

    if (remaining >= 0) {
        setTimeout(function () {
            Timer(remaining);
        }, 1000);
        return;
    } else {
        document.getElementById("timer3").innerHTML = "";
    }
}

var type = 0;

function SelectType(select) {
    type = select;
    document.getElementById("SearchInput").value = "";
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("SearchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
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



function postprize(nameprizeadd, countprizeadd) {
    fetch(url + '/addnewprize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nameprize: nameprizeadd, countprize: countprizeadd })
    });
}
function deletedbprize(iddelete) {
    fetch(url + '/deletenewprize', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prize_id: iddelete })
    })
}
function updateNowRandom(id, Nowrandomprize) {
    fetch(url + '/updatenowrandom', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Now_id: id, Nowprize: Nowrandomprize })
    })
}
function updatedbuserprize(id, getprizenow) {
    fetch(url + '/updatenewprizeuser', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: id, getprize: getprizenow })
    })
}

function AddPrize() {
    let name = document.getElementById("add-prize").value;
    let num = document.getElementById("add-numprize").value;
    if (num.length == 0 && name.length == 0) {
        Swal.fire({
            confirmButtonText: "รับทราบ",
            html: "กรุณาใส่ชื่อ และจำนวนของรางวัล",
            icon: "info"
        })
    } else if (name.length > 0 && num.length == 0 || name.length > 0 && num == 0) {
        Samecheck = false;
        for (let i = 0; i < prize.length; i++) {
            if (name == prize[i]) {
                Samecheck = true;
            }
        }

        if (Samecheck == true) {
            Swal.fire({
                confirmButtonText: "รับทราบ",
                html: "<br>ชื่อของรางวัลซ้ำ กรุณาใส่ชื่อของรางวัลใหม่</br> และใส่จำนวนของรางวัล",
                icon: "warning"
            })
        }
    } else if (num.length == 0 || num == 0) {
        Swal.fire({
            confirmButtonText: "รับทราบ",
            html: "กรุณาใส่จำนวนของรางวัล",
            icon: "info"
        })
    } else if (name.length > 0) {
        Samecheck = false;
        for (let i = 0; i < prize.length; i++) {
            if (name == prize[i]) {
                Samecheck = true;
            }
        }

        if (Samecheck == true) {
            Swal.fire({
                confirmButtonText: "รับทราบ",
                html: "ชื่อของรางวัลซ้ำ กรุณาใส่ชื่อของรางวัลใหม่",
                icon: "warning"
            })
        } else {
            postprize(name, parseInt(num));

            document.getElementById("add-prize").value = "";
            document.getElementById("add-numprize").value = 1;

            setTimeout(function () {
                window.location.href = '/listprize';
            }, 600);
        }
    } else {
        Swal.fire({
            confirmButtonText: "รับทราบ",
            html: "กรุณาใส่ชื่อของรางวัล",
            icon: "info"
        })
    }
}
function DeletePrize(id) {
    checkdraw = false;
    for (let i = 0; i < prize.length; i++) {
        if (prize_id[i] == id && draw[i] > 0) {
            checkdraw = true;
        }
    }
    if (checkdraw == false) {
        deletedbprize(id);
        setTimeout(function () {
            window.location.href = '/listprize';
        }, 600);
    } else {
        Swal.fire({
            confirmButtonText: "รับทราบ",
            title: "ไม่สามารถลบได้",
            html: "เนื่องจากของรางวัลนี้มีผู้โชคดีได้ไปแล้ว",
            icon: "error"
        })
    }

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
function Edit_button(id) {
    var buttonsContainer = document.getElementById('buttons_' + id);
    buttonsContainer.innerHTML = '<button class="save-button" onclick="Save_button(' + id + ')">บันทึก</button>' +
        '<button class="delete-button" onclick="DeletePrize(' + id + ')">ลบ</button>' +
        '<div><button class="cancel-button" onclick="Cancel_button(' + id + ')">ยกเลิก</button></div>';

    document.getElementById('Nameprize_' + id).contentEditable = true;
    document.getElementById('Countprize_' + id).contentEditable = true;

    document.getElementById('Nameprize_' + id).style.backgroundColor = "white";
    document.getElementById('Countprize_' + id).style.backgroundColor = "white";
    document.getElementById('Nameprize_' + id).style.color = "black";
    document.getElementById('Countprize_' + id).style.color = "black";
    document.getElementById('Nameprize_' + id).style.border = "black solid";
    document.getElementById('Countprize_' + id).style.border = "black solid";

    $('#Countprize_' + id).keypress(function (e) {
        if (isNaN(String.fromCharCode(e.which)) || e.keyCode == 32 || e.keyCode == 13) {
            e.preventDefault();
        }
    });
    $('#Countprize_' + id).on('keydown paste', function (event) {
        if ($(this).text().length === 4 && event.keyCode != 8) {
            event.preventDefault();
        }
    });
    $('#Nameprize_' + id).keypress(function (e) {
        if (e.keyCode == 13 || e.keyCode == 32) {
            e.preventDefault();
        }
    });
}
function Save_button(id) {
    var buttonsContainer = document.getElementById('buttons_' + id);

    checksame = false;
    checkdraw = false;
    drawcase = 0;
    nameprizeupdate = "";

    nameprize = document.getElementById('Nameprize_' + id).innerHTML;
    countprizeupdate = parseInt(document.getElementById('Countprize_' + id).innerHTML);
    drawprizeupdate = parseInt(document.getElementById('Drawprize_' + id).innerHTML);

    for (let i = 0; i <= nameprize.length; i++) {
        if (nameprize.charAt(i) != " " && nameprize.charAt(i) != "\n") {
            nameprizeupdate += nameprize.charAt(i);
        }
    }

    console.log(nameprizeupdate);

    for (let i = 0; i < prize.length; i++) {
        if (prize[i] == nameprizeupdate && prize_id[i] != id) {
            checksame = true;
        }
    }


    for (let i = 0; i < prize_id.length; i++) {
        if (prize_id[i] == id) {
            if (draw[i] > countprizeupdate) {
                drawcase = 1;
                checkdraw = true;
            } else if (countprizeupdate <= 0) {
                drawcase = 2
                checkdraw = true;
            } else if (isNaN(countprizeupdate)) {
                drawcase = 3
                checkdraw = true;
            }
        }
    }

    if (drawcase == 1 && checksame == true) {
        Swal.fire({
            confirmButtonText: "รับทราบ",
            html: "ชื่อของรางวัลนี้ซ้ำ กรุณาใส่ชื่อของรางวัลใหม่และ<br>กรุณาใส่จำนวนของรางวัลอีกครั้ง</br> เนื่องจากของรางวัลนี้มีผู้โชคดีได้ไปแล้ว",
            icon: "warning"
        })
    } else if (drawcase == 2 && checksame == true) {
        Swal.fire({
            confirmButtonText: "รับทราบ",
            html: "ชื่อของรางวัลนี้ซ้ำ กรุณาใส่ชื่อของรางวัลใหม่และ <br>กรุณาใส่จำนวนของรางวัลอีกครั้ง</br>",
            icon: "warning"
        })
    } else if (drawcase == 3 && checksame == true) {
        Swal.fire({
            confirmButtonText: "รับทราบ",
            html: "ชื่อของรางวัลนี้ซ้ำ กรุณาใส่ชื่อของรางวัลใหม่และ <br>กรุณาใส่จำนวนของรางวัล</br>",
            icon: "warning"
        })
    } else if (drawcase == 1 && nameprizeupdate == "") {
        Swal.fire({
            confirmButtonText: "รับทราบ",
            html: "กรุณาใส่ชื่อของรางวัลใหม่และ<br>กรุณาใส่จำนวนของรางวัลอีกครั้ง</br> เนื่องจากของรางวัลนี้มีผู้โชคดีได้ไปแล้ว",
            icon: "warning"
        })
    } else if (drawcase == 2 && nameprizeupdate == "") {
        Swal.fire({
            confirmButtonText: "รับทราบ",
            html: "กรุณาใส่ชื่อของรางวัลใหม่และ <br>กรุณาใส่จำนวนของรางวัลอีกครั้ง</br>",
            icon: "info"
        })
    } else if (drawcase == 3 && nameprizeupdate == "") {
        Swal.fire({
            confirmButtonText: "รับทราบ",
            html: "กรุณาใส่ชื่อของรางวัลใหม่และ <br>กรุณาใส่จำนวนของรางวัล</br>",
            icon: "info"
        })
    } else if (drawcase == 1) {
        Swal.fire({
            confirmButtonText: "รับทราบ",
            html: "<br>กรุณาใส่จำนวนของรางวัลอีกครั้ง</br> เนื่องจากของรางวัลนี้มีผู้โชคดีได้ไปแล้ว",
            icon: "warning"
        })
    } else if (drawcase == 2) {
        Swal.fire({
            confirmButtonText: "รับทราบ",
            html: "กรุณาใส่จำนวนของรางวัลอีกครั้ง",
            icon: "info"
        })
    } else if (drawcase == 3) {
        Swal.fire({
            confirmButtonText: "รับทราบ",
            html: "กรุณาใส่จำนวนของรางวัล",
            icon: "info"
        })
    } else if (checksame == true) {
        Swal.fire({
            confirmButtonText: "รับทราบ",
            html: "ชื่อของรางวัลนี้ซ้ำ กรุณาใส่ชื่อของรางวัลใหม่",
            icon: "warning"
        })
    } else if (nameprizeupdate == "") {
        Swal.fire({
            confirmButtonText: "รับทราบ",
            html: "กรุณาใส่ชื่อของรางวัล",
            icon: "info"
        })
    }

    if (checksame == false && checkdraw == false && nameprizeupdate != "") {
        updatedbprize(id, nameprizeupdate, countprizeupdate, drawprizeupdate);

        for (let i = 0; i < prize.length; i++) {
            if (prize_id[i] == id) {
                for (let j = 0; j < NowRandom_id.length; j++) {
                    if (prize[i] == NowPrize[j]) {
                        NowPrize[j] = nameprizeupdate;
                        updateNowRandom(NowRandom_id[j], nameprizeupdate);
                    }
                }
                for (let j = 0; j < user_id.length; j++) {
                    if (Getprize[j] == prize[i]) {
                        Getprize[j] = nameprizeupdate;
                        updatedbuserprize(user_id[j], nameprizeupdate);
                    }
                }
                prize[i] = nameprizeupdate;
                countprize[i] = countprizeupdate;
            }
        }

        document.getElementById('Nameprize_' + id).contentEditable = false;
        document.getElementById('Countprize_' + id).contentEditable = false;
        document.getElementById('Nameprize_' + id).style.backgroundColor = "rgb(8, 68, 23)";
        document.getElementById('Countprize_' + id).style.backgroundColor = "rgb(8, 68, 23)";
        document.getElementById('Nameprize_' + id).style.color = "white";
        document.getElementById('Countprize_' + id).style.color = "white";
        document.getElementById('Nameprize_' + id).style.border = "none";
        document.getElementById('Countprize_' + id).style.border = "none";
        buttonsContainer.innerHTML = '<button class="edit-button" onclick="Edit_button(' + id + ')" type="button">แก้ไข</button>';
    }
}
function Cancel_button(id) {
    for (let i = 0; i < prize_id.length; i++) {
        if (prize_id[i] == id) {
            document.getElementById('Nameprize_' + id).innerHTML = prize[i];
            document.getElementById('Countprize_' + id).innerHTML = countprize[i];
        }
    }
    var buttonsContainer = document.getElementById('buttons_' + id);
    buttonsContainer.innerHTML = '<button class="edit-button" onclick="Edit_button(' + id + ')" type="button">แก้ไข</button>';
    document.getElementById('Nameprize_' + id).contentEditable = false;
    document.getElementById('Countprize_' + id).contentEditable = false;

    document.getElementById('Nameprize_' + id).style.backgroundColor = "rgb(8, 68, 23)";
    document.getElementById('Countprize_' + id).style.backgroundColor = "rgb(8, 68, 23)";
    document.getElementById('Nameprize_' + id).style.color = "white";
    document.getElementById('Countprize_' + id).style.color = "white";
    document.getElementById('Nameprize_' + id).style.border = "none";
    document.getElementById('Countprize_' + id).style.border = "none";
}