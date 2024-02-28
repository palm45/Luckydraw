var url = 'https://jaguar-literate-smoothly.ngrok-free.app'

async function getStatus(){
    const res = await fetch( url + '/getStatusForm', {
        method: 'GET',
    })
    dataStatus = await res.json();
    if(dataStatus.Time>0){
        Timer(dataStatus.Time)
    }
}
getStatus()

function updateStatusForm(StatusForm){
    fetch( url + '/UpdateStatusForm', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({Status: StatusForm})
    })
}
function updateStatusTime(StatusTime){
    fetch( url + '/UpdateTime', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({time: StatusTime})
    })
}

function Timer(remaining) {
    if(remaining==0){
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
    }else{
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



function postprize(nameprizeadd,countprizeadd) {
    fetch( url + '/addnewprize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nameprize: nameprizeadd, countprize: countprizeadd})
    });
}
function deletedbprize(iddelete){
    fetch( url + '/deletenewprize', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({prize_id: iddelete})
    })
}
function updateNowRandom(id, Nowrandomprize){
    fetch( url + '/updatenowrandom', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({Now_id: id, Nowprize: Nowrandomprize})
    })
}
function updatedbuserprize(id, getprizenow){
    fetch( url + '/updatenewprizeuser', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id: id, getprize : getprizenow})
    })
}

function AddPrize() {
    let name = document.getElementById("add-prize").value;
    let num = document.getElementById("add-numprize").value;
    if(num.length == 0 && name.length == 0){
        alert("กรุณาใส่ชื่อ และจำนวนของรางวัล")
    }else if(num.length == 0){
        alert("กรุณาใส่จำนวนของรางวัล")
    }else if (name.length > 0) {
        Samecheck = false;
        for (let i = 0; i < prize.length; i++) {
            if (name == prize[i]) {
                Samecheck = true;
            }
        }

        if (Samecheck == true) {
            alert("ชื่อของรางวัลซ้ำ กรุณาใส่ชื่อของรางวัลใหม่");
        } else {
            postprize(name,num);

            document.getElementById("add-prize").value = "";
            document.getElementById("add-numprize").value = 1;

            setTimeout(function() {
                window.location.href='/listprize';
            }, 600);
        }
    } else {
        alert("กรุณาใส่ชื่อของรางวัล");
    }
}
function DeletePrize(id) {
    deletedbprize(id);
    setTimeout(function() {
        window.location.href='/listprize';
    }, 600);
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
function Edit_button(id){
    var buttonsContainer = document.getElementById('buttons_' + id);
    buttonsContainer.innerHTML = '<button class="save-button" onclick="Save_button('+id+')">บันทึก</button>'+
                                '<button class="delete-button" onclick="DeletePrize('+id+')">ลบ</button>'+
                                '<div><button class="cancel-button" onclick="Cancel_button('+id+')">ยกเลิก</button></div>';
    
    document.getElementById('Nameprize_' + id).contentEditable = true;
    document.getElementById('Countprize_' + id).contentEditable = true;

    document.getElementById('Nameprize_' + id).style.backgroundColor = "white";
    document.getElementById('Countprize_' + id).style.backgroundColor = "white";
    document.getElementById('Nameprize_' + id).style.color = "black";
    document.getElementById('Countprize_' + id).style.color = "black";
    document.getElementById('Nameprize_' + id).style.border = "black solid";
    document.getElementById('Countprize_' + id).style.border = "black solid";

    $('#Countprize_' + id).keypress(function(e) {
        if (isNaN(String.fromCharCode(e.which)) || e.keyCode == 32 || e.keyCode == 13){
            e.preventDefault();
        }
    });
    $('#Countprize_' + id).on('keydown paste', function(event) {
        if($(this).text().length === 4 && event.keyCode != 8) { 
            event.preventDefault();
        }
    });
    $('#Nameprize_' + id).keypress(function(e) {
        if (e.keyCode == 13){
            e.preventDefault();
        }
    });
}
function Save_button(id){
    var buttonsContainer = document.getElementById('buttons_' + id);
    
    nameprizeupdate = document.getElementById('Nameprize_' + id).innerHTML;
    countprizeupdate = parseInt(document.getElementById('Countprize_' + id).innerHTML);
    drawprizeupdate = parseInt(document.getElementById('Drawprize_' + id).innerHTML);

    for(let i = 0; i < prize.length;i++){
        if(prize_id[i] == id){
            for(let j = 0; j < NowRandom_id.length;j++){
                if(prize[i]==NowPrize[j]){
                    updateNowRandom(NowRandom_id[j], nameprizeupdate);
                }
            }
            for(let j = 0; j < user_id.length;j++){
                if(Getprize[j] == prize[i]){
                    updatedbuserprize(user_id[j], nameprizeupdate);
                }
            }
        }
    }


    for(let i = 0; i < prize_id.length;i++){
        if(prize_id[i] == id){
            if(countprizeupdate <= 0){
                alert("กรุณาใส่จำนวนของรางวัลอีกครั้ง")
            }else if(draw[i]<=countprizeupdate){
                updatedbprize(id, nameprizeupdate, countprizeupdate, drawprizeupdate);
                document.getElementById('Nameprize_' + id).contentEditable = false;
                document.getElementById('Countprize_' + id).contentEditable = false;
                document.getElementById('Nameprize_' + id).style.backgroundColor = "rgb(8, 68, 23)";
                document.getElementById('Countprize_' + id).style.backgroundColor = "rgb(8, 68, 23)";
                document.getElementById('Nameprize_' + id).style.color = "white";
                document.getElementById('Countprize_' + id).style.color = "white";
                document.getElementById('Nameprize_' + id).style.border = "none";
                document.getElementById('Countprize_' + id).style.border = "none";
                buttonsContainer.innerHTML = '<button class="edit-button" onclick="Edit_button('+id+')" type="button">แก้ไข</button>';
            }else if(draw[i]>countprizeupdate){
                alert("มีคนได้ของรางวัลนี้ไปแล้ว ไม่สามารถลดของรางวัลได้")
            }
        }
    }
}
function Cancel_button(id){
    for(let i = 0; i < prize_id.length;i++){
        if(prize_id[i] == id){
            document.getElementById('Nameprize_' + id).innerHTML = prize[i];
            document.getElementById('Countprize_' + id).innerHTML = countprize[i];
        }
    }
    var buttonsContainer = document.getElementById('buttons_' + id);
    buttonsContainer.innerHTML = '<button class="edit-button" onclick="Edit_button('+id+')" type="button">แก้ไข</button>';
    document.getElementById('Nameprize_' + id).contentEditable = false;
    document.getElementById('Countprize_' + id).contentEditable = false;

    document.getElementById('Nameprize_' + id).style.backgroundColor = "rgb(8, 68, 23)";
    document.getElementById('Countprize_' + id).style.backgroundColor = "rgb(8, 68, 23)";
    document.getElementById('Nameprize_' + id).style.color = "white";
    document.getElementById('Countprize_' + id).style.color = "white";
    document.getElementById('Nameprize_' + id).style.border = "none";
    document.getElementById('Countprize_' + id).style.border = "none";
}