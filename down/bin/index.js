#! /usr/bin/env node

// 选择vue  react 
// 下载模板
// 下载依赖

// down 

const program = require('commander');
const inquirer = require('inquirer');
const dowload = require('download-git-repo');
const ora = require('ora');
const chalk = require('chalk');
//问题
const promptList = [{
    type: 'list',
    message: '请选择需要的框架',
    name: 'names',
    choices: [
        "vue",
        "react"
    ]
}];

program.version('1.0.1', '-v,--version')
    .command('init <name>')
    .option('-a,--add', 'add file')
    .option('-d,--del', 'del file')
    .action((source, compath) => {
        console.log(source, '*******')
        const oratxt = ora('download....');
        inquirer.prompt(promptList).then(answers => {
            console.log(answers); // 返回的结果
            let {names} = answers;
            //下载模板
            const url = `github:Wzybnzy/${names}`;
            oratxt.start();
            // console.log(url)
            dowload(url,source,(err)=>{
                console.log(err ? 'Error' : 'Success')
                if(!err){
                    console.log(chalk.blue('下载成功'))
                    oratxt.succeed();
                } else {
                    oratxt.fail();
                }
            })
        })
    })


program.parse(process.argv);