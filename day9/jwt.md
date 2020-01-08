1. 下载jsonwebtoken,引入
2.  生成token  jwt.sign({用户的信息},秘钥,{过期时间}); 登录成功之后，把token返回


> 校验token   有些接口需要登录了，才能调用

1. 中间件实现
定义  
```
module.exports = ()=>{
    retur aysnc (ctx,next)=>{

    }
}

```
配置，注册
在config.default.js里面   config.middleware = ['中间件的名称']


在白名单里面的都不需要做校验


- 判断当前访问的路径是否在白名单里面
- 如果在，直接在next();
- 如果不在
- 判断是否在头信息里面传递了token，
- 如果没有传，返回没有权限
- 如果传了，做校验 jwt.verify(token,keys)
- 校验成功，next()
- 不成功。捕获异常