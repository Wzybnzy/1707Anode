const router = require('koa-router')();

const list = require('./list/list');
const user = require('./user/user');

//注册子路由
router.use(list.routes(),list.allowedMethods());
router.use(user.routes(),user.allowedMethods());


module.exports = router;
