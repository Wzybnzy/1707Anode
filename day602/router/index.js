const router = require('koa-router')();

const user = require('./user/user');
//注册子路由
router.use(user.routes(),user.allowedMethods());


module.exports = router;
