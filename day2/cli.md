.cmd   .exe

1. 新建一个index.js文件，在文件的顶部添加一句 #! /usr/bin/env node

2. 新建一个package.json的文件，在package.json添加一个字段bin字段
"bin":{
    "命令":"命令的执行文件"
}

3. npm link生成一个cmd文件,在当前文件夹下边生成


> 查找规则

在当前工程目录下边，查找.cmd/.exe后缀的文件，如果没有就追层网上查找，直到当前文件所在的盘符。
如果盘符里面也没有找到，就去全局里面找。 （PATH）



获取命令行参数

process.env 获取当前的环境

process.argv  返回值是一个数组
数组里面第一个值是node的安装路径
数组里面第一个值是当前文件的所在路径
数组里面第三个值是命令行的参数
