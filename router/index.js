const router = require('@koa/router')();
const {getParams} = require('../utils/index')

router.get('(/mocky.*)', async (ctx, next) => {
    const [name,path] = getParams(ctx.req)

    switch (name){
        case 'police':{
            switch (path){
                case 'message/exchange/list':{
                    return ctx.json({
                        jj:'hello'
                    })
                }
            }
        }
    }

    ctx.body = 'hello mocky!'
});




module.exports = router;
