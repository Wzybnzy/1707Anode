'use strict';

const Service = require('egg').Service;

class ListService extends Service {
  async getuser(name) {
    // let sql = `select * from list where name='${name}'`;
    // let res = await this.app.mysql.query(sql);
    let res = await this.app.mysql.get('list',{name});
    return res;
  }
  async addlist(obj){
    let {name,phone,card,address,label,followup,role} = obj;
    // let sql =  `insert into list (name,phone,card,address,label,followup,role,time) values ('${name}','${phone}','${card}','${address}','${label}','${followup}','${role}',now()) `;
    // let res = await this.app.mysql.query(sql);
    let res = await this.app.mysql.insert('list',{
        name,
        phone,
        card,
        address,
        label,
        followup,
        role,
        time:this.app.mysql.literals.now
    });
    return res;
  }
  async dellist(id){
      console.log(id,'id*******************') //3,8
      // delete from list where id = ${id}
      let arr = id.split(',');
      console.log(arr,'add&&&&&&&&&&&&&');
      let res = await this.app.mysql.delete('list',{id:arr});
      return res;
  }
  async getlist(page,limit){
    //   let res = await this.app.mysql.select('list');
        // page 1 start:0  page 2 start: 5 page:3 statr:10
        let start = (page -1) * limit;
        let sql = `select * from list limit ${start}, ${limit}`;
        let res = await this.app.mysql.query(sql);

        let sql1 = `select count(*) from list`; //查询表里面一共多少条数据  count(*)  聚合函数
        let count = await this.app.mysql.query(sql1);

      return {
          total:count[0]['count(*)'],
          data:res
      };
  }
}

module.exports = ListService;
