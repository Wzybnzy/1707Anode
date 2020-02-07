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
        for(let i=0;i<res.length;i++){
            let {uid,know_id} = res[i];
            let sql1 = `select name from user where id=${uid}`;
            let username = await this.app.mysql.query(sql1);
            let sql2 = `select know_name from know where id=${know_id}`;
            let kname = await this.app.mysql.query(sql2);
            res[i].name = username[0].name;
            res[i].kname = kname[0].know_name;
        }
        return res;
    }

    async delete(uid,file_id){
        let sql = `delete from coll where uid=${uid} and file_id=${file_id}`;
        let res = await this.app.mysql.query(sql);
        return res;
    }
    
}

module.exports = CollectionService;
