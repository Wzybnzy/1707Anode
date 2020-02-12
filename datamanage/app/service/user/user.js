'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async getuser(phone) {
    // let sql = `select * from user where phone=${phone}`;
    // let res = await this.app.mysql.query(sql);
    let res = await this.app.mysql.get('user',{phone})
    return res;
  }
  async registry(phone,pwd){
    //   let sql = `insert into user (phone,pwd) values ('${phone}','${pwd}')`;
    //   let res =await this.app.mysql.query(sql);
    let res = await this.app.mysql.insert('user',{phone,pwd});
      return res;
  }
  async login(phone,pwd){ //select 查询多条  get()查询一条
    //   let sql = `select * from user where phone='${phone}' and pwd='${pwd}'`;
    //   let res = await this.app.mysql.query(sql);
    let res = await this.app.mysql.select('user',{phone,pwd});
      return res;
  }
}

module.exports = UserService;
