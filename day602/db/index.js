const mysql = require('mysql');


let connect = mysql.createConnection({
    user:'root',
    password:'root',
    host:'localhost',
    port:3306,
    database:'07a'
});


connect.connect((err)=>{
    if(!err){
        console.log('数据库连接成功')
    } else {
        console.log('数据库连接失败')
    }
})


module.exports = connect;