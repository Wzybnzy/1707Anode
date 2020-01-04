#! /usr/bin/env node


const url = 'http://fanyi.youdao.com/openapi.do?keyfrom=toaijf&key=868480929&type=data&doctype=json&version=1.1&q=';
const axios = require('axios');
const chalk = require('chalk');
const args = process.argv[2];
console.log(args)


const trans = async () => {
    const dataurl = encodeURI(args);
    let res = await axios.get(url + dataurl);
    // console.log(res.data);
    let { basic, web } = res.data;
    let basciTxt = '翻译：';
    let webTxt = '网络疑义:';
    if (basic) {
        for (let i = 0; i < basic.explains.length; i++) {
            basciTxt += `\n\n${basic.explains[i]}`
        }
        console.log(chalk.blue(basciTxt));
    }

    if (web) {
        for (let j = 0; j < web.length; j++) {
            webTxt += `\n\n ${j + 1}:${web[j].key} \n ${web[j].value}`
        }
        console.log(chalk.red(webTxt))
    }

}

trans();
