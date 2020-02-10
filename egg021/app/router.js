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

  //获取用户身份接口
  router.get('/getuserinfo',controller.user.user.getuserinfo);
};
