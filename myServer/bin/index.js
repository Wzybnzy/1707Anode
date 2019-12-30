#! /usr/bin/env node

// anywhere  anywhere -v   anywhere -p 9098

// 启动服务，并且自动打开

// 把文件夹下的所有的目录展示出来

const { version } = require('../package.json');
const args = process.argv.slice(2); // []  ['-v']  ['-p','9090']
const http = require('http');
const {networkInterfaces} = require('os');
const {exec} = require('child_process');
console.log(networkInterfaces())

let PORT = 8080;

const vers = {
    '-v': function () {
        console.log('版本号：' + version);

    },
    '-p': function () {
        PORT = args[1] || PORT;
        console.log('端口号' + args[1]);
        //启动服务
        http.createServer((req,res)=>{
            res.end('hello');
        }).listen(PORT,()=>{
            // console.log('启动成功');
            //自动打开
            const hostName = ['以太网','以太网4','WLAN'];
            const hostitem = hostName.find(item => networkInterfaces()[item]);
            // console.log(hostitem);
            const hosturl = networkInterfaces()[hostitem].find(item => item.family == 'IPv4').address;
            // console.log(hosturl);
            const address = `http://${hosturl}:${PORT}`
            console.log(`Running at ${address}`);
            exec(`start ${address}`);
        })
    }
}

if (args.length == 0) {
    console.log('没有传参');
} else {  //传参
    args[0] && vers[args[0]]()
}
