module.exports = {
    devServer:{
        proxy:{
            '/api':{// http://localhost:8080/api/file/detail
                target:'http://localhost:7001/', //把8080上边的接口代理到7001上边
                changeOrigin:true, //允许跨域
                pathRewrite:{'^/api':''}// 把所有以/api开头的接口替换成 ''  http://localhost:7001/fiel/detail
            }
        }
    }
}