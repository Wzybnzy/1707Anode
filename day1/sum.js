// const exports = module.exports;
const sum = (...arg)=>{
   console.log(arg)
   return arg.reduce((prev,cur)=> prev+cur,0)
}

const str = "1707A"

// exports = sum;

// exports.sum = sum;
// exports.str = str;
// exports.str1 = '1231231';

// exports = {

// }


// module.exports = sum;
module.exports = {
    sum,
    str:'12313123'
}