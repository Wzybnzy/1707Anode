> get 请求获取参数  ctx.requert.query 

> post 请求获取参数  
1. 下载koa-bodyparser中间
2. 注册中间件
3. 获取：ctx.request.body


> 动态路由  /接口名/:参数   eg:/detail/:id   
获取参数：ctx.params