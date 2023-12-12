
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

const prize = ["จักรยาน","เบงๆ","เซี่ยงไฮ้","ไอโฟน","ลูกปิงปอง"];
const code = ["Osd5l9","Px94wr","P1dfo5","2g0yP","0j8Eps"];
function randomprize(){
    let rand = Math.random() * prize.length;
    Prize = prize[Math.floor(rand)];
    return Prize
}

function randomcodeuser(){
    let rand = Math.random() * code.length;
    Code = code[Math.floor(rand)];
    return Code
}

function getrandom(){
    document.getElementsByClassName('random-button')[0].innerHTML = 'รอ...'; 
    document.getElementsByClassName('random-button')[0].disabled = true;
    intervalPrize = setInterval(function(){
        document.getElementById('randomprize').innerHTML = randomprize();
    });
    intervalCode = setInterval(function(){
        document.getElementById('randomcodeuser').innerHTML = randomcodeuser();
    });

    setTimeout(function(){
        clearInterval(intervalPrize);
        clearInterval(intervalCode);
        document.getElementsByClassName('random-button')[0].innerHTML = 'สุ่มรางวัล';
        document.getElementsByClassName('random-button')[0].disabled = false;
    },3000);
}