const mysql = require('mysql');
const config = require('../public/db.conf.json')
const initSql = require('../public/sql/initSql.json')
let _mysqlProvider;
mysqlProvider();

function mysqlProvider() {
    const connection = mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
    });
    connection.connect(async function (err) {
        if (err) {
            console.err("数据库连接失败:" + err.code);
        } else {
            console.log("数据库连接成功");
            _mysqlProvider = connection
            await initMySql()
            connection.changeUser({database:config.database},function (err){
                if(err){
                    console.log("数据库切换失败");
                }else{
                    console.log("数据库切换成功");
                }
            })

        }
    });
}

async function query(sql, params) {
    return new Promise((resolve, reject) => {
        _mysqlProvider.query(sql, params, (err, results, fields) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            resolve(results);
        });
    });
}

function initMySql() {
    return new Promise(async (resolve, reject) => {
        try{
            const res = await query(`SHOW DATABASES LIKE '${config.database}'`)
            if(res.length===0){
                console.log("数据库初始化开始");
                for (let index in initSql.mysql) {
                    await query(initSql.mysql[index])
                }
                console.log("数据库初始化成功");
                resolve()
            }else{
                resolve()
            }
        }catch (err){
            console.error("数据库初始化失败");
            reject(err)
        }
    })
}

module.exports = {query}
