module.exports = {
    devServer:{
        proxy:{
            '/api':{
                target:'http://localhost:7001/', //把8080上边的接口代理到7001上边
                changeOrigin:true, //允许跨域
                pathRewrite:{'^/api':''}// 把所有以/api开头的接口替换成 ''
            }
        }
    }
}