var url = 'https://upward-poodle-surely.ngrok-free.app'

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
var codeuser = "";
var Verifyotp = "";

var resendname = "";
var resendsurnames = "";
var resendphone = "";
var resendemail = "";

function postnewdata() {
    fetch(url + '/addnewuser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: resendname, surname: resendsurnames, phone: resendphone, email: resendemail, codeuser: codeuser })
    });
}
async function getnewdata() {
    const res = await fetch(url + '/getnewuser', {
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


CheckSend1 = false;
CheckSend2 = false;
CheckResend = false;
function sendEmail(email, body, title) {
    HeadSubject = '';
    if (title == "ส่งรหัส OTP เรียบร้อย") {
        CheckSend1 = true;
        HeadSubject = 'Lucky Draw OTP'
    } else if (title == "ส่งรหัส Lucky Draw เรียบร้อย") {
        CheckSend2 = true;
        HeadSubject = 'Lucky Draw Code'
        document.getElementById("button-Verify").style.pointerEvents = "none"
    } else if (title == "ส่งรหัส OTP อีกครั้งเรียบร้อย") {
        CheckResend = true;
        HeadSubject = 'Lucky Draw OTP'
    }
    
    (function () {
        emailjs.init("rs8fYhfb75rO3Viy5");
    })();
    var parms = {
        sendername: "luckydrawfinalproject@gmail.com",
        to: email,
        subject: HeadSubject,
        message: body,
    };

    var serviceID = "service_xgbpzke"
    var templateID = "template_fll2wnq"

    emailjs.send(serviceID, templateID, parms)
        .then(res => {
            Swal.fire({
                confirmButtonText: "รับทราบ",
                title: title,
                html: "<br>โปรดตรวจสอบใน Email ของคุณ <br/> (ถ้าหาไม่เจออาจจะอยู่ใน <class style='font-weight:bold'>จดหมายขยะ</class>)",
                icon: "success"
            })

        }).catch(err => {
            Swal.fire({
                confirmButtonText: "รับทราบ",
                title: "ส่งรหัส OTP ไม่ได้",
                icon: "error"
            })
            if (title == "ส่งรหัส OTP เรียบร้อย") {
                document.getElementById("button-OTP").style.pointerEvents = "auto"
            }
        });
}


CheckVerifyOTP = false;
function SendEmail() {
    document.getElementById("button-OTP").style.pointerEvents = "none"
    names = document.getElementById("name").value;
    surnames = document.getElementById("surname").value;
    phone = document.getElementById("phone").value;
    email = document.getElementById("email").value;

    var errormessage = "";
    var samemessage = "";

    Verifyotp = RandomOTP();

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

                body = 'รหัส OTP \n' + Verifyotp;

                sendEmail(email, body, "ส่งรหัส OTP เรียบร้อย");

                if (CheckSend1 == true) {
                    TimerOTP(10);
                    resendname = names;
                    resendsurnames = surnames;
                    resendphone = phone;
                    resendemail = email;
                    document.getElementById("name").value = "";
                    document.getElementById("surname").value = "";
                    document.getElementById("phone").value = "";
                    document.getElementById("email").value = "";
                    CheckSend1 = false;
                }
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
            Swal.fire({
                confirmButtonText: "รับทราบ",
                html: "<br>" + errormessage + "ให้ถูกต้อง" + " และ</br>" + samemessage + "นี้เคยได้รับรหัส Lucky Draw ไปแล้ว",
                icon: "warning"
            })
            document.getElementById("button-OTP").style.pointerEvents = "auto"
        } else if (errormessage.length > 0 && samemessage.length == 0) {
            Swal.fire({
                confirmButtonText: "รับทราบ",
                html: errormessage + "ให้ถูกต้อง",
                icon: "info"
            })
            document.getElementById("button-OTP").style.pointerEvents = "auto"
        } else if (errormessage.length == 0 && samemessage.length > 0) {
            Swal.fire({
                confirmButtonText: "รับทราบ",
                html: samemessage + "นี้ <br> เคยได้รับรหัส Lucky Draw ไปแล้ว </br>",
                icon: "warning"
            })
            document.getElementById("button-OTP").style.pointerEvents = "auto"
        }
    } else {
        Swal.fire({
            confirmButtonText: "รับทราบ",
            html: "คุณได้รับรหัส Lucky Draw แล้ว",
            icon: "warning"
        })
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
        body = 'รหัส LuckyDraw\n' + codeuser;
        sendEmail(resendemail, body, "ส่งรหัส Lucky Draw เรียบร้อย")
        if(CheckSend2 == true){
            Verifyotp = "";
            CheckVerifyOTP = true;
            postnewdata();
            CheckSend2 = false;
        }
    } else if (OTP != Verifyotp && Verifyotp == "" && CheckVerifyOTP == false || Verifyotp == "") {
        Swal.fire({
            confirmButtonText: "รับทราบ",
            html: "<br>กรุณากรอกรายละเอียดส่ง OTP ใหม่</br> หรือกดส่ง OTP ใหม่อีกครั้ง",
            icon: "info"
        })
    } else if (OTP != Verifyotp && CheckVerifyOTP == true) {
        Swal.fire({
            confirmButtonText: "รับทราบ",
            html: "คุณได้รับรหัส Lucky Draw แล้ว",
            icon: "warning"
        })
    } else if (OTP != Verifyotp) {
        Swal.fire({
            confirmButtonText: "รับทราบ",
            html: "OTP ไม่ถูกต้อง",
            icon: "error"
        })
    }

    document.getElementById("input1").value = "";
    document.getElementById("input2").value = "";
    document.getElementById("input3").value = "";
    document.getElementById("input4").value = "";
}
function TimerOTP(remaining) {
    var m = Math.floor(remaining / 60);
    var s = remaining % 60;

    m = m < 10 ? m : m;
    s = s < 10 ? '0' + s : s;
    document.getElementById('timer').innerHTML = m + ':' + s;
    remaining -= 1;

    if (remaining >= 0) {
        setTimeout(function () {
            if (CheckVerifyOTP == false) {
                TimerOTP(remaining);
            } else {
                document.getElementById('timer').innerHTML = "0:00";
            }

        }, 1000);
        return;
    }

    if (Verifyotp != "" && CheckVerifyOTP == false) {
        document.getElementById("button-OTP").style.pointerEvents = "auto"
        Swal.fire({
            confirmButtonText: "รับทราบ",
            title: "หมดเวลายืนยันตัวตน",
            html: "<br>กรุณากรอกข้อมูลยืนยันตัวตนใหม่</br> หรือกดส่ง OTP ใหม่อีกครั้ง",
            icon: "warning"
        })
        Verifyotp = "";
        document.getElementById("resend").style.pointerEvents = "auto"
    }
}
function resend() {
    NewOTP = RandomOTP();
    Verifyotp = NewOTP;
    body = 'รหัส OTP\n' + Verifyotp;

    sendEmail(resendemail, body, "ส่งรหัส OTP อีกครั้งเรียบร้อย")

    if (CheckResend == true) {
        TimerOTP(180);
        document.getElementById("name").value = "";
        document.getElementById("surname").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("email").value = "";
        document.getElementById("button-OTP").style.pointerEvents = "none"
        document.getElementById("resend").style.pointerEvents = "none"
        CheckResend = false;
    }

}