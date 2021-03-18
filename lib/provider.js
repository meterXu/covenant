const mysql = require('mysql');
const sqlite = require('sqlite3').verbose();
const config = require('../public/db.conf.json')
const initSql = require('../public/sql/initSql.json')
const path = require("path");
let _mysqlProvider;
let _sqliteProvider;

switch (config.type){
    case "sqlite":{
        sqliteProvider()
    }break
    case "mysql":{
        mysqlProvider()
    }break
}

function mysqlProvider() {
    const connection = mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
    });
    connection.connect(async function (err) {
        if (err) {
            console.err("数据库连接失败:" + err);
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
function sqliteProvider(){
    _sqliteProvider = new sqlite.Database(path.join(__dirname,'../public/db/covenant.db'),[sqlite.OPEN_READWRITE],async (err)=>{
        if(err){
            console.err("数据库连接失败:" + err);
        }else {
            console.log("数据库连接成功");
            await initSqlite()
        }
    });
}

function initMySql() {
    return new Promise(async (resolve, reject) => {
        try{
            const res = await query(`SHOW DATABASES LIKE '${config.database}'`)
            if(res.length===0){
                console.log("数据库初始化开始");
                for (let index in initSql.mysql) {
                    await exec(initSql.mysql[index])
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

async function initSqlite(){
    return new Promise(async(resolve, reject) => {
        try{
            const res = await query(`select * from sqlite_master`)
            if(res.length==0){
                console.log("数据库初始化开始");
                for (let index in initSql.sqlite){
                    await exec(initSql.sqlite[index])
                }
                console.log("数据库初始化成功");
                resolve()
            }else{
                resolve()
            }
        }catch (err){
            console.error("数据库初始化失败");
            console.error(err)
        }
    })
}

function query(sql, params) {
    return new Promise((resolve, reject) => {
        switch (config.type){
            case "sqlite":{
                _sqliteProvider.all(sql, params, function (err, rows) {
                    if (err) {
                        console.error(err);
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                })
            }break
            case "mysql":{
                _mysqlProvider.query(sql, params, (err, results, fields) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    resolve(results);
                });
            }break
        }
    });
}

function exec(sql,params){
    return new Promise((resolve, reject) => {
        switch (config.type){
            case "sqlite":{
                _sqliteProvider.run(sql,params,function (err){
                    if(err){
                        reject(err)
                    }else{
                        resolve(this.changes)
                    }
                })
            }break
            case "mysql":{
                _mysqlProvider.query(sql, params, (err, results, fields) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    resolve(results.affectedRows);
                });
            }break
        }
    })

}


module.exports = {query,exec}
