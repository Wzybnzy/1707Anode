'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
const createRule = {
    name: {
        type: 'string',
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
            //校验参数
            ctx.validate(createRule);
            //判断当前用户名是否已经注册了
            let user = await ctx.service.user.user.getuser(name);

            if (user.length > 0) {
                ctx.body = {
                    code: 2,
                    mes: '该用户名已经被注册'
                }
                return;
            }
            //如果没有注册再去注册
            let res = await ctx.service.user.user.registry(name, ctx.helper.help(pwd));
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
        } catch (e) {
            console.log(e, '********');
            ctx.body = {
                code: 4,
                mes: '参数类型校验失败'
            }
        }
    }
    async login() {
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
            //先判断用户名是否存在
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

            //后端完全依赖这个token来判断当前用户是否登录的
            const token = jwt.sign({ ...res[0] }, this.app.config.keys, { expiresIn: '10h' });
            if (res.length > 0) {
                ctx.body = {
                    code: 1,
                    token,
                    uid: res[0].id,
                    mes: '登录成功'
                }
            } else {
                ctx.body = {
                    code: 0,
                    mes: '登录失败'
                }
            }
        }
        catch (e) {
            ctx.body = {
                code: 4,
                mes: '参数类型校验失败'
            }
        }
    }

    async getuserinfo() {
        let { ctx } = this;
        let { uid } = ctx.query;

        //通过用户id来获取角色
        let res = await ctx.service.user.user.getuserinfo(uid);
        ctx.body = {
            code: 1,
            name:res[0].r_name
        };
    }
    async getlist() {
        let { ctx } = this;
        let { uid } = ctx.query; //用户的id
        if (!uid) {
            ctx.body = {
                code: 3,
                mes: '缺少参数'
            }
            return;
        }
        let res = await ctx.service.user.user.getlist(uid);
        if (res.length > 0) {
            ctx.body = {
                code: 1,
                data: res
            };
        } else {
            ctx.body = {
                code:0,
                mes:'失败'
            }
        }

    }
}

module.exports = UserController;
