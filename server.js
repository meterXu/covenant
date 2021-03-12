const Koa = require('koa')
const charset = require('koa-charset');
const cors = require('koa2-cors');
const next = require('next')
const router = require('./router/index')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = new Koa()

    router.all('(.*)', async (ctx) => {
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })

    server.use(async (ctx, next) => {
        ctx.res.statusCode = 200
        await next()
    })
    // server.use(cors());
    // server.use(charset)
    server.use(router.routes())
    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`)
    })
})
