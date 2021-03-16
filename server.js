const Koa = require('koa')
const cors = require('koa2-cors');
const koaBody = require('koa-body');
const next = require('next')
const router = require('./router/index')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = new Koa()
    server.use(cors());
    server.use(koaBody());
    server.use(async (ctx, next) => {
        try{
            ctx.status = 200
            await next()
        }catch (err){
            ctx.status = err.statusCode || err.status || 500
            ctx.body = {
                success:false,
                message:err.message,
                code:ctx.status
            }
            // ctx.app.emit('error', err);
        }
    })
    router.all('(.*)', async (ctx) => {
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })
    server.use(router.routes())
    server.on('error', (error)=>{
        console.error(error);
    });
    server.listen(port, () => {
        console.log(`> ready on http://localhost:${port}`)
    })
})
