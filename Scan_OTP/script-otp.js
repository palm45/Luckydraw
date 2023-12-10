
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

function RandomCodePrize() {
    var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let CodePrize = '';

    var len = string.length;
    for (let i = 0; i < 6; i++) {
        CodePrize += string[Math.floor(Math.random() * len)];
    }

    document.write(CodePrize);
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
    var btn = document.getElementById('btn');
    btn.addEventListener('click', function (e) {
        e.preventDefault()
        var email = document.getElementById("email").value;
        var body = RandomOTP();
        
        Email.send({
            Host: "smtp.elasticemail.com",
            Username: "LuckyDraw@gmail.com",
            Password: "DE2003C8544A1237B9FFA058448213C247F0",
            To: email,
            From: "akkhraviphanon_p@silpakorn.edu",
            Subject: "OTP LuckyDraw",
            Body: body
        }).then(
            message => alert(message)
          );
    })
}