
function input() {
    const inputs = document.getElementById("inputs");
    inputs.addEventListener("input", function (e) {
        const target = e.target;
        const val = target.value;

        if (isNaN(val)) {
            target.value = "";
            return;
        }

        if (val != "") {
            const next = target.nextElementSibling;
            if (next) {
                next.focus();
            }
        }
    });

    inputs.addEventListener("keyup", function (e) {
        const target = e.target;
        const key = e.key.toLowerCase();

        if (key == "backspace" || key == "delete") {
            target.value = "";
            const prev = target.previousElementSibling;
            if (prev) {
                prev.focus();
            }
            return;
        }
    });

}

var Verifyotp = "";
var email = "";
function RandomCodePrize() {
    //var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var string = '0123456789';
    let CodePrize = '';

    var len = string.length;
    for (let i = 0; i < 6; i++) {
        CodePrize += string[Math.floor(Math.random() * len)];
    }

    return CodePrize;
}

function RandomOTP() {
    var string = '0123456789';
    let OTP = '';

    var len = string.length;
    for (let i = 0; i < 4; i++) {
        OTP += string[Math.floor(Math.random() * len)];
    }
    return OTP;
}


CheckVerifyOTP = false;
function SendEmail() {
    email = document.getElementById("email").value;
    check = false;
    m = "";
    var body = RandomOTP();
    Verifyotp = body;

    if (CheckVerifyOTP == false) {
        Email.send({
            Host: "smtp.elasticemail.com",
            Username: "LuckyDraw@gmail.com",
            Password: "E4940A7C2D5FD3437AB28CD7DCE9948C56DB",
            To: email,
            From: "akkhraviphanon_p@silpakorn.edu",
            Subject: "OTP LuckyDraw",
            Body: body
        }).then(
            message => {
                if (message === "OK") {
                    alert("ส่ง OTP เรียบร้อย โปรดตรวจสอบใน email");
                    Timer(30);
                    document.getElementsByClassName('button-PV')[0].disabled = true;
                } else {
                    alert("กรุณาใส่ email ให้ถูกต้อง");
                }
            }
        )
    }else{
        alert("คุณได้รับ Code ของรางวัลแล้ว");
    }

    document.getElementById("email").value = "";
}
function VerifyOTP() {
    var input1 = document.getElementById("input1").value;
    var input2 = document.getElementById("input2").value;
    var input3 = document.getElementById("input3").value;
    var input4 = document.getElementById("input4").value;

    var OTP = input1 + input2 + input3 + input4;
    if (OTP == Verifyotp) {
        var body = RandomCodePrize();
        Email.send({
            Host: "smtp.elasticemail.com",
            Username: "LuckyDraw@gmail.com",
            Password: "E4940A7C2D5FD3437AB28CD7DCE9948C56DB",
            To: email,
            From: "akkhraviphanon_p@silpakorn.edu",
            Subject: "Code LuckyDraw",
            Body: body
        }).then(
            message => {
                if (message === "OK") {
                    alert("คุณได้รับ Code ของรางวัลแล้ว โปรดตรวจสอบใน email");
                }
            }
        );
        Verifyotp = "";
        CheckVerifyOTP = true;
    } else if (Verifyotp == "" && CheckVerifyOTP == false) {
        alert("กรุณาส่ง OTP ใหม่")
    } else {
        alert("OTP ไม่ถูกต้อง")
    }

    document.getElementById("input1").value = "";
    document.getElementById("input2").value = "";
    document.getElementById("input3").value = "";
    document.getElementById("input4").value = "";
}
function Timer(remaining) {
    var m = Math.floor(remaining / 60);
    var s = remaining % 60;

    m = m < 10 ? m : m;
    s = s < 10 ? '0' + s : s;
    document.getElementById('timer').innerHTML = m + ':' + s;
    remaining -= 1;

    if (remaining >= 0) {
        setTimeout(function () {
            if (CheckVerifyOTP == false) {
                Timer(remaining);
            } else {
                document.getElementById('timer').innerHTML = "0:00";
            }

        }, 1000);
        return;
    }

    if (Verifyotp != "" && CheckVerifyOTP == false) {
        alert('หมดเวลายืนยันตัวตน');
        Verifyotp = "";
    }
}