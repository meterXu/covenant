const router = require('@koa/router')();
const {query,exec} = require('../lib/provider')
const {pagingQuery,successRes,errorRes} = require('../lib/utils')
const sqlText = require('../lib/sql')
router.get('/list',async (ctx,next)=>{
    let {name,identifier,page,rp} = ctx.request.query;
    let params = [`%${name||''}%`,`%${identifier||''}%`]
    let sql = sqlText.collectionList
    const {record,total} = await pagingQuery(sql,params,page,rp)
    ctx.status = 200
    ctx.body=successRes('查询成功',{
        record:record,
        total: total,
        page: parseInt(page),
        rp:parseInt(rp)
    })
})
router.post('/edit',async (ctx,next)=>{
    let body = ctx.request.body;
    let upc;
    if(body.id){
        upc = await exec(sqlText.editCollection,[
            body.name,
            body.identifier,
            body.remark,
            body.id
        ])
    }else {
        upc = await exec(sqlText.addCollection,body)
    }
    if(upc>0){
        ctx.status = 200
        ctx.body=successRes('维护成功')
    }else {
        ctx.status = 500
        ctx.body=errorRes('维护失败')
    }
})

router.delete('/delete',async (ctx,next)=>{
    let {id} = ctx.request.query;
    if(id){
        const upc = await exec(sqlText.deleteCollection,[id])
        if(upc.affectedRows>0){
            ctx.status = 200
            ctx.body = successRes('删除成功')
        }else {
            ctx.status = 500
            ctx.body=errorRes('删除失败，数据不存在')
        }
    }
})

module.exports=router
