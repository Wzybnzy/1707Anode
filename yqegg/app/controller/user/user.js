'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
class UserController extends Controller {
  async registry() {
    let {ctx} = this;
    let {name,pwd} = ctx.request.body;
    //判断参数是否为空
    if(!name || !pwd){
        ctx.body = {
            code:3,
            mes:'缺少参数'
        }
        return;
    }

    // 判断当前用户名是否注册过
    let user = await ctx.service.user.user.getuser(name);
    if(user.length !== 0){ //有这个人
        ctx.body = {
            code:2,
            mes:'该用户名已经注册过了'
        }
        return;
    }

    let res = await ctx.service.user.user.registry(name,ctx.helper.help(pwd));
   
    if(res.affectedRows == 1){
        ctx.body = {
            code:1,
            mes:'注册成功'
        }
    } else {
        ctx.body = {
            code:0,
            mes:'注册失败'
        }
    }
  }
  async login(){
      let {ctx} = this;
      let {name,pwd} = ctx.request.body;
      if(!name || !pwd){
          ctx.body = {
              code:3,
              mes:'缺少参数'
          }
          return;
      }

      //判断当前用户名是否注册过
      let user = await ctx.service.user.user.getuser(name);
      if(user.length == 0){ //
          ctx.body = {
              code:2,
              mes:'该用户名还没有被注册过'
          }
          return;
      }  

      let res = await ctx.service.user.user.login(name,ctx.helper.help(pwd));
      console.log(res);
      const token = jwt.sign({...res[0]},this.app.config.keys,{expiresIn:'10h'});
      if(res.length > 0){
          ctx.body = {
              code:1,
              data:{
                uid:res[0].id,
                token
              },
              mes:'登录成功'
          }
      } else {
        ctx.body = {
            code:0,
            mes:'登录失败'
        }
      }
  }

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

      let follow = await ctx.service.user.user.getfollow(follow_id,user_id);
      if(follow.length !== 0){
        ctx.body = {
            code:2,
            mes:'该作者已经关注过了'
        }
        return;
      }

      let res = await ctx.service.user.user.follow(user_id,follow_id);
      ctx.body = res;
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
      let res = await ctx.service.user.user.followlist(uid);
      ctx.body = res;
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
      let res = await ctx.service.user.user.followdel(user_id,follow_id);
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

module.exports = UserController;
