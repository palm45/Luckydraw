
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
    var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
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

function SendEmail() {
        email = document.getElementById("email").value;
        
        var body = RandomOTP();
        Verifyotp = body;
        
        Email.send({
            Host: "smtp.elasticemail.com",
            Username: "LuckyDraw@gmail.com",
            Password: "E4940A7C2D5FD3437AB28CD7DCE9948C56DB",
            To: email,
            From: "akkhraviphanon_p@silpakorn.edu",
            Subject: "OTP LuckyDraw",
            Body: body
        }).then(
            message => alert(message)
        );
        
        document.getElementById("email").value = "";
}

function VerifyOTP(){
    var input1 = document.getElementById("input1").value;
    var input2 = document.getElementById("input2").value;
    var input3 = document.getElementById("input3").value;
    var input4 = document.getElementById("input4").value;

    var OTP = input1 + input2 + input3 + input4;
    if(OTP==Verifyotp){
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
            message => alert(message)
        );
    }else{
        alert("กรุณายืนยันตัวตนใหม่")
    }

    document.getElementById("input1").value = "";
    document.getElementById("input2").value = "";
    document.getElementById("input3").value = "";
    document.getElementById("input4").value = "";
}