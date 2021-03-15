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
    router.all('(.*)', async (ctx) => {
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })
    server.use(async (ctx, next) => {
        ctx.res.statusCode = 200
        await next()
    })
    server.use(router.routes())
    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`)
    })
})
