const router = require('@koa/router')();
const {query} = require('../lib/provider')
const {successRes,errorRes} = require('../lib/utils')
const sqlText = require('../lib/sql')
router.get('/list',async (ctx,next)=>{
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
module.exports=router
