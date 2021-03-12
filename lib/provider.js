const mysql = require('mysql');
const config = require('../public/db.conf.json')

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

function provider() {
    return {
        mysqlProvider: new mysqlProvider(),
    };
}

module.exports = new provider();
