'use strict';

const Controller = require('egg').Controller;
// const crypto =  require('crypto');
const jwt = require('jsonwebtoken');
const createRule = { //校验规则
    name: {
        type: 'string'
    },
    pwd: {
        type: 'password'
    },
};
class UserController extends Controller {
    async registry() {
        let { ctx } = this;

        let { name, pwd } = ctx.request.body;

        if (!name || !pwd) {
            ctx.body = {
                code: 3,
                mes: '缺少参数'
            }
            return;
        }

        try {

            ctx.validate(createRule);


            //判断当前账号是否已经注册过了

            let user = await ctx.service.user.user.getuser(name);
            if (user.length > 0) {
                ctx.body = {
                    code: 2,
                    mes: '该用户名已经存在，请换一个名字'
                }
                return;
            }
            console.log(user);
            //插入
            // const md5 = crypto.createHash('md5');
            // md5.update(pwd);
            let res = await ctx.service.user.user.registry(name, ctx.helper.help(pwd));
            if (res.affectedRows == 1) {
                ctx.body = {
                    code: 1,
                    mes: '成功'
                }
            } else {
                ctx.body = {
                    code: 0,
                    mes: '失败'
                }
            }
        } catch (e) {
            console.log(e);
            ctx.body = {
                code: 4,
                mes: '参数类型校验失败'
            }
        }


    }
    async login() {
        const { ctx } = this;
        let { name, pwd } = ctx.request.body;
        if (!name || !pwd) {
            ctx.body = {
                code: 3,
                mes: '缺少参数'
            }
            return;
        }
        //判断该用户是否注册过
        let user = await ctx.service.user.user.getuser(name);
        if (user.length == 0) {
            ctx.body = {
                code: 2,
                mes: '该用户还没有注册，请先注册'
            }
            return;
        }
        //登录
        let res = await ctx.service.user.user.login(name, ctx.helper.help(pwd));
        let token = jwt.sign({...res[0]},this.app.config.keys,{expiresIn:'10h'});
        if (res.length > 0) {
            ctx.body = {
                code: 1,
                token,
                uid:res[0].id,
                mes: '登录成功'
            }
        } else {
            ctx.body = {
                code: 0,
                mes: '登录失败'
            }
        }
    }
}

module.exports = UserController;
