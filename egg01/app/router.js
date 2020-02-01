'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/registry',controller.user.user.registry);
  router.post('/login',controller.user.user.login);


  //列表
  //添加列表
  router.post('/add',controller.blog.blog.add);
  // 删除
  router.get('/del',controller.blog.blog.del);

  //修改
  router.post('/update',controller.blog.blog.update);

  //获取列表
  router.get('/list',controller.blog.blog.list);

  //详情
  router.get('/detail',controller.blog.blog.detail);
};
