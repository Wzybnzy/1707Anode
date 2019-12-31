const Koa = require('koa');
const app = new Koa();
const path = require('path');

const static = require('koa-static'); //静态资源处理的中间件
let router = require('koa-router')(); //路由的中间件
console.log(router);

app.use(router.routes()).use(router.allowedMethods());
app.use(static(path.join(__dirname,'public')));

// /list  

router.get('/list',async ctx=>{
    ctx.body = {
        code:1,
        data:[
            {
                name:'小花'
            }
        ]
    }
});




app.listen(3000)