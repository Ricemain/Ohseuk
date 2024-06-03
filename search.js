const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'silverlink',
    password: 'ch66a11o22s$',
    waitForConnections: true, // 기본값은 true입니다. // 이것이 true이면 pool.getConnection()이 호출되면 대기열에 연결이 없으면 즉시 새 연결을 만듭니다. false이면 pool.getConnection()이 호출되면 즉시 에러를 반환합니다.
    connectionLimit: 10, // 기본값은 10입니다. // 동시에 풀에서 가져올 수있는 최대 연결 수입니다.
    queueLimit: 0 // 기본값은 0입니다. // 연결 대기열의 최대 길이입니다. 0이면 제한이 없습니다.
});


const getRegion = async () => {
    const promisePool = pool.promise(); // 이것은 promise를 반환합니다.// 이것은 pool.getConnection()을 호출하고 이것을 호출하는 것과 동일한 방식으로 사용할 수 있습니다.
    const [rows] = await promisePool.query('SELECT * FROM silverlinksearch WHERE idS = 1');
    return rows;
}

module.exports = {
    getRegion
};