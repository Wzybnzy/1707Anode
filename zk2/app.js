const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');

const router = require('./router/index');

app.use(bodyParser());

app.use(router.routes(),router.allowedMethods());

app.listen(3000)


// class Router{
//     routes(){

//     }
// }