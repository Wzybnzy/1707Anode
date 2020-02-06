'use strict';

const Controller = require('egg').Controller;

class FileController extends Controller {
    async add() {
        let { ctx } = this;
        let { file_name, file_info, know_id, isshow, uid } = ctx.request.body;
        if (!file_name || !file_info || !isshow || !uid || !know_id) {
            ctx.body = {
                code: 3,
                mes: '缺少参数'
            }
            return;
        }

        let res = await ctx.service.file.file.add(ctx.request.body);
        if (res.affectedRows == 1) {
            ctx.body = {
                code: 1,
                mes: '文档添加成功'
            }
        } else {
            ctx.body = {
                code: 0,
                mes: '文档添加失败'
            }
        }
    }
    async update() {
        let { ctx } = this;
        let { file_name, file_info, uid, id } = ctx.request.body;
        if (!file_name || !file_info || !uid || !id) {
            ctx.body = {
                code: 3,
                mes: '缺少参数'
            }
            return;
        }
        let res = await ctx.service.file.file.update(ctx.request.body);
        if (res.affectedRows == 1) {
            ctx.body = {
                code: 1,
                mes: '文档修改成功'
            }
        } else {
            ctx.body = {
                code: 0,
                mes: '文档修改失败'
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
        let res = await ctx.service.file.file.delete(id, uid);
        if (res.affectedRows == 1) {
            ctx.body = {
                code: 1,
                mes: '文档删除成功'
            }
        } else {
            ctx.body = {
                code: 0,
                mes: '文档删除失败'
            }
        }
    }
    async list() {
        let { ctx } = this;
        let { uid } = ctx.query;
        console.log(uid,'uid***************')
        if (!uid) {
            ctx.body = {
                code: 3,
                mes: '缺少参数'
            }
            return;
        }
        let res = await ctx.service.file.file.list(uid);
        // console.log(res,'res************');
        if (res.length !== 0) {
            ctx.body = {
                code: 1,
                data: res
            }
        } else {
            ctx.body = {
                code: 0,
                mes: '获取列表失败'
            }
        }
    }
    async search() {
        let { ctx } = this;
        let { search = '' } = ctx.query;
        let res = await ctx.service.file.file.search(search);
        if (res.length !== 0) {
            ctx.body = {
                code: 1,
                data: res
            }
        } else {
            ctx.body = {
                code: 0,
                mes: '搜索失败'
            }
        }
    }
    async detail() {
        let { ctx } = this;
        let { uid, know_id } = ctx.query;
        if (!uid || !know_id) {
            ctx.body = {
                code: 3,
                mes: '缺少参数'
            }
            return;
        }
        let res = await ctx.service.file.file.detail(uid, know_id);
        if (res.length !== 0) {
            ctx.body = {
                code: 1,
                data: res
            }
        } else {
            ctx.body = {
                code: 0,
                mes: '获取详情失败'
            }
        }
    }
}

module.exports = FileController;
