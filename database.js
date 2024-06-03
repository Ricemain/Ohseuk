const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'ch66a11o22s$',
    database: 'silverlink'
});

// module.exports = {
//     init: function () {
//         return mysql.createConnection(dbInfo);
//     },
//     connect: function (conn) {
//         conn.connect(function (err) {
//             if (err) console.error('mysql connection error : ' + err);
//             else console.log('mysql is connected successfully!');
//         });
//     }
// };

connection.connect();

function getResultByRegion(region1, region2, callback) {
    var region = region1 + ' ' + region2;
    var sql = 'SELECT * FROM silverlinksearch1 WHERE regionS = ?';
    conn.query(sql, [region], (err, rows) => {
        if(err) return callback(err);
        callback(null, rows);        
    
    });
}

module.exports = { 
    getResultByRegion
}