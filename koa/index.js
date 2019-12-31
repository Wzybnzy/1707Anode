
const Koa = require('koa');
console.log('*******');
const app = new Koa();

app.use(async ctx=>{
    ctx.body = 'hello'
});

app.listen(3000);
