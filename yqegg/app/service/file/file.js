'use strict';

const Service = require('egg').Service;

class FileService extends Service {
  async add(obj) {
    let {file_name, file_info,know_id, isshow, uid }  = obj;
    let sql = `insert into file (file_name, file_info,know_id, isshow, uid) values ('${file_name}','${file_info}','${know_id}','${isshow}',${uid})`;
    let res = await this.app.mysql.query(sql);
    return res;
  }
  async update(obj){
    let {file_name, file_info,id, uid }  = obj;
    let sql = `update file set file_name='${file_name}',file_info='${file_info}' where id=${id} and uid=${uid}`;
    let res = await this.app.mysql.query(sql);
    return res;
  }
  async delete(id,uid){
    let sql = `delete from file where id=${id} and uid=${uid}`;
    let res = await this.app.mysql.query(sql);
    return res;
  }
  async list(uid){
    let sql = `select * from file where uid=${uid}`;
    let res = await this.app.mysql.query(sql);
    return res;
  }
  async search(search){
    let sql = `select * from file where file_name like '%${search}%' or file_info like '%${search}%'`;
    let res = await this.app.mysql.query(sql);
    return res;
  }
  async detail(uid,know_id){
    let sql = `select * from file where uid=${uid} and know_id=${know_id}`;
    let res = await this.app.mysql.query(sql);
    return res;
  }
}

module.exports = FileService;
