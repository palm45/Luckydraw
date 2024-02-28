var url = 'https://jaguar-literate-smoothly.ngrok-free.app'

async function getStatus(){
    const res = await fetch( url + '/getStatusForm', {
        method: 'GET',
    })
    dataStatus = await res.json();
    FormNow(dataStatus.StatusForm);
    if(dataStatus.Time>0){
        time = dataStatus.Time;
        Timer(dataStatus.Time)
    }
    if(time==0 && dataStatus.StatusForm  == 1){
        document.getElementById('timer').innerHTML = "เปิดถาวร"
    }
}
getStatus()

function updateStatusForm(StatusForm){
    fetch( url + '/UpdateStatusForm', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({Status: StatusForm})
    })
}
function updateStatusTime(StatusTime){
    fetch( url + '/UpdateTime', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({time: StatusTime})
    })
}


function FormNow(statusform){
    if(statusform == 0){
        document.querySelector('#changemodeform').checked = false;
        document.getElementById("ModeForm").innerHTML = "ปิดฟอร์ม"
    }else if(statusform == 1){
        document.querySelector('#changemodeform').checked = true;
        document.getElementById("ModeForm").innerHTML = "เปิดฟอร์ม"
    }
}
function ChangeOpenForm(){
    mode = document.querySelector('#changemodeform').checked
    if(mode == false){
        document.getElementById("ModeForm").innerHTML = "ปิดฟอร์ม"
        updateStatusForm(0);
        cancel = true;
        time = 0;
        updateStatusTime(0);
        document.getElementById('timesetup').disabled = false;
        if(time==0){
            document.getElementById('timer').innerHTML = "0:00:00"
        }
    }else if(mode == true){
        document.getElementById("ModeForm").innerHTML = "เปิดฟอร์ม"
        updateStatusForm(1);
        if(time==0){
            document.getElementById('timer').innerHTML = "เปิดถาวร"
        }
    }
}

function set_time() {
    var val3 = document.getElementById("time-qrcode3").value;
    var val2 = document.getElementById("time-qrcode2").value;
    var val1 = document.getElementById("time-qrcode1").value;

    check3 = false;
    check2 = false;

    if (val1 >= 24) {
        document.getElementById("time-qrcode2").value = '00';
        document.getElementById("time-qrcode3").value = '00';
    } else {
        if (val3 == 0) {
            document.getElementById("time-qrcode3").value = '00';
        } else if (val3 < 10) {
            document.getElementById("time-qrcode3").value = '0' + val3;
        } else if (val3 >= 60) {
            document.getElementById("time-qrcode3").value = '00';
            num = parseInt(val2) + 1
            if (num < 10) {
                document.getElementById("time-qrcode2").value = '0' + parseInt(num);
            } else if (num >= 60) {
                document.getElementById("time-qrcode2").value = '00';
                num = parseInt(val1) + 1
                if (num < 10) {
                    document.getElementById("time-qrcode1").value = '0' + num;
                } else if (num >= 24) {
                    document.getElementById("time-qrcode1").value = 24;
                } else {
                    document.getElementById("time-qrcode1").value = num;
                }
                check2 = true;
            } else {
                document.getElementById("time-qrcode2").value = num;
            }
            check3 = true;
        }

        if (val2 == 0 && check3 == false) {
            document.getElementById("time-qrcode2").value = '00';
        } else if (val2 < 10 && check3 == false) {
            document.getElementById("time-qrcode2").value = '0' + parseInt(val2);
        } else if (val2 >= 60 && check3 == false) {
            document.getElementById("time-qrcode2").value = '00';
            num = parseInt(val1) + 1
            if (num < 10) {
                document.getElementById("time-qrcode1").value = '0' + num;
            } else if (num >= 24) {
                document.getElementById("time-qrcode1").value = 24;
            } else {
                document.getElementById("time-qrcode1").value = num;
            }
            check2 = true;
        }

    }

    if (val1 == 0 && check2 == false) {
        document.getElementById("time-qrcode1").value = '00';
    } else if (val1 < 10 && check2 == false) {
        document.getElementById("time-qrcode1").value = '0' + parseInt(val1);
    } else if (val1 >= 24 && check2 == false) {
        document.getElementById("time-qrcode1").value = '24';
    }
}

time = 0;
cancel = false;
function SetupTime() {
    cancel = false;
    var val1 = document.getElementById("time-qrcode1").value;
    var val2 = document.getElementById("time-qrcode2").value;
    var val3 = document.getElementById("time-qrcode3").value;

    hour = parseInt(val1)* 3600;
    minute = parseInt(val2) * 60;
    second = parseInt(val3) ;

    time = hour + minute + second;
    document.getElementById("time-qrcode1").value = '0' + 0 ;
    document.getElementById("time-qrcode2").value = '0' + 0 ;
    document.getElementById("time-qrcode3").value = '0' + 0 ;
    
    FormNow(true);
    updateStatusForm(1);
    Timer(time);
}
function Timer(remaining) {
    time = remaining;
    if(remaining==0){
        FormNow(false);
        updateStatusForm(0);
        document.getElementById('timesetup').disabled = false;
    }else if(remaining>0){
        document.getElementById('timesetup').disabled = true;
    }

    updateStatusTime(remaining);

    var h = 0;
    var m = 0;
    var s = 0;
    if (remaining >= 3600) {
        h = Math.floor(remaining / 3600);
        m = Math.floor(Math.floor(remaining % 3600) / 60);
        s = Math.floor(Math.floor(remaining % 3600) % 60);
    } else if (remaining < 3600) {
        m = Math.floor(remaining / 60);
        s = Math.floor(remaining % 60);
    }

    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    document.getElementById('timer').innerHTML = h + ':' + m + ':' + s;
    remaining -= 1;
    

    if (remaining >= 0) {
        setTimeout(function () {
            if(cancel == false){
                Timer(remaining);
            }
        }, 1000);
        return;
    }
}
function cancelTimer() {
    if(time>0){
        time = 0;
        FormNow(false);
        updateStatusForm(0);
        document.getElementById('timesetup').disabled = false;
        cancel = true;
        document.getElementById('timer').innerHTML = '0:00:00' ;
    }
    updateStatusTime(0);
    document.getElementById("time-qrcode1").value = '0' + 0 ;
    document.getElementById("time-qrcode2").value = '0' + 0 ;
    document.getElementById("time-qrcode3").value = '0' + 0 ;
}