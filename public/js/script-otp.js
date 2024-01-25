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
function RandomCodeUser() {
    var string = '0123456789';
    let CodeUser = '';

    var len = string.length;
    for (let i = 0; i < 6; i++) {
        CodeUser += string[Math.floor(Math.random() * len)];
    }

    return CodeUser;
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

const namelist = [];
const surnamelist=[];
const phonelist=[];
const emaillist=[];
const CodeUser=[];
let UserList1 = [];
let UserList2 = [];

CheckVerifyOTP = false;
function SendEmail() {
    var names = document.getElementById("name").value;
    var surnames = document.getElementById("surname").value;
    var phone = document.getElementById("phone").value;
    email = document.getElementById("email").value;
    var errormessage = "";
    m = "";
    var body = RandomOTP();
    Verifyotp = body;

    if (CheckVerifyOTP == false) {
        console.log(names.length);

        $.ajax({
            type: "GET",
            url: "insert.php"
        }).done(
            
        );

        if (names.length == 0) {
            errormessage += "กรุณาใส่ชื่อ";
        }
        if (errormessage.length == 0 && surnames.length == 0) {
            errormessage += "กรุณาใส่นามสกุล"
        } else if (surnames.length == 0) {
            errormessage += " นามสกุล"
        }
        if (errormessage.length == 0 && phone.length == 0) {
            errormessage += "กรุณาใส่เบอร์โทร"
        } else if (phone.length == 0 || phone.length < 10) {
            errormessage += " เบอร์โทร"
        }
        if (email.length > 0 && errormessage.length == 0 && phone.length == 10) {
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
                        UserList1 = {
                            Name: names,
                            Surname: surnames,
                            Phone: phone,
                            Email_user: email,
                        }
                        namelist.push(names);
                        surnamelist.push(surnames);
                        phonelist.push(phone);
                        emaillist.push(email);
                        document.getElementById("email").value = "";
                        document.getElementById("name").value = "";
                        document.getElementById("surname").value = "";
                        document.getElementById("phone").value = "";
                    }
                }
            )
        }else if(email.length == 0 && errormessage.length == 0){
            errormessage += "กรุณาใส่ email";
        }else if(email.length == 0){
            errormessage += " email ";
        }
        if(errormessage.length > 0){
            alert(errormessage + "ให้ถูกต้อง");
        }
    } else {
        alert("คุณได้รับ Code ของรางวัลแล้ว");
    }
}
function VerifyOTP() {
    var input1 = document.getElementById("input1").value;
    var input2 = document.getElementById("input2").value;
    var input3 = document.getElementById("input3").value;
    var input4 = document.getElementById("input4").value;

    var OTP = input1 + input2 + input3 + input4;
    if (OTP == Verifyotp && Verifyotp != "") {
        var body = RandomCodeUser();
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
                    alert("คุณได้รับ Code เข้าร่วม Lucky Draw แล้ว โปรดตรวจสอบใน email");
                    UserList2 = {
                        CodeUser: body,
                        Getprize: "",
                        UserGet: false,
                    }
                }
            }
        );
        Verifyotp = "";
        CheckVerifyOTP = true;
    } else if (Verifyotp == "" && CheckVerifyOTP == false) {
        alert("กรุณาส่ง OTP ใหม่")
    } else if (CheckVerifyOTP == true){
        alert("คุณได้รับ Code ของรางวัลแล้ว");
    }else {
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
        document.getElementsByClassName('button-PV')[0].disabled = false;
        alert('หมดเวลายืนยันตัวตน');
        Verifyotp = "";
    }
}
