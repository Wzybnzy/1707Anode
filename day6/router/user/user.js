const router = require('koa-router')();
const connect = require('../../db/index');

router.prefix('/user'); 


router.post('/login',async ctx=>{ //post请求获取参数的
    console.log(ctx.request.body); 
    ctx.body='login'
});

//获取数据库里面所有的用户
router.get('/list',async ctx=>{
    let res = await new Promise((resolve,reject)=>{
        connect.query(`select * from user`,(err,data)=>{ //第一个参数就是sql语句，第二个是回调函数，回调函数里面的第一个参数是错误信息，第二个参数是正确的结果
            if(!err){ //有数据
                console.log(data);
                resolve(data);
            }
        });
    });
    ctx.body = res;
    
});


module.exports = router;
