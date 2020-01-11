'use strict';

const Service = require('egg').Service;

class FileService extends Service {
  async add(obj) {
    let {file_name, file_info,know_id, isshow, uid }  = obj;
    let sql = `insert into file (file_name, file_info,know_id, isshow, uid) values ('${file_name}','${file_info}','${know_id}','${isshow}',${uid})`;
    let res = await this.app.mysql.query(sql);
    return res;
  }
}

module.exports = FileService;
