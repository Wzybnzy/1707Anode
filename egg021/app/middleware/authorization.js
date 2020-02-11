const jwt = require('jsonwebtoken');
const whiteList = ['/login','/registry'];  //这两个接口不需要做鉴权校验
module.exports = ()=>{
    return async (ctx,next)=>{
        //先判断那些请求不需要做校验
        if(whiteList.includes(ctx.path)){ //不需要校验
            await next();
        } else { //需要
            //获取token
            let token = ctx.request.headers.authorization;
            //判断是否传了token
            if(!token){
                ctx.body = {
                    code:4,
                    mes:'没有权限'
                }
                return;
            }
            try{
                let userInfo = jwt.verify(token,ctx.app.config.keys);
                await next();
            } catch(e){
                console.log(e,'********');
                if(e.name == 'TokenExpiredError'){
                    ctx.body = {
                        code:5,
                        mes:'token过期'
                    }
                    return;
                }
            }

        }
    }
}