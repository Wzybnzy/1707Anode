'use strict';

const Controller = require('egg').Controller;

class AddlistController extends Controller {
  async addlist() {
    let { ctx } = this;
    let { name, phone, card, address, label, followup, role } = ctx.request.body;
    //判断参数
    if (!name || !phone || !card || !address || !label || !followup || !role) {
      ctx.body = {
        code: 2,
        mes: '缺少参数'
      }
      return;
    }
    //判断当前用户名是的存在
    let user = await ctx.service.list.list.getuser(name);
    if (user) { //当前用户已经存在
      ctx.body = {
        code: 3,
        mes: '该用户已经存在'
      }
      return;
    }
    // if (user.length > 0) {
    //   ctx.body = {
    //     code: 3,
    //     mes: '该用户已经存在'
    //   }
    //   return;
    // }

    // //添加用户
    let res = await ctx.service.list.list.addlist(ctx.request.body);
    if (res.affectedRows == 1) {
      ctx.body = {
        code: 1,
        mes: '添加成功'
      }
    } else {
      ctx.body = {
        code: 0,
        mes: '添加失败'
      }
    }
  }
  async dellist() {
    let { ctx } = this;
    let { id } = ctx.query; //id  3,8
    let res = await ctx.service.list.list.dellist(id);

    console.log(res, '*****************');
    //删除多条
    if (res.affectedRows !== 0) {
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
  async getlist() {
    let { ctx } = this;
    let { page = 1, limit = 5 } = ctx.query;
    let res = await ctx.service.list.list.getlist(page, limit);
    ctx.body = {
      code:1,
      ...res
    }

    // ctx.body = {
    //   code:1,
    //   total:8,
    //   data:[]
    // }
  }
}

module.exports = AddlistController;
