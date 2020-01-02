const router = require('koa-router')();
//接口 第一个参数是接口名称，第二个参数是回调函数
router.get('/list', async ctx=>{ //获取get请求的参数 ctx.query || ctx.request.query  || ctx.req
    // console.log(ctx)
    ctx.body={
        query:ctx.query,  // {}
        ctx_query:ctx.request.query,
        querystring:ctx.querystring, // string
        ctx_querystring:ctx.request.querystring  
    }
});

router.get('/detail/:id', async ctx=>{
    // console.log(ctx.params);
    ctx.body = "detail"
});

router.get('/home', async ctx=>{
    ctx.body = {
        code:1,
        mes:'home'
    }
});


module.exports = router;