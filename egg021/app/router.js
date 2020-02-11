'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);


  //注册接口
  router.post('/registry',controller.user.user.registry);
  //登录接口
  router.post('/login',controller.user.user.login);

  //下边这两个接口都需要验证身份，登录之后才能访问

  //访问这两个接口之前，要先做token判断

  //获取用户身份接口
  router.get('/getuserinfo',controller.user.user.getuserinfo);

  //获取左侧的列表
  router.get('/getlist',controller.user.user.getlist);
};
