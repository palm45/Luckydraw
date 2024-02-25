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
    document.getElementById('timer2').innerHTML = h + ':' + m + ':' + s;
    remaining -= 1;

    if (remaining >= 0) {
        setTimeout(function () {
            Timer(remaining);
        }, 1000);
        return;
    }else{
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

function CensorPhone(phone){
    PhoneNew = "";
    for(let i = 0; i < phone.length; i++){
        if(i%3==0 && i!=0 && i<7){
            PhoneNew += '-'
        }
        if(i<6){
            PhoneNew += 'x'
        }else{
            PhoneNew += phone.charAt(i);
        }
    }
    document.write(PhoneNew);
}

function ShowPrizeUser(nameprize){
    names="";
    if(nameprize.length==0){
        names="-"
    }else{
        names=nameprize;
    }
    document.write(names);
}