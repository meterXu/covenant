const router = require('@koa/router')();
const {query,exec} = require('../lib/provider')
const {pagingQuery,successRes,errorRes} = require('../lib/utils')
const sqlText = require('../lib/sql')

router.get('/list',async (ctx,next)=>{
    let {path,identifier,collectionId,page,rp} = ctx.request.query;
    let params = [`%${path||''}%`,`%${identifier||''}%`,collectionId]
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

router.post('/edit',async (ctx,next)=>{
    let body = ctx.request.body;
    let upc;
    if(body.id){
        upc = await exec(sqlText.editResponse,[
            body.collectionId,
            body.identifier,
            body.path,
            body.method,
            body.status,
            body.contentType,
            body.charset,
            body.headers,
            body.body,
            body.remark,
            body.id
        ])
    }else {
        upc = await exec(sqlText.addResponse,body)
    }
    if(upc.affectedRows>0){
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
        const upc = await exec(sqlText.deleteResponse,[id])
        if(upc.affectedRows>0){
            ctx.status = 200
            ctx.body = successRes('删除成功')
        }else {
            ctx.status = 500
            ctx.body=errorRes('删除失败，数据不存在')
        }
    }
})

router.delete('/deleteByCol',async (ctx,next)=>{
    let {collectionId} = ctx.request.query;
    if(collectionId){
        const upc = await exec(sqlText.deleteResponseByCol,[collectionId])
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
