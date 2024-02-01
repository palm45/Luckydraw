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
    res.render('index');
});

app.get('/listuser', (req, res) => {
    res.render('listuser');
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

app.delete('/deleteprize', (req, res) => {
    const { prize_id } = req.body
    const sql = 'DELETE FROM luckydraw.prizes WHERE Prize_id="'+prize_id+'"';
    db.query(sql);
})

app.post('/updateprize', (req, res) => {
    const { prize_id, nameprize, countprize } = req.body;
    const sql = 'UPDATE luckydraw.prizes SET Nameprize='+nameprize
                +', Countprize='+ countprize +' WHERE Prize_id='+prize_id;
    db.query(sql);
})