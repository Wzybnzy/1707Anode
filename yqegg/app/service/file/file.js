'use strict';

const Service = require('egg').Service;

class FileService extends Service {
  async add(obj) {
    let { file_name, file_info, know_id, isshow, uid } = obj;
    let sql = `insert into file (file_name, file_info,know_id, isshow, uid) values ('${file_name}','${file_info}','${know_id}','${isshow}',${uid})`;
    let res = await this.app.mysql.query(sql);
    return res;
  }
  async update(obj) {
    let { file_name, file_info, id, uid } = obj;
    let sql = `update file set file_name='${file_name}',file_info='${file_info}' where id=${id} and uid=${uid}`;
    let res = await this.app.mysql.query(sql);
    return res;
  }
  async delete(id, uid) {
    let sql = `delete from file where id=${id} and uid=${uid}`;
    let res = await this.app.mysql.query(sql);
    return res;
  }
  async list(userid) {
    let sql = `select * from file where uid=${userid}`;
    // console.log(sql,'************9')
    let res = await this.app.mysql.query(sql); // [{username,kname},{}]
    for (let i = 0; i < res.length; i++) {
      //username? kname?
       let {uid,know_id} = res[i];
       let sql1 = `select name from user where id=${uid}`;
       let username = await this.app.mysql.query(sql1);
       let sql2 = `select know_name from know where id=${know_id}`;
       let knowname = await this.app.mysql.query(sql2);
        res[i].username=username[0].name;
        res[i].kname=knowname[0].know_name;
    }
    return res;
  }
  async search(search) {
    let sql = `select * from file where  file_name like '%${search}%' or file_info like '%${search}%' and isshow='1'`;
    let res = await this.app.mysql.query(sql);
    return res;
  }
  async detail(uid, know_id) {
    let sql = `select * from file where uid=${uid} and know_id=${know_id}`;
    let res = await this.app.mysql.query(sql);
    for (let i = 0; i < res.length; i++) {
      let sql1 = `select know_name from know where id=${know_id}`;
      let knames = await this.app.mysql.query(sql1);
      console.log(knames, '*************')
      res[i].kname = knames[0].know_name;
    }
    return res;
  }
}

module.exports = FileService;
