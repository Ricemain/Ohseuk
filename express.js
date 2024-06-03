const express = require('express');
const app = express();
var dbconfig = require('./dbconfig.js'); // dbconfig.js 파일을 불러옴
var conn = dbconfig.init(); // dbconfig.js의 init 함수를 사용하여 mysql과 연결



app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
// Path: express.js


dbconfig.connect(conn); // dbconfig.js의 connect 함수를 사용하여 연결
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/list', function (req, res) {
    var sql = 'SELECT * FROM user';
    conn.query(sql, function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else res.render('index.ejs', {list : rows});
    });
});

app.get('/insert', function (req, res) {
    res.send('test')
});




