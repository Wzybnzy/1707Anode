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
    async login(name,pwd){
        let sql = `select * from user where name='${name}' and pwd='${pwd}'`;
        let res = await this.app.mysql.query(sql);
        return res;
    }
    async getfollow(follow_id,user_id){
        let sql = `select * from follow where follow_id=${follow_id} and user_id=${user_id}`;
        let res = await this.app.mysql.query(sql);
        return res;
    }
    async follow(user_id,follow_id){
        let sql = `insert into follow (user_id,follow_id) values (${user_id},${follow_id})`;
        let res = await this.app.mysql.query(sql);
        return res;
    }
    async followlist(uid){
        let follow_id = `select follow_id from follow where user_id=${uid}`;
        let sql= `select * from user where id in (${follow_id})`;
        let res = await this.app.mysql.query(sql);
        return res;
    }
    async followdel(user_id,follow_id){
        let sql =  `delete from follow where user_id=${user_id} and follow_id=${follow_id}`;
        console.log(sql,'sql&&&&&&&&&&&&&&&&&&&')
        let res = await this.app.mysql.query(sql);
        return res;
    }
}

module.exports = UserService;
