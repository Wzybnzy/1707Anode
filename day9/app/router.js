'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // user
  router.post('/login', controller.user.user.login);
  router.post('/registry', controller.user.user.registry);

  //scores
  //添加成绩
  router.post('/scores/add',controller.scores.scores.add);
  router.get('/scores/del',controller.scores.scores.del);
  router.post('/scores/update',controller.scores.scores.update);
  router.get('/scores/list',controller.scores.scores.list);


  //获取所有没有添加过的学生
  router.get('/user/student',controller.user.user.student);

  //获取左边的菜单
  router.get('/user/menu',controller.user.user.menu);

};
