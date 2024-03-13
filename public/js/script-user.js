var url = 'https://squirrel-inspired-quickly.ngrok-free.app'


function deletedbuser(user_id){
    fetch( url + '/deleteuser', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id: user_id})
    })
}
function deletedbnowrandom(nowrandom_id){
    fetch( url + '/deletenowrandom', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nowrandom_id: nowrandom_id})
    })
}
function updatedbdefultdrawprize(idupdate){
    fetch( url + '/updatedefaultdrawprize', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({prize_id: idupdate})
    })
}


function UpdateDBDefaultDrawPrize(){
    for(let i=0;i<prize_id.length;i++){
        updatedbdefultdrawprize(prize_id[i])
    }
}
function DeleteDBAllUser(){
    for(let i=0;i<user_id.length;i++){
        deletedbuser(user_id[i])
    }
}
function DeleteDBAllNowRandom(){
    for(let i=0;i<NowRandom_id.length;i++){
        deletedbnowrandom(NowRandom_id[i])
    }
}
function DeleteDBAllNowNotHere(){
    for(let i = 0; i <NowNotHere_id.length;i++){
        deletedbnownothere(NowNotHere_id[i])
    }
}


const UserAdditionOption = {
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
function ShowUserAdditionOption() {
    UserAdditionOption.open({
        message: ShowUserAdditionOptionPage(),
    })
}
function ShowUserAdditionOptionPage() {

    AdditionPage = "<div class='center' style='margin:10px;font-size:25px'>ดาวน์โหลดข้อมูลผู้เข้าร่วมทั้งหมด<i class='fa fa-download' style='font-size:30px;margin:10px'></i></div>"
    AdditionPage += "<button onclick='DownloadUserXLSX()' class='UserDownload'>ดาวน์โหลด Excel</button>";
    AdditionPage += "<div style='margin:10px;font-size:25px'>ลบข้อมูลผู้เข้าร่วมทั้งหมด<i class='fa fa-trash' style='font-size:30px;margin:10px'></i></div>"
    AdditionPage += "<button onclick='DeleteAllUser()' class='UserDelete'>ลบข้อมูลทั้งหมด</button>"
    AdditionPage += "<div style='margin:10px;font-size:15px'>คำเตือน: !! ข้อมูลผู้เข้าร่วมจะหายไปทั้งหมด</div>"

    return AdditionPage;
}
async function DownloadUserXLSX() {
    var userlist = []
    var worksheetCol = [
        {wch: 7},
        {wch: 15},
        {wch: 15},
        {wch: 10},
        {wch: 27},
        {wch: 8},
        {wch: 15},
        {wch: 7}
    ]

    for(let i=0;i<datauser.length;i++){
        userlist.push({
            User_id: datauser[i].User_id,
            Name: datauser[i].Name,
            Surname: datauser[i].Surname,
            Phone: datauser[i].Phone,
            Email_user: datauser[i].Email_user,
            CodeUser: datauser[i].CodeUser,
            Getprize: datauser[i].Getprize,
            UserGet: datauser[i].UserGet
        })
    }

    const XLSX = await import("https://cdn.sheetjs.com/xlsx-0.19.2/package/xlsx.mjs");

    const worksheet = XLSX.utils.json_to_sheet(userlist)

    worksheet['!cols'] = worksheetCol;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "LuckyDrawUser");

    XLSX.writeFile(workbook, "LuckyDrawUser.xlsx", { compression: true });
}
function DeleteAllUser(){
    Swal.fire({
        title: "แน่ใจหรือไม่",
        text: "ลบข้อมูลผู้เข้าร่วมทั้งหมด",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#4db17f",
        confirmButtonText: "ลบข้อมูลทั้งหมด",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
            UpdateDBDefaultDrawPrize()
            DeleteDBAllNowRandom()
            DeleteDBAllNowNotHere()
            DeleteDBAllUser()
            
            Swal.fire({
                confirmButtonText: "รับทราบ",
                title: "ลบเรียบร้อยแล้ว",
                text: "ตอนนี้ข้อมูลผู้เข้าร่วมได้ถูกลบทั้งหมดแล้ว",
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed) {
                    setTimeout(function() {
                        window.location.href='/listuser';
                    }, 600);
                }
            });
        }
    });
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
    document.getElementById('timer2').innerHTML = h + ':' + m + ':' + s;
    remaining -= 1;

    if (remaining >= 0) {
        setTimeout(function () {
            Timer(remaining);
        }, 1000);
        return;
    } else {
        document.getElementById("timer2").innerHTML = "";
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
function PrizeSelect(PrizeName, i) {
    var PrizeSelect = "<option name='choice" + (i + 1) + "' value=" + PrizeName + ">" + PrizeName + "</option>";
    document.write(PrizeSelect);
}
function SearchPrize(seach) {
    var table, tr, td, i, txtValue;
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    if (seach == "-1") {
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                txtValue = td.textContent || td.innerText;
                tr[i].style.display = "";
            }
        }
    } else if (seach == "-2") {
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[2];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf("-") > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    } else if (seach == "-3") {
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[2];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf("-") > -1) {
                    tr[i].style.display = "none";
                } else {
                    tr[i].style.display = "";
                }
            }
        }
    } else {
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[2];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(seach) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}

function CensorPhone(phone) {
    PhoneNew = "";
    for (let i = 0; i < phone.length; i++) {
        if (i % 3 == 0 && i != 0 && i < 7) {
            PhoneNew += '-'
        }
        if (i < 6) {
            PhoneNew += 'x'
        } else {
            PhoneNew += phone.charAt(i);
        }
    }
    document.write(PhoneNew);
}

function ShowPrizeUser(nameprize) {
    names = "";
    if (nameprize.length == 0) {
        names = "-"
    } else {
        names = nameprize;
    }
    document.write(names);
}