'use strict';

const Controller = require('egg').Controller;
const createVid = {
    stu: 'string',
    pwd: {
        type: 'password',
        required: true
    }
}
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

class UserController extends Controller {
    async login() {
        let { ctx } = this;
        let { stu, pwd } = ctx.request.body;
        //判断参数是否传递
        if (!stu || !pwd) {
            ctx.body = {
                code: 3,
                mes: '缺少参数'
            }
            return;
        }

        try {
            ctx.validate(createVid);
            //判断学号是否已经注册了，如果没有注册，需要先注册，如果注册过了，判断学号和密码是否一致
            // 获取数据库返回的值
            let data = await ctx.service.user.user.getuser(stu);
            // console.log(data, '^^^^^^^^^^^^^^^^^^^^')
            if (data.length == 0) { //没有查到
                ctx.body = {
                    code: 2,
                    mes: '该用户没有注册过'
                }
            } else { //注册过了

                // const md5 = crypto.createHash('md5');
                // md5.update(pwd);
                // pwd = md5.digest('hex');

                let res = await ctx.service.user.user.login(stu, ctx.helper.help(pwd));
                console.log(res, '&&&&&&&&&&&&&&&&');
                let token = jwt.sign({...res[0]},this.app.config.keys,{expiresIn:'7h'});
                if (res.length > 0) {
                    ctx.body = {
                        code: 1,
                        token,
                        uid:res[0].id,
                        name:res[0].name,
                        role:res[0].role,
                        mes: '登录成功'
                    };
                } else {
                    ctx.body = {
                        code: 0,
                        mes: '登录失败'
                    }
                }
            }
        }
        catch (e) {
            console.log(e.errors);
            ctx.body = {
                code: 4,
                mes: '参数类型不正确'
            }
        }
    }
    async registry() { //注册
        let { ctx } = this;
        let { name, stu, pwd,role } = ctx.request.body;
        if (!name || !stu || !pwd || !role) {
            ctx.body = {
                code: 3,
                mes: '缺少参数'
            }
            return;
        }

        try {
            ctx.validate(createVid);
            //判断当前学号是否已经注册过了
            let data = await ctx.service.user.user.getuser(stu);
            if (data.length == 0) { //没有注册过

                // const md5 = crypto.createHash('md5');
                // md5.update(pwd);
                // pwd = md5.digest('hex');
                
                let res = await ctx.service.user.user.registry(name,ctx.helper.help(pwd),stu,role);
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
            } else {
                // ctx.body = {
                //     code: 2,
                //     mes: '该用户已经注册过了'
                // }
                ctx.helper.ctxBody(ctx,{code:2,mes:'该用户已经注册过了'});
            }
        }
        catch (e) {
            ctx.body = {
                code: 4,
                mes: '参数类型不正确'
            }
        }


    }

    async student(){
        let {ctx} = this;
        let res = await ctx.service.user.user.student();
        ctx.body = res;
    }
    async menu(){
        let {ctx} = this;
        let {role_id} = ctx.query;
        // console.log(object)
        let role_name = await ctx.service.user.user.rolename(role_id); 
        let res = await ctx.service.user.user.menu(role_id);
        ctx.body = res;
    }
}

module.exports = UserController;
