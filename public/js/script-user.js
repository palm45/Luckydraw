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
                if (txtValue.toUpperCase().indexOf(prize[num]) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}

function ShowAllUser() {
    var mytable = "<tr>"
    check = false;
    for (let i = 0; i < gmail.length; i++) {
        mytable += "<td>" + (i + 1) + "</td></td>"
        mytable += "<td>";
        for (let j = 0; j < 10; j++) {
            if (j < 6) {
                mytable += "x";
                if ((j + 1) % 3 == 0) {
                    mytable += "-";
                }
            } else {
                mytable += phonelist[i].charAt(j);
            }


        }

        mytable += "</td>";
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