const crypto = require('crypto');
const help = (pwd)=>{
    const md5 = crypto.createHash('md5');
    md5.update(pwd);
    return md5.digest('hex');
}

const ctxBody = (ctx,obj)=>{
    ctx.body = {...obj}
}

module.exports = {
    help,
    ctxBody
}