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

    document.getElementById('timesetup').disabled = true;
    
    Timer(time);
}
function Timer(remaining) {
    if(remaining==0){
        document.getElementById('timesetup').disabled = false;
    }

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
    cancel = true;
    document.getElementById('timer').innerHTML = '0:00:00' ;
    document.getElementById('timesetup').disabled = false;
}