const router = require('@koa/router')();
const provider = require('../lib/provider')
const {getParams} = require('../lib/utils')
const sqlText = require('../lib/sql')

router.all('(/mocky.*)', async (ctx, next) => {
    try{
        const [name,path] = getParams(ctx.req)
        const query = provider.mysqlProvider.query(sqlText.mockySql,[name,path])
        if(query.length>0){
            ctx.status = 200
            ctx.body = JSON.parse(query[0]['body'])
        }
        ctx.status = 404
        ctx.body = '未找到相应的接口！'
    }catch (ex) {
        console.error(ex)
        ctx.status = 500
        ctx.body = ex.message
    }
});




module.exports = router;
