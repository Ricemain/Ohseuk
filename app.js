const express = require('express');
const app = express();
var db = require('./database.js');

app.use(express.static('public'));

app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});

app.get('/refinesearch/se',(req,res)=>{
    res.sendFile(__dirname + '/refinesearch/se.html');
});

app.get('refinesearch/script.js', (req, res) => {
    res.sendFile(__dirname + 'refinesearch/script.js')
})

app.get('/refinesearch/se/search',(req,res)=>{
    const region1 = req.query.region1;
    const region2 = req.query.region2;
    const puInstitution1 = req.query.puInstitution1;
    const serviceKey = req.query.serviceKey;
    const online = req.query.online;
    const age = req.query.age;
    const gender = req.query.gender;

    db.getResultBySearch(region1, region2, puInstitution1, serviceKey, online, age, gender, (err, result) => {
        if(err) return res.status(500).send('DB Error');
        res.json(result);
    });
});





app.get('/list', function (req, res) {
    var sql = 'SELECT * FROM user';
    db.getConnection().query(sql, function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else res.send(rows);
    });
});







