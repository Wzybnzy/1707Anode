const jwt = require('jsonwebtoken');
const whiteList = ['/login', '/registry', '/list'];
module.exports = () => {
    return async (ctx, next) => {
        //判断当前的url是否在白名单里面
        if (whiteList.includes(ctx.path)) { //不需要登录就能访问
            await next();
        } else { // /add  /del  /update 
            // 获取token
            let token = ctx.request.headers.authorization;
            if (!token) {
                ctx.body = {
                    code: 4,
                    mes: '没有权限'
                }
                return;
            }
            try {
                //校验token,校验通过了，要下一步next
                let userInfo = jwt.verify(token, ctx.app.config.keys);
                console.log(userInfo);
                await next();
            } catch (e) {
                console.log(e, "*******");
            }
            console.log('@@@@@@@@@@@@@@@@@@@@@@@');
        }
    }
}