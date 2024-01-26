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
    res.render('listprize');
});

app.get('/qr', (req, res) => {
    res.render('otp');
});

app.post('/otpsummit', (req, res) => {
    const { name, surname, phone, email, codeuser} = req.body;
    const sql = 'INSERT INTO users (Name, Surname, Phone, Email_user, CodeUser, Getprize, UserGet) VALUES(?, ?, ?, ?, ?, ?, ?)';
    const values = [name, surname, phone, email, codeuser, "", 0];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('เกิดข้อผิดพลาดในการเพิ่มข้อมูล: ' + err.message);
            return res.send('<script>alert("มีบางอย่างผิดพลาด"); window.location="/qr";</script>');
        }
        return res.send('<script>alert("GBG"); window.location="/qr";</script>');
    });
});