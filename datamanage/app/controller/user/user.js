'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
class UserController extends Controller {
    async registry() {
        //注册
        let { ctx } = this;
        let { phone, pwd } = ctx.request.body;
        //判断参数是否传递过来了,非空校验
        if (!phone || !pwd) {
            ctx.body = {
                code: 2,
                mes: '缺少参数'
            }
            return;
        }

        //判断该手机号是否已经注册过了

        let user = await ctx.service.user.user.getuser(phone);
        // if (user.length > 0) {
        //     ctx.body = {
        //         code: 3,
        //         mes: '该用户已经注册过了'
        //     }
        //     return;
        // }
        if (!user) {
            ctx.body = {
                code: 3,
                mes: '该用户已经注册过了'
            }
            return;
        }
        let res = await ctx.service.user.user.registry(phone, ctx.helper.help(pwd));
        if (res.affectedRows == 1) {
            ctx.body = {
                code: 1,
                mes: '注册成功'
            }
        } else {
            ctx.body = {
                code: 0,
                mes: '注册失败'
            }
        }

    }
    async login() {
        let { ctx } = this;
        let { phone, pwd } = ctx.request.body;
        //判断参数是否传递过来了,非空校验
        if (!phone || !pwd) {
            ctx.body = {
                code: 2,
                mes: '缺少参数'
            }
            return;
        }

        //判断当前登录的用户是否注册过
        let user = await ctx.service.user.user.getuser(phone);

        if (!user) {
            ctx.body = {
                code: 3,
                mes: '该用户还没有注册'
            }
            return;
        }
        // if (user.length == 0) {
        //     ctx.body = {
        //         code: 3,
        //         mes: '该用户还没有注册'
        //     }
        //     return;
        // }

        //登录
        let res = await ctx.service.user.user.login(phone,ctx.helper.help(pwd));
        let token = jwt.sign({...res[0]},this.app.config.keys,{expiresIn:'10h'});
        if(res.length > 0){
            ctx.body = {
                code:1,
                token,
                uid:res[0].id,
                mes:'登录成功'
            }
        } else {
            ctx.body = {
                code:0,
                mes:'登录失败'
            }
        }
    }
}

module.exports = UserController;
