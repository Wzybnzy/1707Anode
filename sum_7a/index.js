const sum = (...arg)=>{
    return arg.reduce((prev,cur)=> prev + cur,0);
}


module.exports = {sum};