const express = require('express');
const app = express();
var db = require('./database.js'); // database.js 파일을 불러옴

app.use(express.static('public'));

app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
// Path: express.js

app.get('/song', function (req, res) {
    res.send('Hello World!');
});


app.get('/refinesearch/se',(req,res)=>{
    res.sendFile(__dirname + '/refinesearch/se.html');
});

app.get('/refinesearch/se/search',(req,res)=>{
    const region1 = req.query.region1;
    const region2 = req.query.region2;
    db.getResultByRegion(region1, region2, (err, rows) => {
        if(err) return res.status(500).send('DB Error');
        res.json(rows);
    });
});


app.get('/list', function (req, res) {
    var sql = 'SELECT * FROM user';
    conn.query(sql, function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else res.send(rows);
    });
});



// app.get('/insert', function (req, res) {
//     res.send('test')
// });




