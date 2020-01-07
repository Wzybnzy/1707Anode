const {Service} = require('egg');

class UserService extends Service{
    async getuser(id){ //查询数据库
        console.log(id,'&&&&&&&&');
        let res = await this.app.mysql.get('user');
        return res;
    }
}


module.exports = UserService;