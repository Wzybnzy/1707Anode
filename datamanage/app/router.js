'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  //登录
  router.post('/login', controller.user.user.login);
  //注册
  router.post('/registry', controller.user.user.registry);
  
  
  // 添加列表
  router.post('/addlist', controller.list.list.addlist);

  //删除
  router.get('/dellist',controller.list.list.dellist);


  //获取列表
  router.get('/list',controller.list.list.getlist);

};
