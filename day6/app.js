const Koa = require('koa');
const static = require('koa-static');  
const path = require('path');
// const router = require('koa-router')(); //引入路由
const bodyParser = require('koa-bodyparser'); //处理的是post请求的参数，这是一个中间件

const router = require('./router/index.js');
//实例koa 
const app = new Koa();

//注册中间件
// app.use(async (ctx,next) =>{
//     ctx.body = {
//         code:0,
//         mes:'123'
//     }
//     await next();
// })

// http.createServer((req,res)=>{

// })

// 1-------



//处理静态文件
app.use(static(path.join(__dirname,'public')));

app.use(bodyParser());

//注册路由
app.use(router.routes(),router.allowedMethods()); //启动路由
// app.use(router.allowedMethods());  //设置status

//监听端口号
app.listen(3000);