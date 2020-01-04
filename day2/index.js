#!/usr/bin/env node

// console.log('index.js&&&&&&&&&&&&&&&&')
// console.log(process.argv[2]);

const args = process.argv[2];  //命令行的参数
const {version} = require('./package.json');
if(args == '-v' || args == '-V' || args == '--version'){
    console.log(version);
} else if(args == '-h'){
    console.log('--help---');
}