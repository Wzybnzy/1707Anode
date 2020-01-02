const Koa = require('koa');
const app = new Koa();
const router = require('./router/index');
const bodyParser = require('koa-bodyparser');

//路由
app.use(bodyParser());
app.use(router.routes(),router.allowedMethods());

app.listen(3000);