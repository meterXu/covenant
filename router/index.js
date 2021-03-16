const router = require('@koa/router')();
const {query} = require('../lib/provider')
const {getParams} = require('../lib/utils')
const sqlText = require('../lib/sql')


router.get('/collectionList',async (ctx,next)=>{
    let params = []
    let {name,identifier} = ctx.request.query;
    let sql = sqlText.collectionList
    if(name){
        sql += `and name = ?`
        params.push(name)
    }
    if(identifier){
        sql += `and identifier = ?`
        params.push(identifier)
    }
    const queryData = await query(sql,params)
    ctx.status = 200
    ctx.body={
        success:true,
        message:'查询成功',
        code:ctx.status,
        record:queryData
    }
})

router.post('/editCollection',async (ctx,next)=>{
    let body = ctx.request.body;
    try{
        let upc = null
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
            ctx.body={
                success:true,
                message:'维护成功',
                code:ctx.status
            }
        }else {
            ctx.status = 500
            ctx.body={
                success:false,
                message:'维护失败',
                code:ctx.status
            }
        }
    }catch (ex){
        ctx.status = 500
        ctx.body={
            success:false,
            message:'维护失败',
            code:ctx.status
        }
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
