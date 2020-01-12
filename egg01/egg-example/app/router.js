'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index); // / index()
  router.get('/list', controller.user.user.list ); //定义一个接口
  router.get('/detail/:id', controller.user.user.detail ); //定义一个接口
  router.post('/login',controller.user.user.login);
  router.get('/userlist',controller.user.user.userlist);
  router.resources('posts','/api/posts',controller.posts);
};
