const router = require('@koa/router')();
const {pagingQuery,successRes} = require('../lib/utils')
const sqlText = require('../lib/sql')

router.get('/response/list',async (ctx,next)=>{
    let {path,identifier,collectionId,page,rp} = ctx.request.query;
    let params = [`%${path}%`,`%${identifier}%`,`%${collectionId}%`]
    let sql = sqlText.responseList
    const {record,total} = await pagingQuery(sql,params,page,rp)
    ctx.status = 200
    ctx.body=successRes('查询成功',{
        record:record,
        total: total,
        page: parseInt(page),
        rp:parseInt(rp)
    })
})
module.exports=router
