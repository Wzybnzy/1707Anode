'use strict';

const Service = require('egg').Service;


class UserService extends Service {

    //查询数据库
    async getuser(stu) { // 判断用户是否注册过
        let res = await this.app.mysql.query(`select * from user where stu='${stu}'`);
        return res;
    }

    async login(stu, pwd) {
        let res = await this.app.mysql.query(`select * from user where stu='${stu}' and pwd='${pwd}'`);
        return res;
    }
    async registry(name,pwd,stu) {
        let sql = `insert into user (name,pwd,stu) values ('${name}','${pwd}','${stu}')`
        let res = await this.app.mysql.query(sql);
        return res;

    }

    async student(){ 
        //获取的是所有添加过的学生
        let stus = `select stu from scores`;
        let sql = `select * from user where stu not in (${stus})`;
        let res = await this.app.mysql.query(sql);
        return res;
    }
}

module.exports = UserService;
