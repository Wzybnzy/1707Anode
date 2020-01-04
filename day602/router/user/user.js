const router = require('koa-router')();
// const connect = require('../../db/index');
const query = require('../../db/query');

//从数据库里面拿所有的用户
router.get('/list', async ctx => { //select * from 表名
    // let res = await new Promise((resolve,reject)=>{
    //     connect.query('select * from user1',(err,data)=>{
    //         if(!err){ //查询到数据
    //             console.log(data);
    //             resolve(data);
    //         } else {
    //             reject(err);
    //         }
    //     });
    // })
    let res = await query('select * from user1');
    console.log(res);
    ctx.body = {
        code: 1,
        data: res
    }
});


//添加一条数据
// insert into 表名 (字段1，字段2) values (值1，值2)
router.post('/add', async ctx => {
    //获取全都传递过了的参数
    console.log(ctx.request.body);
    let { name, age } = ctx.request.body;

    //判断参数是否存在
    if (!name || !age) {
        ctx.body = {
            code: 2,
            mes: '缺少参数'
        }
        return;
    }
    //判断当前的用户是否存在，
    let data = await query(`select * from user1 where name='${name}'`);
    console.log(data);
    if (data.length == 0) { //没有
        let res = await query(`insert into user1 (name,age) values ('${name}','${age}')`);
        if (res.affectedRows == 1) {
            ctx.body = {
                code: 1,
                mes: '插入成功'
            }
        } else {
            ctx.body = {
                code:0,
                mes:'插入失败'
            }
        }
        console.log(res);

    } else { //
        ctx.body = {
            code: 3,
            mes: '该用户已经存在'
        }
    }


});


//删除数据

router.get('/delete',async ctx=>{
    let {id} = ctx.request.query;
    console.log(id,'id&&&&&&&&&');
    //判断当前用户是否存在
    let data = await query(`select * from user1 where id='${id}'`);
    console.log(data);
    if(data.length == 0){
        ctx.body = {
            code:3,
            mes:'没有该用户'
        }
    } else { //可以删除
        let res = await query(`delete from user1 where id='${id}'`);
        if(res.affectedRows == 1){
            ctx.body = {
                code:1,
                mes:'删除成功'
            }
        } else {
            ctx.body = {
                code:0,
                mes:'删除失败'
            }
        }
    }
});


//修改数据

router.post('/update',async ctx=>{
    let {name,age,id} = ctx.request.body;
    let res = await query(`update user1 set name='${name}',age='${age}' where id='${id}'`);
    console.log(res);
    if(res.affectedRows == 1){
        ctx.body = {
            code:1,
            mes:'修改成功'
        }
    } else {
        ctx.body = {
            code:0,
            mes:'修改失败'
        }
    }

});

module.exports = router;