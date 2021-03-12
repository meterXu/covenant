const mysql = require('mysql');

function mysqlProvider() {
    this.query = async function (config, sql, params) {
        return new Promise((resolve, reject) => {
            const connection = mysql.createConnection({
                host: config.host,
                port: config.port,
                user: config.user,
                password: config.password,
                database: config.database,
            });
            connection.connect((err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                connection.query(sql, params, (err, results, fields) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    resolve(results);
                    connection.end((err) => {
                        if (err) {
                            console.error(err);
                            reject(err);
                        }
                    });
                });
            });
        });
    };
}

function provider() {
    return {
        mysqlProvider: new mysqlProvider(),
    };
}

module.exports = new provider();
