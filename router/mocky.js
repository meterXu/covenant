const router = require('@koa/router')();
const {query} = require('../lib/provider')
const {getParams} = require('../lib/utils')
const sqlText = require('../lib/sql')
router.all('/',  async(ctx, next) => {
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
module.exports=router
