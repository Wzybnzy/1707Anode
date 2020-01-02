const router = require('koa-router')();

router.post('/login',async ctx=>{ //post请求获取参数的
    console.log(ctx.request.body); 
    ctx.body='login'
});


module.exports = router;
