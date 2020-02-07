'use strict';

const Controller = require('egg').Controller;

class CollectionController extends Controller {
  async add() {
    let {ctx} = this;
    let {uid,file_id} = ctx.request.body;
    console.log(uid,file_id);
    if(!uid || !file_id){
        ctx.body = {
            code:3,
            mes:'缺少参数'
        }
        return;
    }
    let coll = await ctx.service.collection.collection.getcoll(uid,file_id);
    if(coll.length !==0 ){
        ctx.body = {
            code:2,
            mes:'该文章已经被收藏过了'
        }
        return;
    }

    let res = await ctx.service.collection.collection.add(uid,file_id);
    if(res.affectedRows ==1){
        ctx.body = {
            code:1,
            mes:'收藏成功'
        }
    } else {
        ctx.body = {
            code:1,
            mes:'收藏失败'
        }
    }
  }
   
  async list(){
      let {ctx} = this;
      let {uid} = ctx.query;
      let res = await ctx.service.collection.collection.list(uid);
      if(res.length > 0 ){
          ctx.body = {
              code:1,
              data:res
          }
      } else {
          ctx.body = {
              code:0,
              mes:'失败'
          }
      }
  }

  async del(){
      let {ctx} = this;
      let {uid,file_id} = ctx.query;
      if(!uid || !file_id){
          ctx.body = {
              code:3,
              mes:'缺少参数'
          }
          return;
      }

      let res = await ctx.service.collection.collection.delete(uid,file_id);
      if(res.affectedRows == 1){
        ctx.body = {
            code:1,
            mes:'删除成功'
        }
      } else {
        ctx.body = {
            code:1,
            mes:'删除失败'
        }
      }
  }
}

module.exports = CollectionController;
