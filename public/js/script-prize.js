var type = 0;
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



function postprize(nameprizeadd,countprizeadd) {
    fetch('http://localhost:3000/addnewprize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nameprize: nameprizeadd, countprize: countprizeadd})
    });
}
function deletedbprize(iddelete){
    fetch('http://localhost:3000/deletenewprize', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({prize_id: iddelete})
    })
}


function AddPrize() {
    let name = document.getElementById("add-prize").value;
    let num = document.getElementById("add-numprize").value;
    if (name.length > 0) {
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
}
function Save_button(id){
    var buttonsContainer = document.getElementById('buttons_' + id);
    buttonsContainer.innerHTML = '<button class="edit-button" onclick="Edit_button('+id+')" type="button">แก้ไข</button>';
    document.getElementById('Nameprize_' + id).contentEditable = false;
    document.getElementById('Countprize_' + id).contentEditable = false;
    
    nameprizeupdate = document.getElementById('Nameprize_' + id).innerHTML;
    countprizeupdate = parseInt(document.getElementById('Countprize_' + id).innerHTML);
    drawprizeupdate = parseInt(document.getElementById('Drawprize_' + id).innerHTML);

    updatedbprize(id, nameprizeupdate, countprizeupdate, drawprizeupdate);
}
function Cancel_button(id){
    var buttonsContainer = document.getElementById('buttons_' + id);
    buttonsContainer.innerHTML = '<button class="edit-button" onclick="Edit_button('+id+')" type="button">แก้ไข</button>';
    document.getElementById('Nameprize_' + id).contentEditable = false;
    document.getElementById('Countprize_' + id).contentEditable = false;
}