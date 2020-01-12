'use strict';

const Service = require('egg').Service;

class CollectionService extends Service {
    async getcoll(uid,file_id) {
        let sql = `select * from coll where uid=${uid} and file_id=${file_id}`;
        let res = await this.app.mysql.query(sql);
        return res;
    }
    async add(uid,file_id){
        let  sql = `insert into coll (uid,file_id) values (${uid},${file_id})`;
        let res = await this.app.mysql.query(sql);
        return res;
    }
    async list(uid){
        let file_id =  `select file_id from coll where uid = ${uid}`;
        let sql =  `select * from file where id in(${file_id})`;
        let res = await this.app.mysql.query(sql);
        return res;
    }

    async delete(uid,file_id){
        let sql = `delete from coll where uid=${uid} and file_id=${file_id}`;
        let res = await this.app.mysql.query(sql);
        return res;
    }
    
}

module.exports = CollectionService;
