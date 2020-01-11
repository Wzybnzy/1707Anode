'use strict';

const Controller = require('egg').Controller;

class FileController extends Controller {
    async add() {
        let { ctx } = this;
        let {file_name, file_info,know_id, isshow, uid } = ctx.request.body;
        if (!file_name || !file_info || !isshow || !uid || !know_id) {
            ctx.body = {
                code: 3,
                mes: '缺少参数'
            }
            return;
        }

        let res = await ctx.service.file.file.add(ctx.request.body);
        if(res.affectedRows == 1){
            ctx.body = {
                code:1,
                mes:'文档添加成功'
            }
        } else {
            ctx.body = {
                code:0,
                mes:'文档添加失败'
            }
        }
    }
}

module.exports = FileController;
