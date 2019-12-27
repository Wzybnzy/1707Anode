### 什么是npm?
  node package manager   包管理器

node遵循的是Commonjs规范，commonjs只能用在服务端。

> 模块
    一个js文件即一个模块。引入（require） 抛出（exports、module.export）
> node执行机制
    在每一个js文件的外边包裹了一个函数，这个函数在执行的时候，接受了5个参数exports, require, module, __filename, __dirname
    module指的就是模块本身。module:{exports:{}}

***exports***

exports不能直接赋值，通过.的形式抛出

***module.exports***

module.exports可以直接赋值

> js基本数据类型

    Number  String   Boolean  null undefined   Object

前5中都是基本类型，放在栈里面
Object是引用类型，放在堆里面


> 包: 把多个文件放在一个文件夹下边，并且这个文件夹下要有一个package.json(包描述文件)的文件


1. arguments 获取的是所有的形参
2. arguments.callee 获取的是函数本身

### npm的作用？
1. 下载
2. 安装
3. 卸载
4. 查看
5. 更新

<!-- eslint -->
#### 安装

> 本地安装  npm install 包名
1. 开发环境  
    npm install 包名 --save-dev
    npm install 包名  -D
下载完了之后，在package.json里面的devDependencies这个字段里面

2. 生成环境  1.0  1.1  1.2

    npm install 包名 --save
    npm install 包名 -S
下载完之后，在package.json里面的dependencies这个字段里面

查找安装包的路径  npm root -g

> 全局安装  npm install 包名 -g


#### 安装的基本流程  
 npm i swiper 
1. 去找对应的镜像源（网址），找对应的包名
2. 下载对应的压缩包到缓存目录里面
3. 解压到对应的目录里面

>镜像源

[官方镜像源](https://registry.npmjs.org/)
[淘宝镜像源](https://registry.npm.taobao.org/)

> 查看镜像源

    npm config get registry

> 设置镜像源

    npm config set registry 镜像源地址


> 查看缓存目录

    npm config  get cache

> 查看解压目录

    npm config get prefix

> 设置解压目录

    npm config set prefix 路径



#### 根据依赖安装

    npm init 生成一个package.json

    npm install
> 卸载包 npm uninstall

#### commonjs查找机制
1. 判断require里面的这个路径有没有./  ../，说明要查找的是一个js文件
2. 如果没有，要找的就是一个包
3. 在当前目录下的node_modules里面查找当前引入包的名字
4. 如果有这个包，找这个文件夹里面index.js,如果没有index.js这个文件，找package.json里面的main字段

5. 如果没有这个包，去它的上一级去找。一层一层去查找，直到当前的盘符。
6. 如果当前盘符还没有的话，去全局里面找。（NODE_PATH）


#### NODE_PATH配置和作用