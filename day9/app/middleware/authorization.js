const whiteList = ['/login', '/registry']; //不需要做鉴权校验的路径
const jwt = require('jsonwebtoken');
module.exports = () => {
    return async (ctx, next) => { // /login  /scores/add
        //判断当前访问的这个路径是否需要鉴权
        // console.log(ctx.path, 'path&&&&&&&&&&&'); // /login
        if (whiteList.includes(ctx.path)) {
            await next();
        } else { // /add /del
            //判断token是否传过来了
            let token = ctx.request.headers.authorization;
            // console.log(token, 'token*******');
            if (!token) {
                ctx.body = {
                    code: 4,
                    mes: '没有权限'
                }
                return;
            }
            //如果传递了token，
            try{
                let userInfo = jwt.verify(token,ctx.app.config.keys);
                console.log('验证通过&&&&&&&&&');
                await next();
            } catch(e){
                console.log(e,'^^^^^^^^^^^^^^^^^^^');
                ctx.body = {
                    code: 5,
                    mes: 'token过期'
                }
            }

        }
    }
}