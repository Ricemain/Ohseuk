const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.json());

// MySQL configurations
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sin87531',
    database: 'mydatabase'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

app.get('/', (req, res) => {
    res.render('Segmentation_search');
});

app.post('/search', (req, res) => {
    const data = req.body;
    const { region, district, organization, keyword, online, age, gender, other } = data;

    let query = "SELECT idS FROM silverlinksearch WHERE 1=1";
    let params = [];

    if (region) {
        query += " AND regionS = ?";
        params.push(region);
    }
    if (district) {
        query += " AND districtS = ?";
        params.push(district);
    }
    if (organization) {
        query += " AND puInstitutionS LIKE ?";
        params.push('%' + organization + '%');
    }
    if (keyword) {
        query += " AND serviceKeyS LIKE ?";
        params.push('%' + keyword + '%');
    }
    if (online) {
        query += " AND onlineTFS = ?";
        params.push(online);
    }
    if (age) {
        query += " AND ageS = ?";
        params.push(age);
    }
    if (gender) {
        query += " AND genderS = ?";
        params.push(gender);
    }
    if (other) {
        query += " AND otherS = ?";
        params.push(other);
    }

    db.query(query, params, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});