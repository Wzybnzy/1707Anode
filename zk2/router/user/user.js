const router = require('koa-router')();
const query = require('../../db/query');
const crypto = require('crypto');
const moment = require('moment');

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
        const md5 = crypto.createHash('md5'); //创建加密对象
        md5.update(pwd);  //对谁加密
        pwd = md5.digest('hex'); //取出来加密之后的密码
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

router.post('/login', async ctx => {
    let { phone, pwd } = ctx.request.body;
    if (!phone || !pwd) {
        ctx.body = {
            code: 3,
            mes: '缺少参数'
        }
        return;
    }
    let data = await query(`select * from use2 where phone='${phone}'`);
    if (data.length > 0) { //注册过
        //判断电话号码和密码是否一致 && and || or
        const md5 = crypto.createHash('md5');
        md5.update(pwd);
        pwd = md5.digest('hex');
        let res = await query(`select * from use2 where phone='${phone}'and pwd='${pwd}'`);
        console.log(res);
        if (res.length > 0) {
            ctx.body = {
                code: 1,
                mes: '登录成功'
            }
        } else {
            ctx.body = {
                code: 0,
                mes: '登录失败'
            }
        }
    } else { //没有注册过
        ctx.body = {
            code: 2,
            mes: '没有该手机号，请先注册'
        }
    }
});


router.post('/sign', async ctx => {
    let { uid } = ctx.request.body;
    // 2020-01-07 格式化时间
    let formatTime = moment(new Date()).format('YYYY-MM-DD')
    console.log(formatTime);
    //判断当前日期是否已经在数据库里面存在
    let data = await query(`select * from signlist where DATE_FORMAT(time,'%Y-%m-%d')='${formatTime}' and uid=${uid}`);
    console.log(data);
    if (data.length > 0) { //已经签到过了
        ctx.body = {
            code: 2,
            mes: '一天只能不能签到2次'
        }
    } else {
        let res = await query(`insert into signlist (time,uid) values (now(),${uid})`);
        console.log(res);
        let length = await query(`select count(*) from signlist`);
      
        if(res.affectedRows == 1){
            ctx.body = {
                code:1,
                count:length[0]['count(*)'],
                mes:'签到成功'
            }
        } else {
            ctx.body = {
                code:0,
                mes:"签到失败"
            }
        }
    }


});


module.exports = router;