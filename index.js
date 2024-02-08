const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'palm2545',
    database: 'luckydraw',
});

db.connect((err) => {
    if (err) {
        console.error('can not connect MySQL: ' + err.stack);
        return;
    }
});

app.get('/', (req, res) => {
    const sql = 'SELECT * FROM nowrandom';
    db.query(sql, (err, result) => {
        res.render('index', {result});
    })
});

app.get('/listuser', (req, res) => {
    const sql = 'SELECT * FROM users';
    const sql2 = 'SELECT * FROM prizes';
    const sql3 = 'SELECT * FROM nownothere';
    db.query(sql, (err, result) => {
        db.query(sql2, (err, result2) => {
            db.query(sql3, (err, result3) => {
                res.render('listuser', {result, result2, result3});
            })
        })
    })
});

app.get('/listprize', (req, res) => {
    const sql = 'SELECT * FROM prizes';
    db.query(sql, (err, result) => {
        res.render('listprize', {result});
    })
});

app.get('/qr', (req, res) => {
    res.render('otp');
});

app.get('/timeout', (req, res) => {
    res.render('timeoutotp');
});

app.post('/otpsummit', (req, res) => {
    const { name, surname, phone, email, codeuser} = req.body;
    const sql = 'INSERT INTO users (Name, Surname, Phone, Email_user, CodeUser, Getprize, UserGet) VALUES(?, ?, ?, ?, ?, ?, ?)';
    const values = [name, surname, phone, email, codeuser, "", 0];
    db.query(sql, values);
});

app.post('/addprize',(req, res) => {
    const { nameprize, countprize} = req.body;
    const sql = 'INSERT INTO prizes (Nameprize, Countprize, Draw) VALUES(?,?,?)';
    const values = [nameprize, countprize, 0];
    db.query(sql, values);
})

app.post('/addnowrandom', (req, res) => {
    const { nowprizelist, nowcodelist } = req.body;
    const sql = 'INSERT INTO nowrandom (NowPrizeList, NowCodeList) VALUES(?,?)';
    const values = [nowprizelist, nowcodelist];
    db.query(sql, values);
})

app.post('/addnownothere', (req, res) => {
    const { codenownothere } = req.body;
    const sql = 'INSERT INTO nownothere (CodeNotHere) VALUES(?)';
    const values = [codenownothere];
    db.query(sql, values);
})

app.get('/getuser', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        res.send(result);
    })
})

app.get('/getprize',(req, res)=>{
    const sql = 'SELECT * FROM prizes';
    db.query(sql, (err, result) => {
        res.send(result);
    })
})

app.get('/getnowrandom',(req, res)=>{
    const sql = 'SELECT * FROM nowrandom';
    db.query(sql, (err, result) => {
        res.send(result);
    })
})

app.get('/getnownothere', (req, res)=>{
    const sql = 'SELECT * FROM nownothere';
    db.query(sql, (err, result) => {
        res.send(result);
    })

})

app.delete('/deleteprize', (req, res) => {
    const { prize_id } = req.body
    const sql = 'DELETE FROM luckydraw.prizes WHERE Prize_id="'+prize_id+'"';
    db.query(sql);
})

app.delete('/deletenothere', (req, res) => {
    const { codenothere_id } = req.body;
    const sql = 'DELETE FROM luckydraw.nownothere WHERE NowNotHere_id="'+codenothere_id+'"';
    db.query(sql);
})

app.put('/updateprize', (req, res) => {
    const { prize_id, nameprize, countprize ,drawprize} = req.body;
    const sql = 'UPDATE luckydraw.prizes SET Nameprize="'+nameprize
                +'", Countprize='+ countprize + ', Draw='+ drawprize
                +' WHERE Prize_id='+prize_id;
    db.query(sql);
})

app.put('/updateuser', (req, res) => {
    const { user_id, name, surname, phone, email_user, codeuser, getprize, userget} = req.body;
    const sql = 'UPDATE luckydraw.users SET Name="'+name
                +'", Surname="'+ surname + '", Phone="'+ phone
                +'", Email_user="' + email_user + '", CodeUser="' + codeuser
                +'", Getprize="' + getprize + '", UserGet='+ userget 
                +' WHERE User_id=' + user_id;
    db.query(sql);
})