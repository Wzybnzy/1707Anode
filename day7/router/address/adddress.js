const router = require('koa-router')();
const query = require('../../db/query');
router.prefix('/address');
//添加
router.post('/add', async ctx => {
    let { name, phone, city, address, isdefault } = ctx.request.body; //post
    // 往数据库里面添加数据
    let res = await query(`insert into address (name,phone,city,address,isdefault) values ('${name}','${phone}','${city}','${address}','${isdefault}')`);
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
});

//查询
// router.
router.get('/list', async ctx => {
    let res = await query('select * from address')
    console.log(res);
    if (res.length >= 0) {
        ctx.body = {
            code: 1,
            data: res
        }
    }
})
// 删除
router.get('/delete', async ctx => {
    let { id } = ctx.request.query;
    let res = await query(`delete from address where id='${id}'`);
    if (res.affectedRows == 1) {
        ctx.body = {
            code: 1,
            mes: '删除成功'
        }
    } else {
        ctx.body = {
            code: 0,
            mes: '删除失败'
        }
    }
});


//修改

router.post('/update',async ctx=>{
    let {id,name, phone, city, address, isdefault} = ctx.request.body;
    let res = await query(`update address set name='${name}',phone='${phone}',city='${city}',address='${address}',isdefault='${isdefault}' where id='${id}'`);
    if(res.affectedRows == 1){
        ctx.body = {
            code:1,
            mes:'修改成功'
        }
    }else {
        ctx.body = {
            code:0,
            mes:'修改失败'
        }
    }
});

module.exports = router;