const { Controller } = require('egg');

class UserController extends Controller {
    async list() {
        let { ctx } = this;
        console.log(ctx.query); //get请求的参数
        ctx.body = {
            code: 1,
            mes: '列表'
        }
    }
    async detail() {
        let { ctx } = this;
        console.log(ctx.params); //获取的动态路由的参数
        ctx.body = {
            code: 1,
            mes: '详情'
        }
    }
    async login() {
        let { ctx } = this;
        // console.log(ctx.request.body); //获取的是post请求的参数
        let { name, pwd } = ctx.request.body;
        console.log(name, pwd)
        const createRule = {
            name: {
                type: 'email'
            },
            pwd: {
                type: 'password'
            }
        };

        ctx.validate(createRule);
        ctx.body = {
            code: 1,
            mes: '登录'
        }
    }

    async userlist(){
        let {ctx} = this;
        let res = await ctx.service.user.user.getuser(1);
        ctx.body = {
            code:1,
            mes:'用户列表',
            data: res
        }
    }
}



module.exports = UserController;