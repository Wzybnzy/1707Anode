
const Koa = require('koa');
const app = new Koa();
const static = require('koa-static');
const {readFileSync} = require('fs');
const path = require('path');

// app.use(async ctx =>{
//     ctx.body = readFileSync('./public/index.html','utf-8');
// })

//一类是接口请求  一类是静态资源
// 判断请求的是静态资源还是接口   发起请求的：ajax、img、script、link、a 
app.use(static(path.join(__dirname,'public')))


app.use(async (ctx,next)=>{
    console.log('这是第一个中间件');
    // ctx.body = 'hello'
    await next();  //执行下一个中间件
    console.log('a');
});

// app.use(async (ctx,next)=>{
//     console.log('这是第二个中间件');
//     await next();
//     console.log('b');
// });

// app.use(async (ctx,next)=>{
//     console.log('这是第三个中间件');
//     await next();
//     console.log('c');
// });

app.listen(3000);
