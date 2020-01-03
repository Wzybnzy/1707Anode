const qs = require('querystring');
function bodyparser(ctx){ //处理post请求的参数
    let str = ''
    return new Promise((resolve,reject)=>{
        ctx.req.on('data',(chunk)=>{
            str += chunk;
        }); 
        ctx.req.on('end',(data)=>{
            console.log(str,'^^^^^^^^^^^^^^^^^^^'); // name=abc&pwd=123
            resolve(qs.parse(str));
        });    
    })
}

module.exports = ()=>{
    return async (ctx,next)=>{
        ctx.request.body = await bodyparser(ctx);
        await next();
    }
}