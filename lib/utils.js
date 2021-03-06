const {query} = require('../lib/provider')
function getParams(req){
    const nameRegexp = new RegExp('(?<=mocky/)(\\w|-)*(?=/)',"gi")
    const pathRegexp = new RegExp('(?<=mocky/(\\w|-)*/).*','gi')

    let name = req.url.match(nameRegexp)
    let path = req.url.match(pathRegexp)

    name  = name?name[0]:null
        path= path?path[0]:null

    return [name,path]
}

async function pagingQuery(sql,params,page,rp){
    const t_sql =  `select count(*) total from (${sql}) a`
    const p_sql =  `select * from (${sql}) a LIMIT ${rp} OFFSET ${(page-1)*rp}`
    const t_res = await query(t_sql,params)
    const p_res = await query(p_sql,params)
    return {
        total:t_res[0].total,
        record:p_res
    }
}

function successRes(msg,result){
    return result?{
        success:true,
        code:200,
        message:msg,
        result:result
    }:{
        success:true,
        code:200,
        message:msg,
    }
}

function errorRes(msg){
    return {
        success:false,
        code:500,
        message:msg
    }
}

module.exports = {
    getParams,
    pagingQuery,
    errorRes,
    successRes
}
