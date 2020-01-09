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
    async registry(name,pwd,stu,role) {
        let sql = `insert into user (name,pwd,stu,role) values ('${name}','${pwd}','${stu}','${role}')`
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
    async rolename(id){
        let sql = `select role_name from role where id='${id}'`;
        let res = await this.app.mysql.query(sql);
        return res;
    }
    async menu(id){
        let power_id = `select power_id from role_power where role_id='${id}'`;
        let sql = `select * from power where id in (${power_id})`;
        let res = await this.app.mysql.query(sql);
        return res;
    }
}

module.exports = UserService;
