'use strict';

const Controller = require('egg').Controller;

class FollowController extends Controller {
    async follow(){
        let {ctx} = this;
        let {user_id,follow_id} = ctx.request.body;
        if(!user_id || !follow_id){
            ctx.body = {
                code:3,
                mes:"缺少参数"
            }
            return;
        }
  
        let follow = await ctx.service.follow.follow.getfollow(follow_id,user_id);
        if(follow.length !== 0){
          ctx.body = {
              code:2,
              mes:'该作者已经关注过了'
          }
          return;
        }
  
        let res = await ctx.service.follow.follow.follow(user_id,follow_id);
        if(res.affectedRows == 1){
            ctx.body = {
                code:1,
                mes:'关注成功'
            }
        } else {
            ctx.body = {
                code:1,
                mes:'关注失败'
            }
        }
    }
    async followlist(){
        let {ctx} = this;
        let {uid} = ctx.query;
        if(!uid){
          ctx.body = {
              code:3,
              mes:"缺少参数"
          }
          return;
        }
        let res = await ctx.service.follow.follow.followlist(uid);
        if(res.length > 0){
            ctx.body = {
                code:1,
                data:res
            }
        } else {
            ctx.body = {
                code:0,
                mes:"获取失败"
            }
        }
    }
    async followdel(){
        let {ctx} = this;
        let {user_id,follow_id} = ctx.query;
        console.log(user_id,follow_id,"&&&&**************");
        if(!user_id || !follow_id){
          ctx.body = {
              code:3,
              mes:"缺少参数"
          }
          return;
        }
        let res = await ctx.service.follow.follow.followdel(user_id,follow_id);
        if(res.affectedRows ==1){
            ctx.body = {
                code:1,
                mes:'取消关注成功'
            }
        } else {
          ctx.body = {
              code:0,
              mes:'取消关注失败'
          }
        }
    }
}

module.exports = FollowController;
