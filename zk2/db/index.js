const mysql = require('mysql');
const connect = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'root',
    database:'07a'
})


connect.connect((err)=>{
    if(!err){
        console.log('链接成功')
    } else {
        console.log('链接失败')
    }
})


module.exports = connect;