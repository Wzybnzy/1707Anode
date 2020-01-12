const whiteList = ['/login','/registry'];
const jwt = require('jsonwebtoken');

module.exports = ()=>{
    return async (ctx,next)=>{
        if(whiteList.includes(ctx.path)){
            await next();
        } else {
            let token = ctx.request.headers.authorization;
            if(!token){
                ctx.body = {
                    code:4,
                    mes:'没有权限'
                }
                return;
            }

            try{
                let userInfo = jwt.verify(token,ctx.app.config.keys);
                // console.log(userInfo);
                await next();
            }
            catch(e){
                console.log(e,'&&&&&&&&&&&&&&&&&&&&&&&');
                ctx.body = {
                    code:5,
                    mes:'token校验失败'
                }
            }
        }

    }
}