'use strict';

const Service = require('egg').Service;

class BlogService extends Service {
    async add(obj) {
        let { title, content, author, img } = obj;
        let sql = `insert into list (title,content,author,img,time) values ('${title}','${content}','${author}','${img}',now())`;
        let res = await this.app.mysql.query(sql);
        return res;
    }
    async del(id) {
        let sql = `delete from list where id=${id}`;
        let res = await this.app.mysql.query(sql);
        return res;
    }
    async update(obj) {
        let { id, title, content } = obj;
        let sql = `update list set title='${title}',content='${content}' where id=${id}`;
        let res = await this.app.mysql.query(sql);
        return res;
    }
    async list() {
        let sql = `select * from list`;
        let res = await this.app.mysql.query(sql);
        return res;
    }
    async detail(id) {
        let sql = `select * from list where id=${id}`;
        let res = await this.app.mysql.query(sql);
        return res;
    }
}

module.exports = BlogService;
