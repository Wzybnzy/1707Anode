#! /usr/bin/env node

// anywhere  anywhere -v   anywhere -p 9098

// 启动服务，并且自动打开

// 把文件夹下的所有的目录展示出来

const { version } = require('../package.json');
const args = process.argv.slice(2); // []  ['-v']  ['-p','9090']
const http = require('http');
const { networkInterfaces } = require('os');
const { exec } = require('child_process');
const { existsSync, statSync, readFileSync, readdirSync } = require('fs');
const path = require('path');
// console.log(networkInterfaces())

let PORT = 8080;

const vers = {
    '-v': function () {
        console.log('版本号：' + version);

    },
    '-p': function () {
        PORT = args[1] || PORT;
        console.log('端口号' + args[1]);
        //启动服务
        createserver(PORT);
    }
}

function createserver(PORT) {
    http.createServer((req, res) => {
        console.log(req.url, '&&&&&&&&&')
        // console.log(__dirname);
        // console.log(process.cwd()); //获取的当前的工程目录
        let rootpath = process.cwd(); //C:\teaching\1707A\myServer\
        rootpath = path.join(rootpath, req.url);
        // console.log(rootpath,'rootpath*************')
        //判断当前路径是否存在
        if (existsSync(rootpath)) { //存在
            //判断是否是文件夹
            if (statSync(rootpath).isDirectory()) { //isDirectory() 判断是否是文件夹
                let dirarr = readdirSync(rootpath); // ['bin','pulic','package.json','package-lock.json']
                let htmltxt = readFileSync(path.join(__dirname, '../public/index.html'), 'utf-8');
                // console.log(htmltxt)
                let lihtml = dirarr.map(item => {
                    return `<li>
                        <a href="${path.join(req.url, item)}">${item}</a>
                    </li>`
                }).join('');
                htmltxt = htmltxt.replace('{{list}}', lihtml);
                res.end(htmltxt);
                // console.log(lihtml);
            } else { //文件
                console.log('是文件');
                res.end(readFileSync(rootpath), 'utf-8');
            }

        } else { //当前的路径不存在
            res.end('404');
        }


        res.end('hello');
    }).listen(PORT, () => {
        // console.log('启动成功');
        //自动打开
        const hostName = ['以太网', '以太网4', 'WLAN'];
        const hostitem = hostName.find(item => networkInterfaces()[item]);
        // console.log(hostitem);
        const hosturl = networkInterfaces()[hostitem].find(item => item.family == 'IPv4').address;
        // console.log(hosturl);
        const address = `http://${hosturl}:${PORT}`
        console.log(`Running at ${address}`);
        exec(`start ${address}`);
    })
}

if (args.length == 0) {
    console.log('没有传参');
    createserver(PORT);
} else {  //传参
    args[0] && vers[args[0]]()
}
