const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
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


