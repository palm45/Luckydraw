const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const port = 3000;
const app = express();
app.listen(port, ()=>{
    console.log('listening on port ' + port);
})
app.use(cors())

var db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "palm2545",
    database: "luckydraw"
});

