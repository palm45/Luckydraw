
function on() {
    document.getElementById("overlay").style.display = "block";
  }
  
function off() {
    document.getElementById("overlay").style.display = "none";
}

function generateQRCode(data) {
    on()
    var url = data
    let qrcodeContainer = document.getElementById("qrcode");
    qrcodeContainer.innerHTML = "";
    new QRCode(qrcodeContainer, data);
    
    document.getElementById("qrcode-container").style.display = "block";
}

function ButtonNextPage(){
    document.getElementById("index").addEventListener("click", nexthome);
    function nexthome() {
        window.location.href = "index.html";
    }

    document.getElementById("listuser").addEventListener("click", nextlistuser);
    function nextlistuser(){
        window.location.href = "listuser.html";
    }

    document.getElementById("listprize").addEventListener("click", nextlistprize);
    function nextlistprize(){
        window.location.href = "listprize.html";
    }
}

