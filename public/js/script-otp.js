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

datanew = [];
var names = "";
var surnames = "";
var phone = "";
var email = "";
var codeuser = "";
var Verifyotp = "";

async function postnewdata() {
    fetch('http://localhost:3000/addnewuser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: names, surname: surnames, phone: phone, email: email, codeuser: codeuser })
    });
}
async function getnewdata() {
    const res = await fetch('http://localhost:3000/getnewuser', {
        method: 'GET',
    })
    datanew = await res.json();
}
getnewdata()

function RandomCodeUser() {
    var string = '0123456789';
    let CodeUser = '';

    var len = string.length;
    while (true) {
        check = false;
        for (let i = 0; i < 6; i++) {
            CodeUser += string[Math.floor(Math.random() * len)];
        }
        for (let i = 0; i < datanew.length; i++) {
            if (datanew[i].CodeUser == CodeUser) {
                check = true;
            }
        }
        if (check == false) {
            break;
        }
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


CheckVerifyOTP = false;
function SendEmail() {
    document.getElementsByClassName('button-OTP')[0].disabled = true;
    names = document.getElementById("name").value;
    surnames = document.getElementById("surname").value;
    phone = document.getElementById("phone").value;
    email = document.getElementById("email").value;
    var errormessage = "";
    var samemessage = "";

    var body = RandomOTP();
    Verifyotp = body;

    CheckName = false;
    CheckSurname = false;
    CheckSamename = false;
    CheckEmail = false;
    CheckPhone = false;

    for (let i = 0; i < datanew.length; i++) {
        if (names == datanew[i].Name) {
            CheckName = true;
        }
        if (surnames == datanew[i].Surname) {
            CheckSurname = true;
        }
        if (CheckName == true && CheckSurname == true) {
            CheckSamename = true;
            break;
        }
        CheckName = false;
        CheckSurname = false;
    }
    for (let i = 0; i < datanew.length; i++) {
        if (phone == datanew[i].Phone) {
            CheckPhone = true;
        }
        if (email == datanew[i].Email_user) {
            CheckEmail = true;
        }
    }

    if (CheckVerifyOTP == false) {
        console.log(CheckEmail);
        if (names.length == 0) {
            errormessage += "กรุณาใส่ชื่อ";
        }
        if (errormessage.length == 0 && surnames.length == 0) {
            errormessage += "กรุณาใส่นามสกุล"
        } else if (surnames.length == 0) {
            errormessage += " นามสกุล"
        }
        if (errormessage.length == 0 && phone.length > 10 || errormessage.length == 0 && phone.length < 10) {
            errormessage += "กรุณาใส่เบอร์โทรศัพท์"
        } else if (errormessage.length > 0 && phone.length > 10 || errormessage.length > 0 && phone.length < 10) {
            errormessage += " เบอร์โทรศัพท์"
        }
        if (email.includes('@') && email.includes('.com') && errormessage.length == 0 && CheckEmail == false) {
            if (CheckSamename == false && CheckPhone == false) {
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
                            document.getElementById("name").value = "";
                            document.getElementById("surname").value = "";
                            document.getElementById("phone").value = "";
                            document.getElementById("email").value = "";
                        }
                    }
                )
            }

        } else {
            if (errormessage.length == 0 && CheckEmail == false) {
                errormessage += "กรุณาใส่ email ";
            } else if (errormessage.length > 0 && CheckEmail == false) {
                errormessage += " email ";
            }
        }

        if (CheckSamename == true) {
            samemessage = "ชื่อ นามสกุล"
        }
        if (CheckPhone == true && samemessage.length > 0) {
            samemessage += " เบอร์โทรศัพท์"
        } else if (CheckPhone == true && samemessage.length == 0) {
            samemessage += "เบอร์โทรศัพท์"
        }
        if (CheckEmail == true && samemessage.length > 0) {
            samemessage += " email "
        } else if (CheckEmail == true && samemessage.length == 0) {
            samemessage += "email "
        }

        if (errormessage.length > 0 && samemessage.length > 0) {
            alert(errormessage + "ให้ถูกต้อง" + " และ\n" + samemessage + "นี้เคยได้รับสิทธิ์ Code ของรางวัลไปแล้ว");
            document.getElementsByClassName('button-OTP')[0].disabled = false;
        } else if (errormessage.length > 0 && samemessage.length == 0) {
            alert(errormessage + "ให้ถูกต้อง");
            document.getElementsByClassName('button-OTP')[0].disabled = false;
        } else if (errormessage.length == 0 && samemessage.length > 0) {
            alert(samemessage + "นี้เคยได้รับสิทธิ์ Code ของรางวัลไปแล้ว");
            document.getElementsByClassName('button-OTP')[0].disabled = false;
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
        codeuser = RandomCodeUser();
        body = codeuser;
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
                    document.getElementsByClassName('button-Verify')[0].disabled = true;
                }
            }
        );
        Verifyotp = "";
        CheckVerifyOTP = true;
        postnewdata();
    } else if (OTP != Verifyotp && Verifyotp == "" && CheckVerifyOTP == false || Verifyotp == "") {
        alert("กรุณากรอกรายละเอียดส่ง OTP ใหม่")
    } else if (OTP != Verifyotp && CheckVerifyOTP == true) {
        alert("คุณได้รับ Code ของรางวัลแล้ว");
    } else if (OTP != Verifyotp) {
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
        document.getElementsByClassName('button-OTP')[0].disabled = false;
        alert('หมดเวลายืนยันตัวตน \nกรุณากรอกข้อมูลยืนยันตัวตนใหม่');
        Verifyotp = "";
    }
}