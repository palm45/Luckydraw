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

var count = 0;
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
    } else {
        alert("กรุณาใส่ชื่อของรางวัล");
    }
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