const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'ch66a11o22s$',
    database: 'silverlink'
});

connection.connect();

function getResultByRegion(region1, region2, callback) {
    var region = region1 + ' ' + region2;
    var sql = 'SELECT * FROM silverlinksearch1 WHERE regionS = ?';
    connection.query(sql, [region], (err, result, fields) => {
        if(err) return callback(err);
        callback(null, result);        
    
    });
}

function getConnection() {
    return connection;
}

module.exports = { 
    getResultByRegion,
    getConnection
}