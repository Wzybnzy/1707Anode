'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);


  //注册
  router.post('/registry', controller.user.user.registry);;
  //登录
  router.post('/login', controller.user.user.login);

  //知识库

  //添加知识库
  router.post('/know/add', controller.know.know.add);
  //修改知识库
  router.post('/know/update', controller.know.know.update);

  //删除知识库
  router.get('/know/del', controller.know.know.delete);

  //获取知识库的列表
  router.get('/know/list', controller.know.know.list);


  //文档

  //新建文档
  router.post('/file/add', controller.file.file.add);;

  // 修改文档
  router.post('/file/update', controller.file.file.update);

  //删除
  router.get('/file/del', controller.file.file.delete);

  //获取文档列表
  router.get('/file/list', controller.file.file.list);

  //搜索文档
  router.get('/file/search', controller.file.file.search);

  //文档详情
  router.get('/file/detail', controller.file.file.detail);

  //关注作者
  router.post('/follow/followadd', controller.follow.follow.follow);
  //获取所有关注过的人
  router.get('/follow/followlist', controller.follow.follow.followlist);

  //取消关注
  router.get('/follow/followdel', controller.follow.follow.followdel);


  //收藏

  //添加收藏
  router.post('/coll/add', controller.collection.collection.add);
  //获取收藏
  router.get('/coll/list', controller.collection.collection.list);
  // 删除收藏
  router.get('/coll/del', controller.collection.collection.del);
};
