var mysql = require('mysql');

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "palm2545",
    database: "luckydraw"
});

var data = [];
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("SELECT * FROM users", function (err, result, fields) {
        if (err) throw err;
        data = JSON.parse(JSON.stringify(result));
        console.log(data);
    });
});

function getdb(select) {
    return new Promise(function (resolve, reject) {
        con.query("SELECT * FROM users", function (err, result, fields) {
            if (err) throw err;
            data = JSON.parse(JSON.stringify(result));
            if (select == 1) {
                resolve(data[0].Email_user);
            } else if (select == 2) {
                resolve(data[0].CodeUser);
            }

        });
    });
}

(async function () {
    let email = await getdb(1);
    let codeuser = await getdb(2);
    console.log(email);
    console.log(codeuser);
})();

/*getdb(2).then(function(email) {
    console.log(email);
});*/

module.exports = con;