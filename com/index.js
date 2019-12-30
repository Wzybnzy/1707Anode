#! /usr/bin/env node

// const args = process.argv[2];


// if(args == '-v'){

// } else if(){
    // console.log();
// } else if(){

// }

const program = require('commander');
const {version} = require('./package.json');
const inquirer = require('inquirer');

const promptList = [{
    type: "expand",
    message: "请选择一种水果：",
    name: "fruit",
    choices: [
        {
            key: "a",
            name: "Apple",
            value: "apple"
        },
        {
            key: "O",
            name: "Orange",
            value: "orange"
        },
        {
            key: "p",
            name: "Pear",
            value: "pear"
        }
    ]
}];
program.version(version,'-v,--version')
.command('init <name>')
.option('-a --add-file <filename>','add file')
.option('-u,--update [filename]','update file')
.option('-d,--delete','delete file')
.action((souce,path)=>{ // commander init demo  souce == demo
    console.log(souce,'souce');
    // console.log(path,'path');
    inquirer.prompt(promptList).then(answers => {
        console.log(answers,'answers'); // 返回的结果
    })
})


//参数传递的时候，要单独写
program.parse(process.argv);


// console.log(program.add);
if(program.addFile) console.log('add file ******');
if(program.update) console.log('update file *****')