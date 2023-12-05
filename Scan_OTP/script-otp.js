
function input(){
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

function RandomCodePrize(){
    var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
    let OTP = ''; 
      
    var len = string.length; 
    for (let i = 0; i < 6; i++ ) { 
        OTP += string[Math.floor(Math.random() * len)]; 
    } 
    document.write(OTP); 
}