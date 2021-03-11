const router = require('@koa/router')();

router.get('/xxx', async (ctx, next) => {
    ctx.body = 'hello xxx!'
});

module.exports = router;
