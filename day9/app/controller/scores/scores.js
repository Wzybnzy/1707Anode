'use strict';

const Controller = require('egg').Controller;
class ScoresController extends Controller {
    async add() {
        let { ctx } = this;
        let { name, theory, skill } = ctx.request.body;

        if (!name || !theory || !skill) {
            ctx.body = {
                code: 3,
                mes: '缺少参数'
            }
            return;
        }
        //判断name是否已经添加过
        let data = await ctx.service.scores.scores.getscores(name);
        if (data.length == 0) { //没有添加过
            let res = await ctx.service.scores.scores.add(ctx.request.body);
            ctx.body = res;
            if (res.affectedRows == 1) {
                ctx.body = {
                    code: 1,
                    mes: '插入成功'
                }
            } else {
                ctx.body = {
                    code: 0,
                    mes: '插入失败'
                }
            }
        } else {
            ctx.body = {
                code: 2,
                mes: '该学生已经存在，请去修改'
            }
        }
    }
    async del() { // 删除
        let { ctx } = this;
        let { id } = ctx.query;
        let res = await ctx.service.scores.scores.del(id);
        if (res.affectedRows == 1) {
            ctx.body = {
                code: 1,
                mes: '删除成功'
            }
        } else {
            console.log('shanchu')
            ctx.body = {
                code: 0,
                mes: '删除失败'
            }
        }
    }
    async update() {
        let { ctx } = this;
        let res = await ctx.service.scores.scores.update(ctx.request.body);
        if (res.affectedRows == 1) {
            ctx.body = {
                code: 1,
                mes: '修改成功'
            }
        } else {
            ctx.body = {
                code: 0,
                mes: '修改失败'
            }
        }
    }
    async list(){
        let { ctx } = this;
        let {search = ''} = ctx.query;
        let res = await ctx.service.scores.scores.list(search);
        ctx.body = res;
    }
}

module.exports = ScoresController;
