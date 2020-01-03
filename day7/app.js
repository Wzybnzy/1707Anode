const Koa = require('koa');
const app = new Koa();
// const bodyParser = require('koa-bodyparser');
const router = require('./router/index.js');
const bodyParser = require('./utils/bodyparser');

app.use(bodyParser());
// app.use(async (ctx,next)=>{
//     ctx.request.body = await bodyparser(ctx);
//     await next();
// })

app.use(router.routes(), router.allowedMethods());



app.listen(3000);
