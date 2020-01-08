'use strict';

const Service = require('egg').Service;

class ScoresService extends Service {
    async getscores(name) {
        let sql = `select * from scores where name='${name}'`;
        let res = await this.app.mysql.query(sql);
        return res;
    }
    async add(obj){
        let {name,theory,skill} = obj;
        let sql = `insert into scores (name,theory,skill) values ('${name}','${theory}','${skill}')`;
        let res = await this.app.mysql.query(sql);
        return res;
    }
    async del(id){
        let sql = `delete from scores where id='${id}'`;
        let res = await this.app.mysql.query(sql);
        return res;
    }
    async update(obj){
      let {id,theory,skill,name} = obj;
       console.log(name,id,skill,theory,'*******')
        let sql = `update scores set name='${name}',skill='${skill}',theory='${theory}' where id=${id}`;
        let res = await this.app.mysql.query(sql);
        return res;
    }
    async list(search){
        let sql = `select * from scores where name like '%${search}%'`;
        let res = await this.app.mysql.query(sql);
        return res;
    }
}

module.exports = ScoresService;
