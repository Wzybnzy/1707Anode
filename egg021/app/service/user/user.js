'use strict';

const Service = require('egg').Service;

class UserService extends Service {
    async getuser(name) {
        let sql = `select * from user where name='${name}'`;
        let res = await this.app.mysql.query(sql);
        return res;
    }
    async registry(name, pwd) {
        let sql = `insert into user (name,pwd) values ('${name}','${pwd}')`;
        let res = await this.app.mysql.query(sql);
        return res;
    }
    async login(name, pwd) {
        let sql = `select * from user where name='${name}' and pwd='${pwd}'`;
        let res = await this.app.mysql.query(sql);
        return res;
    }
    async getuserinfo(uid){
        let rid = `select rid from user_role where uid=${uid}`; // [{}]
        let sql = `select r_name from role where id in (${rid})`;
        // `select r_name from role where id in (select rid form user_role where uid=${udi})`
        let res = await this.app.mysql.query(sql);
        return res;
    }
    async getlist(uid){
        let rid = `select rid from user_role where uid=${uid}`;
        let pid = `select pid from role_power where rid in (${rid})`;
        let sql = `select * from power where id in (${pid})`;
        let res = await this.app.mysql.query(sql);
        return res;
    }
}

module.exports = UserService;
