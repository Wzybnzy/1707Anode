const router = require('koa-router')();
const query = require('../../db/query');
const crypto = require('crypto');

router.prefix('/user');

router.post('/registry', async ctx => {
    let { phone, pwd } = ctx.request.body;
    if (!phone || !pwd) {
        ctx.body = {
            code: 2,
            mes: '缺少参数'
        }
        return;
    }

    //判断当前的电话号码是否注册过
    let data = await query(`select * from use2 where phone = '${phone}'`);

    if (data.length != 0) {
        ctx.body = {
            code: 3,
            mes: '该用户已经注册过了'
        }
    } else {
        const md5 = crypto.createHash('md5');
        md5.update(pwd);
        pwd = md5.digest('hex');
        let res = await query(`insert into use2 (phone,pwd) values ('${phone}','${pwd}')`);
        console.log(res);

        if (res.affectedRows == 1) {
            ctx.body = {
                code: 1,
                mes: '插入成功'
            }
        } else {
            ctx.body = {
                code: 0,
                mes: '插入失败'
            }
        }
    }
});


module.exports = router;