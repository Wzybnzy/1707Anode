const router = require('koa-router')();
// const connect = require('../../db/index');
const query = require('../../db/query');


//从数据库里面拿所有的用户
router.get('/list', async ctx=>{ //select * from 表名
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
    let res =await query('select * from user1');
    console.log(res);
    ctx.body = {
        code:1,
        data:res
    }
});


//添加一条数据
// insert into 表名 (字段1，字段2) values (值1，值2)
router.post('/add', async ctx => {
    //获取全都传递过了的参数
    console.log(ctx.request.body);
    let {name,age} = ctx.request.body;
    // let res = await new Promise((resolve,reject)=>{
    //     connect.query(`insert into user1 (name,age) values ('${name}','${age}')`,(err,data)=>{
    //         console.log(data);
    //         if(!err){
    //             resolve(data);
    //         } else {
    //             reject(err);
    //         }
    //     });
    // })
    let res = await query(`insert into user1 (name,age) values ('${name}','${age}')`);
    if(res.affectedRows == 1){
        ctx.body = {
            code:1,
            mes:'插入成功'
        }
    }
    console.log(res);
});


module.exports = router;