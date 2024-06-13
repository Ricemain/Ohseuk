const e = require('express');
const { request } = require('express');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'ch66a11o22s$',
    database: 'silverlink'
});
// const connection = mysql.createConnection({
//     host: '34.22.104.200',
//     port: '3306',
//     user: '{ID}',
//     password: '{PASSWORD}',
//     database: 'silverlink'
// });
// const connection = mysql.createConnection({
//     host: '34.22.104.200',
//     port: '3306',
//     user: '{ID}',
//     password: '{PASSWORD}',
//     database: 'silverlink'
// });

connection.connect();

function getConnection() {
    return connection;
}


function getResultBySearch(region1, region2, puInstitution1, serviceKey, online, age, gender, callback) {
    if(region2 == '구/동') region2 = '';
    var region = region1 + ' ' + region2;
    region = region.trim();

    var sql = 'SELECT * FROM silverlinksearch1 WHERE 1=1';
    const params = [];
    if(region != 'all') {
        // sql += ' AND regionS LIKE CONCAT("%", ?, "%")';
        sql += ' AND regionS IN ("all", ?)'; 
        params.push(region);
    }
    if(puInstitution1 != 'all') {
        sql += ' AND puInstitutionS LIKE CONCAT("%", ?, "%")';
        // sql += ' AND puInstitutionS IN ("all", ?)';
        params.push(puInstitution1);
    }
    if(serviceKey != 'all') {
        sql += ' AND serviceKeyS LIKE CONCAT("%", ?, "%")';
        params.push(serviceKey);
    }
    if(online != 'all') {
        sql += ' AND onlineTFS LIKE CONCAT("%", ?, "%")';
        params.push(online);
    }
    if(age != 'all') {
        sql += ' AND ageS = ?';
        // sql += ' AND ageS IN ("0", ?)'; 
        params.push(age);
    }
    if(gender != 'all') {
        sql += ' AND genderS IN ("all", ?)';
        params.push(gender);
    }
    connection.query(sql, params, (err, result, fields) => {
        if(err) return callback(err);
        callback(null, result);
    });
}

function getUserLogin(id, pw, callback) {
    var sql = 'SELECT * FROM user WHERE userID = ? AND userPassword = ?';
    connection.query(sql, [id, pw], (err, result, fields) => {
        if(err) return callback(err);
        else if(result.length == 0) return callback(null, {result: 'fail'});
        else callback(null, result);
    }); 
}

function getSigup(userID, username, userPassword, region, gender, userAge, serviceKey, callback) {
    var sql = 'INSERT INTO user (userID, userPassword, userName, userRegion, userGender, userAge, userKeyword) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [userID, userPassword, username, region, gender, userAge, serviceKey], (err, result, fields) => {
        if(err) return callback(err);
        callback(null, result);
    });
}

function getRecommend(id, callback) {
    var sql = 'SELECT * FROM user WHERE userID = ?'
    var sql1 = 'SELECT * FROM silverlinksearch1 WHERE 1=1';
    connection.query(sql, [id], (err, result, fields) => {
        if(err) return callback(err);
        var userRegion = result[0].userRegion;
        var userGender = result[0].userGender;
        var userAge = result[0].userAge;
        
        const params = [];
        if(userRegion != 'all') {
            sql1 += ' AND regionS IN ("all", ?)';
            params.push(userRegion);
        }
        if(userGender != 'all') {
            sql1 += ' AND genderS IN ("all", ?)';
            params.push(userGender);
        }
        if(userAge != 'all') {  
            sql1 += ' AND ageS IN ("0", ?)';
            params.push(userAge);
        }

        connection.query(sql1, params, (err, result, fields) => {
            if(err) return callback(err);
            callback(null, result);
        });
    });
}

function getCreatCommunity(inputField, userID, callback) {
    var sql = 'INSERT INTO community (name, userID, communityUser) VALUES (?, ?, ?)';
    var sql1 = 'SELECT * FROM user WHERE userID = ?'; 
    var sql2 = 'UPDATE user SET communityID = ?  WHERE userID = ?';
    
    
    connection.query(sql, [inputField, userID, userID], (err, result, fields) => {
        if(err) return callback(err);
        var inputFielduser = result.insertId;
        connection.query(sql1, [userID], (err, result, fields) => {
            if(err) return callback(err);
            if(result[0].communityID == null){
                var communityID = inputFielduser;
            }
            if(result[0].communityID != null) {
                var communityID = result[0].communityID + ',' + inputFielduser; 
            }
            connection.query(sql2, [communityID, userID], (err, result, fields) => {
                if(err) return callback(err);
                callback(null, "success");
            });
        });
    });
}

function getCountBySearch(region1, region2, puInstitution1, serviceKey, online, age, gender, callback) {
    if(region2 == '구/동') region2 = '';
    var region = region1 + ' ' + region2;
    region = region.trim();

    var sql = 'SELECT COUNT(*) as count FROM silverlinksearch1 WHERE 1=1';
    const params = [];
    if(region != 'all') {
        sql += ' AND regionS IN ("all", ?)';
        params.push(region);
    }
    if(puInstitution1 != 'all') {
        sql += ' AND puInstitutionS LIKE CONCAT("%", ?, "%")';
        params.push(puInstitution1);
    }
    if(serviceKey != 'all') {
        sql += ' AND serviceKeyS LIKE CONCAT("%", ?, "%")';
        params.push(serviceKey);
    }
    if(online != 'all') {
        sql += ' AND onlineTFS LIKE CONCAT("%", ?, "%")';
        params.push(online);
    }
    if(age != 'all') {
        sql += ' AND ageS = ?';
        params.push(age);
    }
    if(gender != 'all') {
        sql += ' AND genderS IN ("all", ?)';
        params.push(gender);
    }
    connection.query(sql, params, (err, result, fields) => {
        if(err) return callback(err);
    });
}
function getDetailsByNumKey(numKey, callback) {
var sql = 'SELECT idC, serviceC, applicationC FROM silverlinkcontent1 WHERE numKey = ?';
connection.query(sql, [numKey], (err, result, fields) => {
    if(err) return callback(err);
    callback(null, result[0]);
});
}

function getPost(postText, userID, communityID, callback) {
    var sql = 'INSERT INTO communityText (postText, userID, communityID) VALUES (?, ?, ?)';
    var sql2 = 'SELECT * FROM community WHERE numID= ? AND FIND_IN_SET(?, communityUser)';
    connection.query(sql2, [communityID, userID], (err, result, fields) => {
        if(err) return callback(err);
        if(result.length == 0) {
            callback(null, 'fail');
        }
        else {
            connection.query(sql, [postText, userID, communityID], (err, result, fields) => {
                if(err) return callback(err);
                callback(null, result);
            });
        }
    });

    
}

function getPostPage(communityID, callback) {
    var sql = 'SELECT * FROM communityText WHERE communityID = ?';
    connection.query(sql, [communityID], (err, result, fields) => {
        if(err) return callback(err);
        callback(null, result);
    });
}

function getCommunityUser(userID, callback) {
    var sql = 'SELECT * FROM community WHERE FIND_IN_SET(?, communityUser)';
    connection.query(sql, [userID], (err, result, fields) => {
        if(err) return callback(err);
        callback(null, result);
    });

}

function getCommunityAll(callback) {
    var sql = 'SELECT * FROM community WHERE 1=1';
    connection.query(sql, (err, result, fields) => {
        if(err) return callback(err);
        callback(null, result);
    });
}

function getCommunityName (communityID, callback) {
    var sql = 'SELECT * FROM community WHERE numID = ?';
    connection.query(sql, [communityID], (err, result, fields) => {
        if(err) return callback(err);
        callback(null, result);
    });
}

function getCommunityNum(communityID, callback) {
    var sql = 'SELECT LENGTH(communityUser) - LENGTH(REPLACE(communityUser, ",", "")) + 1 as count FROM community WHERE numID = ?';
    connection.query(sql, [communityID], (err, result, fields) => {
        if(err) return callback(err);
        callback(null, result);
    });

    
}

function getJoinButton(userID, communityID, callback) {
    var sql = 'SELECT * FROM community WHERE numID = ?';
    var sql2 = 'SELECT * FROM community WHERE numID= ? AND FIND_IN_SET(?, communityUser)';
    var sql1 = 'UPDATE community SET communityUser = ? WHERE numID = ?';

    

    connection.query(sql, [communityID], (err, result, fields) => {
        if(err) return callback(err);
        var communityUser = result[0].communityUser;
        
        if(communityUser == null) {
            communityUser = userID;
        }
        else {
            communityUser = communityUser + ',' + userID;
        }
        
        connection.query(sql2, [communityID, userID], (err, result, fields) => {
            if(err) return callback(err);
            if(result.length == 0) {
            connection.query(sql1, [communityUser, communityID], (err, result, fields) => {
                if(err) return callback(err);
                callback(null, 'success');
            
            });
            }
            else {
                callback(null, 'fail');
            }
        });
    });

}
    


module.exports = { 
    getResultBySearch,
    getConnection,
    getUserLogin,
    getSigup,
    getRecommend,
    getCreatCommunity,
    getCountBySearch,
    getDetailsByNumKey,
    getPost,
    getPostPage,
    getCommunityUser,
    getCommunityAll,
    getCommunityName,
    getJoinButton,
    getCommunityNum
}
