const router = require('@koa/router')();
const {query} = require('../lib/provider')
const {getParams,pagingQuery,successRes,errorRes} = require('../lib/utils')
const sqlText = require('../lib/sql')

router.get('/collectionList',async (ctx,next)=>{
    let {name,identifier,page,rp} = ctx.request.query;
    let params = [`%${name}%`,`%${identifier}%`]
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
router.post('/editCollection',async (ctx,next)=>{
    let body = ctx.request.body;
    let upc;
    if(body.id){
        upc = await query(sqlText.editCollection,[
            body.name,
            body.identifier,
            body.remark,
            body.id
        ])
    }else {
        upc = await query(sqlText.addCollection,body)
    }
    if(upc.affectedRows>0){
        ctx.status = 200
        ctx.body=successRes('维护成功')
    }else {
        ctx.status = 500
        ctx.body=errorRes('维护失败')
    }
})
router.delete('/deleteCollection',async (ctx,next)=>{
    let {id} = ctx.request.query;
    if(id){
       const upc = await query(sqlText.deleteCollection,[id])
        if(upc.affectedRows>0){
            ctx.status = 200
            ctx.body = successRes('删除成功')
        }else {
            ctx.status = 500
            ctx.body=errorRes('删除失败，数据不存在')
        }
    }
})
router.get('/dicList',async (ctx,next)=>{
    const {code,text} = ctx.request.query
    const params = [code,`%${text}%`]
    let sql = sqlText.dicList
    if(code){
        const queryData = await query(sql,params)
        ctx.status = 200
        ctx.body = successRes('查询成功',{
            record:queryData,
        })
    }else {
        ctx.status = 500
        ctx.body=errorRes('请传入code')
    }

})


router.all('(/mocky.*)',  async(ctx, next) => {
    try{
        const [name,path] = getParams(ctx.req)
        const queryData = await query(sqlText.mockySql,[name,path])
        if(queryData.length>0){
            const rowData =queryData[0]
            ctx.status = 200
            if(rowData.headers){
                ctx.set(JSON.parse(rowData.headers));
            }
            ctx.type = `${rowData.contentType}; charset=${rowData.charset}`
            ctx.body = queryData[0].body
        }else{
            ctx.status = 404
            ctx.body = '未找到相应的接口！'
        }
    }catch (ex) {
        console.error(ex)
        ctx.status = 500
        ctx.body = ex.message
    }
});
module.exports = router;
