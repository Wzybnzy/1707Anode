'use strict';

const Service = require('egg').Service;

class KnowService extends Service {
    async add(obj) {
        let { know_name, know_info, isshow, uid } = obj;
        let sql = `insert into know (know_name,know_info,isshow,uid) values ('${know_name}','${know_info}','${isshow}',${uid})`;
        let res = await this.app.mysql.query(sql);
        return res;

    }
    async update(obj){
        let { know_name, know_info, isshow, uid,id } = obj;
        let sql = `update know set know_name='${know_name}',know_info='${know_info}',isshow='${isshow}' where id=${id} and uid=${uid}`;
        let res = await this.app.mysql.query(sql);
        return res;
    }
    async delete(id,uid){
        let sql = `delete from know where id=${id} and uid=${uid}`;
        let res = await this.app.mysql.query(sql);
        return res;
    }
    async list(uid){
        let sql = `select * from know where uid=${uid}`;
        let res = await this.app.mysql.query(sql);
        return res;
    }
}

module.exports = KnowService;
