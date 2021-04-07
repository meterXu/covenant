const mysql = require('mysql');
const sqlite = require('sqlite3').verbose();
const config = require('../public/db.conf.json')
const initSql = require('../public/sql/initSql.json')
const path = require("path");
let _mysqlProvider;
let _sqliteProvider;
const dbType={
    sqlite:'sqlite',
    mysql:'mysql'
}

initProvider()

function initProvider(){
    switch (config.type){
        case dbType.sqlite:{
            sqliteProvider()
        }break
        case dbType.mysql:{
            mysqlProvider()
        }break
    }
}

function mysqlProvider() {
    _mysqlProvider = mysql.createPool({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
    });
    _mysqlProvider.getConnection(async function (err,conn) {
        if (err) {
            console.err("数据库连接失败:" + err);
        } else {
            console.log("数据库连接成功");
            await initMySql()
            _mysqlProvider = mysql.createPool({
                host: config.host,
                port: config.port,
                user: config.user,
                password: config.password,
                database:config.database
            });
            console.log("数据库切换成功");
            conn.release()
        }
    });
}
function sqliteProvider(){
    _sqliteProvider = new sqlite.Database(path.join(__dirname,'../public/db/covenant.db'),async (err)=>{
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
            case dbType.sqlite:{
                _sqliteProvider.all(sql, params, function (err, rows) {
                    if (err) {
                        console.error(err);
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                })
            }break
            case dbType.mysql:{
                _mysqlProvider.getConnection((err,conn)=>{
                    if(err){
                        console.error(err);
                        reject(err);
                    }
                    conn.query(sql, params, (err, results, fields) => {
                        if (err) {
                            console.error(err);
                            reject(err);
                        }
                        resolve(results);
                        conn.release()
                    });
                })
            }break
        }
    });
}

function exec(sql,params){
    return new Promise((resolve, reject) => {
        switch (config.type){
            case dbType.sqlite:{
                _sqliteProvider.run(sql,params,function (err){
                    if(err){
                        reject(err)
                    }else{
                        resolve(this.changes)
                    }
                })
            }break
            case dbType.mysql:{
                _mysqlProvider.getConnection((err,conn)=>{
                    if(err){
                        console.error(err);
                        reject(err);
                    }
                    conn.beginTransaction((err)=>{
                        if (err) {
                            console.error(err);
                            reject(err);
                            conn.rollback()
                        }
                        conn.query(sql, params, (err, results, fields) => {
                            if (err) {
                                console.error(err);
                                reject(err);
                            }
                            conn.commit(err=>{
                                if(err){
                                    console.error(err);
                                    reject(err);
                                }else{
                                    resolve(results.affectedRows);
                                    conn.release()
                                }
                            })
                        });
                    })
                })
            }break
        }
    })

}


module.exports = {query,exec}
