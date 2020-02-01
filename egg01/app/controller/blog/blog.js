'use strict';

const Controller = require('egg').Controller;

class BlogController extends Controller {
    async add() {
        let { ctx } = this;
        let { title, content, author, img } = ctx.request.body;
        if (!title || !content || !author || !img) {
            ctx.body = {
                code: 3,
                mes: '缺少参数'
            }
            return;
        }
        let res = await ctx.service.blog.blog.add(ctx.request.body);
        if (res.affectedRows == 1) {
            ctx.body = {
                code: 1,
                mes: '发布成功'
            }
        } else {
            ctx.body = {
                code: 2,
                mes: '发布失败'
            }
        }
    }
    async del() {
        console.log('del&&&&&&&&&&&&&&&&&&&&&&&&&&&')
        let { ctx } = this;
        let { id } = ctx.query;
        console.log(id,'*********');
        if (!id) {
            ctx.body = {
                code: 3,
                mes: '缺少参数'
            }
            return;
        }

        let res = await ctx.service.blog.blog.del(id);
        if (res.affectedRows == 1) {
            ctx.body = {
                code: 1,
                mes: '删除成功'
            }
        } else {
            ctx.body = {
                code: 0,
                mes: '删除失败'
            }
        }
    }
    async update() {
        let { ctx } = this;
        let { id, title, content } = ctx.request.body;
        if (!id || !title || !content) {
            ctx.body = {
                code: 3,
                mes: '缺少参数'
            }
            return;
        }

        let res = await ctx.service.blog.blog.update(ctx.request.body);
        if (res.affectedRows == 1) {
            ctx.body = {
                code: 1,
                mes: '编辑成功'
            }
        } else {
            ctx.body = {
                code: 0,
                mes: '编辑失败'
            }
        }
    }
    async list(){
        let { ctx } = this;
        let res = await ctx.service.blog.blog.list();
        ctx.body = res;
    }

    async detail(){
        let {ctx} = this;
        let {id} = ctx.query;
        let res = await ctx.service.blog.blog.detail(id);
        ctx.body = res;
    }
}

module.exports = BlogController;
