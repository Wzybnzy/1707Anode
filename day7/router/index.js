const router = require('koa-router')();
const address = require('./address/adddress'); //二级路由
router.use(address.routes(), address.allowedMethods());

module.exports = router;