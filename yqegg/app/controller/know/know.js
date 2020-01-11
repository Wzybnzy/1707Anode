'use strict';

const Controller = require('egg').Controller;

class KnowController extends Controller {
    async add() {
        let { ctx } = this;
        let { know_name, know_info, isshow, uid } = ctx.request.body;
        if (!know_name || !know_info || !isshow || !uid) {
            ctx.body = {
                code: 3,
                mes: '缺少参数'
            }
            return;
        }

        let res = await ctx.service.know.know.add(ctx.request.body);
        if (res.affectedRows == 1) {
            ctx.body = {
                code: 1,
                mes: '知识库新建成功'
            }
        } else {
            ctx.body = {
                code: 0,
                mes: '知识库新建失败'
            }
        }

    }
    async update() {
        let { ctx } = this;
        let { know_name, know_info, isshow, uid, id } = ctx.request.body;
        if (!know_name || !know_info || !isshow || !uid || !id) {
            ctx.body = {
                code: 3,
                mes: '缺少参数'
            }
            return;
        }
        let res = await ctx.service.know.know.update(ctx.request.body);
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
    async delete() {
        let { ctx } = this;
        let { id, uid } = ctx.query;
        if (!id || !uid) {
            ctx.body = {
                code: 3,
                mes: '缺少参数'
            }
            return;
        }

        let res = await ctx.service.know.know.delete(id, uid);
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
    async list() {
        let { ctx } = this;
        let { uid } = ctx.query;
        if (!uid) {
            ctx.body = {
                code: 3,

                mes: '缺少参数'
            }
            return;
        }
        let res = await ctx.service.know.know.list(uid);
        console.log(res,'&&&&&&&&&&&&&&');
        ctx.body = {
            code:1,
            data:res
        };
    }
}

module.exports = KnowController;
