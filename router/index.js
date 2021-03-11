const router = require('@koa/router')();
const {getParams} = require('../utils/index')

router.get('(/mocky.*)', async (ctx, next) => {
    const [name,path] = getParams(ctx.req)

    switch (name){
        case 'police':{
            switch (path){
                case 'message/exchange/list':{
                    ctx.body = {
                        jj:'hello'
                    }
                    return
                }
            }
        }
    }

    ctx.body = 'hello mocky!'
});




module.exports = router;
