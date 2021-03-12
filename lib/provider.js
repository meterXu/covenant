const mysql = require('mysql');
const config = require('../public/db.conf.json')
let _provider = null;
function mysqlProvider() {
    const connection = mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database,
    });
    connection.connect(function (err) {
        if (err) {
            console.log("数据库连接失败:" + err.code);
        } else {
            console.log("数据库连接成功");
        }
    });
    return connection
}

    if(_provider===null){
        _provider = new mysqlProvider();
    }

    async function query(sql, params) {
        return new Promise((resolve, reject) => {
            _provider.query(sql, params, (err, results, fields) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(results);
            });
        });
    }

module.exports = {query}
