'use strict';

const Service = require('egg').Service;

class FollowService extends Service {
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
        console.log(sql,'*************')
        let res = await this.app.mysql.query(sql);
        console.log(res,'IIIIIIIIIIIIIIIIIII')
        return res;
    }
    async followdel(user_id,follow_id){
        let sql =  `delete from follow where user_id=${user_id} and follow_id=${follow_id}`;
        console.log(sql,'sql&&&&&&&&&&&&&&&&&&&')
        let res = await this.app.mysql.query(sql);
        return res;
    }
}

module.exports = FollowService;
